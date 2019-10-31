#!perl -I.

use strict;
use warnings;

package gme;
use geNode;
use geCommon;
use WebPerl qw(js); 
my $output=js('document')->getElementById('output');
sub output(@) { 
    $output->{innerHTML}.=join("",@_); 
    $output->{scrollTop}=$output->{scrollHeight};
}

sub new {
    my $class = shift;
    my $self  = {

        #engine tuning
        sys => {

            #game file naming
            game_file               => 'Not Yet Specified',
            game_file_compatability => '',

            #user position
            room      => 'introduction',
            prev_room => '',

            #auto render room
            silent              => 0,
            auto_look_room      => 1,
            auto_set_room       => 1,
            auto_look_room_verb => 'look',
            show_exits          => 1,
	    show_content	=> 1,

            #magic tweaks
            look_implies_room         => 1,
            get_allows_all            => 1,
            get_all_noun              => 'all',
            drop_allows_all           => 1,
            drop_all_noun             => 'all',
            direction_only_implies_go => 1,
            direction_only_verb       => 'go',
            honour_auto_exit          => 1,
            refresh_on_auto_exit      => 1,
	    force_new_room	      => 0,

            #special words
            get_verb       => 'get',
            drop_verb      => 'drop',
            look_verb      => 'look',
            inventory_noun => 'inventory',

            #cache control
            refresh_cache_on_enter_room => 1,
            refresh_cache_every_input   => 1,

            #input tuning
            ignore_action_prefix => '__',
            ignore_action_re     => '',
            max_obj_in_input     => 1,
	    no_input_alert	 => 0,
	    prompt		 => ':> ',
	    prompt_default	 => ':> '
        },

        #data stores for game settings
        public  => {},
        private => {},

        #I/O
        stdin  => '',
        input  => {},
        stdout => [],

        #game data
        gme      => {},
        stack    => ['__gme__'],
	set_stop => 0,

        #cache data
	cache => {
	    room      => {},
	    content   => {},
	    exits     => {},
	    auto_exit => undef,
	    inventory => {},
	    actions   => {},
	    words     => {},
	},

        #internal consistency assertions; known attributes
        base_attr => { map { $_ => 1 } qw[type name location] },
        find_attr => { map { $_ => 1 } qw[if can alias set exit] }
    };
    push @{ $self->{stack} }, $self;

    my $text = {};
    if ( @_ == 0 ) {
        die 'No data trying to create GmE';
    } elsif ( @_ == 1 ) {
        $text = shift;
        if ( ref $text ne 'HASH' ) {
            $text = {};
            die 'Bad data trying to create GmE';
        }
    } else {
        $text = {@_};
    }

    my $common = delete $text->{__common_actions};
    $common //= {};
    if ( defined $text->{__meta} ) {
        my $meta = delete $text->{__meta};

        if ( not defined $meta->{game_file} ) { die 'Bad GameFile: meta/game_file not set'; }

        do {
            my $attr = $_;
            if ( $attr =~ /^(?:base|find)_attr$/ ) {
                if ( ref $meta->{$attr} eq 'ARRAY' ) {
                    map { $self->{$attr}{$_} = 1 } @{ $meta->{$attr} };
                } else {
                    die "Bad data: malfromed meta '$attr' should be an array";
                }
            } else {
                if ( ref $meta->{$attr} eq '' ) {
                    $self->{sys}{$attr} = $meta->{$attr};
                } else {
                    die "Bad data: malfromed meta '$attr' should be a value";
                }
            }
          }
          foreach grep { defined $meta->{$_} } keys %{ $self->{sys} }, 'base_attr', 'find_attr';

    }
    if ( defined $text->{__common_replies} ) { $self->{common_replies} = geCommon->new( [ '__common_replies', $self ], delete $text->{__common_replies}, $common ); }
    $self->{sys}{game_file} //= "GAME FILE NAME NOT PROVIDED";
    $self->{sys}{game_file_compatability} //= $self->{game_file};

    #This loads the actual GaMEfile into $self->{gme}
    foreach my $name ( keys %$text ) {
        $self->{gme}{$name} = geNode->new( [ $name, $self ], $text->{$name}, $common );
    }

    return bless $self, $class;
}

sub TO_JSON {
    my $self=shift;
    my $reply={map { $_ => $self->{$_} } grep { !/^(gme|stack|self|cache|common_replies|input|stdin|stdout)$/ } keys %$self};
    $reply->{gme}={
	map { $_ => $self->{gme}{$_} } keys %{$self->{gme}}
    };
    return $reply;
}

sub load_SaveFile($) {
    sub _apply($$);
    sub _apply($$) {
	my $l=shift;
	my $r=shift;
	if (ref $r eq '') { $l=$r; return; }
	if (ref $r eq 'ARRAY') { 
	    $l//=[]; 
	    map { 
		if (ref $r->{$_} eq 'HASH') { 
		    $l->[$_]={};
		    _apply($l->[$_],$r->[$_]); 
		} elsif (ref $r->{$_} eq 'ARRAY') { 
		    $l->[$_]=[];
		    _apply($l->[$_],$r->[$_]); 
		} else { 
		    $l->[$_]=$r->[$_] 
		}
	    } (0..$#$r);
	    return;
	}
	if (ref $r eq 'HASH') { 
	    $l//={}; 
	    map { 
		if (ref $r->{$_} eq 'HASH') { 
		    $l->{$_}//={}; 
		    _apply($l->{$_},$r->{$_});
		} elsif (ref $r->{$_} eq 'ARRAY') { 
		    $l->{$_}//=[]; 
		    _apply($l->{$_},$r->{$_});
		} else { 
		    $l->{$_}=$r->{$_} 
		} 
	    } keys %$r;
	    return;
	}
    }

    my $self=shift;
    my $new=shift;

    if (ref $new ne 'HASH' or not defined $new->{sys} or not defined $new->{gme}) {
	push @{$self->{stdout}}, ['error', "Corrupt save file. Cannot load." ];
	return;
    }
    if ($new->{sys}{game_file_compatability} ne $self->{sys}{game_file_compatability}) {
	push @{$self->{stdout}}, ['error', 
	    "Savegame file for [" . $new->{sys}{game_file} . "] is not compatablie",
	    "with this game [" . $self->{sys}{game_file} . "].",
	    "(This is version {" . $self->{sys}{game_file_compatability} . "} but the",
	    "  save file is for version {". $new->{sys}{game_file_compatability} . "}"
	];
	return;
    }

    _apply($self,$new);
    push @{$self->{stdout}}, ['note', "Load complete." ];
}

sub updateCache {
    my $self = shift;
    my $cache=$self->{cache};
    $cache->{room}      = {};
    $cache->{content}   = {};
    $cache->{exits}     = {};
    $cache->{auto_exit} = undef;
    $cache->{inventory} = {};
    $cache->{actions}   = {};
    $cache->{words}     = {};

    while ( my ( $item_id, $item ) = each %{ $self->{gme} } ) {
	$DB::single=1 unless defined $self->{sys}{room};
	$DB::single=1 unless defined $item_id;
	$DB::single=1 unless defined $item;
	$DB::single=1 unless ref $item eq "geNode";
        my $loc = $item->get('location');
	$DB::single=1 unless defined $loc;
        if ( ( $loc eq $self->{sys}{room} ) or ( $loc eq '__inventory' ) or ( $item_id eq $self->{sys}{room} ) ) {
            my $name  = $item->get('name'); 
	    $DB::single=1 unless defined $name;
            my $alias = [ $item->get('alias') ];
            my $can   = { $item->getCan };
            $cache->{room}{$item_id}      = { name => $name, location => $loc, alias => $alias, can => $can, node => $item } if $item_id eq $self->{sys}{room};
            $cache->{content}{$item_id}   = { name => $name, location => $loc, alias => $alias, can => $can, node => $item } if $loc eq $self->{sys}{room};
            $cache->{inventory}{$item_id} = { name => $name, location => $loc, alias => $alias, can => $can, node => $item } if $loc eq '__inventory';
            map { $cache->{actions}{ lc $_ } = { name => $_, alias => $can->{$_}, implied_object => $item_id, implied_object_node => $item } } keys %$can;
        }
    }

    my %exits = $cache->{room}{ $self->{sys}{room} }{node}->getExit;
    while ( my ( $name, $target ) = each %exits ) {
        if ( $name eq '__auto' ) { $cache->{auto_exit} = $target; next; }
        $cache->{exits}{ lc $name } = { name => $name, alias => [], target => $target };
    }
}

sub ParseInput {

    my $self = shift;
    my $cache=$self->{cache};
    my $sentance;
    my @words=();

    #built-in special case
    push @words, {
	word=>$self->{sys}{inventory_noun}, actual=>$self->{sys}{inventory_noun}, 
	type=>'object', target=>1, length=>length $self->{sys}{inventory_noun}
    };

    $self->{input} = {};
    ( $sentance, $self->{stdin} ) = $self->{stdin} =~ /^\s*([^;]*?)\s*(?:;\s*(.*?)\Z|\Z)/;    #treat ';' as a sentance separator. sorry, no "one;word" yet
    $self->{input}{sentance} = $sentance;
    $self->{stdin} //= '';
    print "Parsing [$sentance]\n" if $main::DEBUG;

    # is this a '--more--'? No need to build the words lists
    if ( ( $self->{stdout}[0] // '' ) eq "\0 paused" ) { return; }
    return unless length $sentance;

    if ( $self->{sys}{refresh_cache_every_input} ) { $self->updateCache; $cache=$self->{cache}; }

    #grab all 'object's in reach, and their aliases: content, inventory
    map {
        while ( my ( $name, $node ) = each %$_ ) {
	    $name=~s/^\0//; #Exit alias
	    push @words, {word=>$name, actual=> $name, type=>'object', target=>$node, length=>length $name};
	    map {
		push @words, {word=>$_, actual=> $name, type=>'object', target=>$node, length=>length $_};
	    } @{$node->{alias}}
        }
    } $cache->{room}, $cache->{content}, $cache->{exits}, $cache->{inventory};
    map {
        while ( my ( $name, $node ) = each %$_ ) {
	    push @words, {word=>$name, actual=> $name, type=>'verb', target=>$node, length=>length $name};
	    map {
		push @words, {word=>$_, actual=> $name, type=>'verb', target=>$node, length=>length $_};
	    } @{$node->{alias}}
	}
    } $cache->{actions};

    @words=sort { $b->{length} <=> $a->{length} } @words;
    $cache->{words}=[ map { $_->{word} } @words ] ;

    # is this a command? It may need the words list (!cheat words?)
    return if $sentance=~/^\s*!/;

    {
	my $part = $sentance;
	my @found=();
	my $ctr = 1;
	while ( $sentance =~ /\S/) {

	    my $part_length=length $part;
	    print "  Testing [$part]\n" if $main::DEBUG;

	    my %found=();
	    for my $word (@words) {
		last if $word->{length} < $part_length; 
		if ($word->{word} =~ /^\Q$part/) {
		    print "    Match to [$word->{word}] ($word->{actual})\n" if $main::DEBUG;
		    if ($word->{word} eq $part) {
			print "      Exact match; ignore anything else.\n" if $main::DEBUG;
			%found=($part=>$word);
			last;
		    }
		    if (defined $found{$word->{actual}}) {
			print "    Alias to prior mach [$found{$word->{actual}}{word}]\n" if $main::DEBUG;
			next;
		    }
		    $found{$word->{actual}}=$word;
		}
	    }

	    if (scalar keys %found == 0) {
		$part=~s/\s*(\S+)\s*$//;
		if ($part=~/^\s*$/) {
		    $sentance=~s/^\s*(\S+)\s*//;
		    $part=$sentance;
		    print "    No maches. Dropping [$1] from sentance\n" if $main::DEBUG;
		} else {
		    print "    No match at all. Stripping [$1] from test\n" if $main::DEBUG;
		}
	    }
	    if (scalar keys %found == 1) {
		my ($full_text)=keys %found;
		my $found=$found{$full_text};
		print "   Matched [$full_text] from {$found->{word}} [$part]\n" if $main::DEBUG;
		if ($found->{type} eq 'verb') {
		    print "  It's a verb\n" if $main::DEBUG;
		    if ( defined $self->{input}{verb} ) {
			push @{ $self->{stdout} }, [ 'error', 
				"Too many thing to do: $self->{input}{verb_word} ($self->{input}{verb_name}) " . 
				" and $found->{word} ($found->{actual})" ] 
			    unless $self->{sys}{no_input_alert};
			$self->{sys}{no_input_alert}=0;
			return;
		    }
		    $self->{input}{verb}      = $found->{actual};
		    $self->{input}{verb_raw}  = $part;
		    $self->{input}{verb_word} = $found->{word};
		    $self->{input}{verb_name} = $found->{actual};
		    $self->{input}{implied_object} = $cache->{actions}{$found->{actual}}{implied_object};
		    $self->{input}{implied_object_node} = $cache->{actions}{$found->{actual}}{implied_object_node};
		    print "   It implies [" . ($self->{input}{implied_object}//'<nothing>') . "] if no object is given\n" if $main::DEBUG;
		    if ( ( $full_text eq $self->{sys}{drop_verb} and $self->{sys}{drop_allows_all} ) ) {
			print "  It's a 'drop' verb and we allow 'drop all' syntax\n" if $main::DEBUG;
			push @words, {
			    word=>$self->{sys}{drop_all_noun}, actual=>$self->{sys}{drop_all_noun}, 
			    type=>'object', target=>undef, length=>length $self->{sys}{drop_all_noun}
			};
			@words=sort { $b->{length} <=> $a->{length} } @words;
			push @{$cache->{words}}, $self->{sys}{drop_verb};
		    }
		    if ( ( $full_text eq $self->{sys}{get_verb} and $self->{sys}{get_allows_all} ) ) {
			print "  It's a 'get' verb and we allow 'get all' syntax\n" if $main::DEBUG;
			push @words, {
			    word=>$self->{sys}{get_all_noun}, actual=>$self->{sys}{get_all_noun}, 
			    type=>'object', target=>undef, length=>length $self->{sys}{get_all_noun}
			};
			@words=sort { $b->{length} <=> $a->{length} } @words;
			push @{$cache->{words}}, $self->{sys}{get_verb};
		    }
		} else { #object
		    print "  It's an object or exit. This is Object $ctr\n" if $main::DEBUG;
		    $self->{input}{ 'object' . $ctr }           = $found->{target};
		    $self->{input}{ 'object' . $ctr . '_raw' }  = $part;
		    $self->{input}{ 'object' . $ctr . '_word' } = $found->{word};
		    $self->{input}{ 'object' . $ctr . '_name' } = $found->{actual};
		    if ( $ctr > $self->{sys}{max_obj_in_input} ) {
			push @{ $self->{stdout} },
			  [
			    'error',
			    "Too many things to talk about: " . join ", ",
			    map { 
				$self->{input}{"input${_}_word"} . " (".$self->{input}{"input${_}_name"} . ")" 
			    } sort { 
				$a <=> $b 
			    } map { 
				/(\d+)/ 
			    } grep { 
				/object\d+_word/ 
			    } keys %{ $self->{input} }
			  ] unless $self->{sys}{no_input_alert};
			$self->{sys}{no_input_alert}=0;
			return;
		    }
		    $ctr++;
		    if ( (defined $cache->{exits}{$full_text} or defined $cache->{exits}{'\0'.$full_text})and $self->{sys}{direction_only_implies_go} ) { 
			print " Direction ($full_text), implies go '$self->{sys}{direction_only_verb}'\n" if $main::DEBUG;
			$self->{input}{verb} //= $self->{sys}{direction_only_verb}; 
		    }
		}
		$sentance=~s/^\s*\Q$part\E\s*//;
		$part=$sentance;
	    }
	    if (scalar keys %found > 1) {
		print " We have multiple matches to report\n" if $main::DEBUG;
		push @{ $self->{stdout} },
		  "Do you mean '" . ( join "', or '", sort { lc $a cmp lc $b } map { $_->{word} . " (" . $_->{actual} . ")" } values %found ) . "' when you said '$part'?" unless $self->{sys}{no_input_alert};
		$self->{input} = {};
		$self->{sys}{no_input_alert}=0;
		return;
	    }
	}

	#no verb or noun, and the entry wan'st a command (!quit, !save, etc)
        if ( not defined $self->{input}{verb} and not defined $self->{input}{object1} and ($self->{input}{sentance} !~/^!/) ) { 
	    print " Can't find anything to understand. Sorry\n" if $main::DEBUG;
	    push @{ $self->{stdout} }, [ 'error', "I dont' understand '$self->{input}{sentance}'" ] unless $self->{sys}{no_input_alert}; 
	} elsif ($main::DEBUG) {
	    print " Finished Parsing.\n" if $main::DEBUG;
	    print "  Verb: ".($self->{input}{verb_word}//'<no verb>') . " (" . ($self->{input}{verb_name}//'') . ")\n" if $main::DEBUG;
	    foreach my $key (sort {$a <=> $b} map { /(\d+)/ } grep { /object\d+_word/ } keys %{$self->{input}}) {
		print "  Object $key: " . $self->{input}{"object${key}_word"} . " (" . $self->{input}{"object${key}_name"} . ")\n";
	    }
	    if (defined $self->{input}{implied_object_node}) {
		print "  Impied Object : " . $self->{input}{implied_object} . "\n";
	    }
	}
	$self->{sys}{no_input_alert}=0;
    }

}

sub getRoomNode { my $self = shift; my $room = $self->{sys}{room}; return wantarray ? ( $room, $self->{gme}{$room} ) : $self->{gme}{$room}; }

sub isNewRoom { return $_[0]->{sys}{room} ne $_[0]->{sys}{prev_room}; }

sub checkRoom {
    my $self = shift;
    my $cache= $self->{cache};
    my ( $room_id, $room ) = $self->getRoomNode;

    my $old_prev = $self->{sys}{prev_room};

    #trigger room stuff if we are allowed to
    $room->doSet if $self->{sys}{auto_set_room};

    #update the cache now, if we are allowed to
    $self->updateCache if $self->{sys}{refresh_cache_on_enter_room};

    $self->{sys}{prev_room} = $self->{sys}{room} unless $old_prev ne $self->{sys}{prev_room};    #Just in case it is beig forged, maintain the 'fake'.

    #if we are 'silent' or not automatically looking, we are now done. But still auto-exit if allowed and needed.
    if ( $self->{sys}{silent} or ( not $self->{sys}{auto_look_room} ) ) {
        $self->{sys}{silent} = 0;
        if ( $self->{sys}{honour_auto_exit} and defined $cache->{auto_exit} ) {
            $self->{sys}{room} = $cache->{auto_exit};
            $self->updateCache if $self->{sys}{refresh_on_auto_exit};
            $self->checkRoom;
        }
        return;
    }

    #show the room's description
    $room->do( $self->{sys}{auto_look_room_verb} );

    #... and what's in it.
    if ( scalar keys %{ $cache->{content} }  and $self->{sys}{show_content} ) {
        push @{ $self->{stdout} }, "", "There is: " . join( ", ", sort { lc $a cmp lc $b } map { $_->{name} } values %{ $cache->{content} } );
    }

    #.. and how to get out... if it's clear. And we are allowed to show it.
    if ( ( scalar keys %{ $cache->{exits} } ) and $self->{sys}{show_exits} ) {
        push @{ $self->{stdout} }, "", "Visible exits:  " . join( ", ", sort { lc $a cmp lc $b } grep { ! /^\0/ } keys %{ $cache->{exits} } );
    }

    #.. lastly; auto exit to next room?
    if ($self->{sys}{honour_auto_exit} and defined $cache->{auto_exit}) {
	$self->{sys}{room}=$cache->{auto_exit};
	$self->updateCache if $self->{sys}{refresh_on_auto_exit};
	$self->checkRoom;
    }
}

sub doOutput {
    my $self   = shift;
    my $stdout = $self->{stdout};
    my $cont   = 1;
    $self->{set_stop}=0;
    while ( @$stdout and $cont ) {
        while ( @$stdout and not defined $stdout->[0] ) { shift @$stdout; }
        return unless @$stdout;
        return if $stdout->[0] =~ /^\0 /;

        my $line = shift @$stdout;
        my $eol  = "\n";
        if ( ref $line eq 'ARRAY' ) {
            if ( $line->[0] eq '\c' ) {
                $eol  = '';
                $line = $line->[1];
            } elsif ( $line->[0] =~ /error/i ) {
                $line = "<p style='color:red'> " . $line->[1] . " </p>\n";
            } elsif ( $line->[0] =~ /warn/i ) {
                $line = "<p style='color:orange'> " . $line->[1] . " </p>\n";
            } elsif ( $line->[0] =~ /bold/i ) {
                $line = "<b> " . $line->[1] . " </b>\n";
            } else {
                $line = "  [" . $line->[1] . "]\n";
            }
	}
        output ($line, $eol) if defined $line;
    }
}

sub node { return $_[0]->{gme}{ $_[1] }; }

1;

__DATA__
