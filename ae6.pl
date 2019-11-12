#!perl -I.

package main;

use strict;
use warnings;
use v5.14.0;
no warnings 'experimental';
use JSON;

$|=1;

use gme;

our $DEBUG=0;
my $IF=undef;

sub usage() { print "$0 [-h] [-d] [-f <GaMEfile>] <command>; <command>...\n"}

{
    my $data=undef;
    my $input='';
    my $file_flag=0;
    foreach my $par (@ARGV) {
        given ($par) {
            when (/-h/) { usage(); exit; }
            when (/-d/) { $DEBUG++;};
            when (/-f/) { $file_flag=1;};
            when ($file_flag == 1) {
                if (-e $_) {
                    open (FH,'<',$_);
                    $data=join ("",<FH>);
                    close FH;
                    $file_flag=0;
                } else {
                    usage(); die;    
                }
            };
            default {$input.=$_.' ';};
        }
    }
    if (not defined $data) {
        if (-e 'GaMEfile.json') {
            open (FH,'<','GaMEfile.json');
            $data=join ("",<FH>);
            close FH;
        } else {
            $data = join ("",<DATA>)
        }
    }
    if (defined $data) {
        $IF=gme->new(decode_json $data);
    } else {
        usage();
        die "Can't find any GaME files anywhere"    
    }
    $IF->{stdin}=$input;
}


sub doOutput() {
    while (@{$IF->{stdout}}) { 
	$IF->doOutput; 
	if (($IF->{stdout}[0]//'')=~ /^\0 (.*)$/) {
	    my $cmd=$1;
	    given ($cmd) {
		when ('pause') { splice (@{$IF->{stdout}},0,1,'--more--',"\0 paused"); }
		when ('paused') { shift @{$IF->{stdout}}; return; }
		when ('cls') { shift @{$IF->{stdout}}; system("cls"); }
		when (/^[\d\.]+/) { shift @{$IF->{stdout}} ; select undef, undef, undef, $cmd; }
	    }
	}
    }
}

sub save_file($) {
    my $file=shift;
    open (FH,'>',$file) or do {
	push @{$IF->{stdout}} , ['error', "Cant open file '$file': $!/$@"];
	return;
    };
    print FH JSON->new->convert_blessed->pretty->canonical->encode($IF);
    close FH;
	push @{$IF->{stdout}} , ['info', "Saved."];
}

sub load_file($) {
    my $file=shift;
    open (FH,'<',$file) or do {
	push @{$IF->{stdout}} , ['error', "Cant open file '$file': $!/$@"];
	return;
    };
    my $new;
    eval { $new=decode_json(join("",<FH>)); };
    if ( ref $new ne 'HASH' or scalar (keys %$new) ==0 ) {
	push @{$IF->{stdout}} , ['error', "Malformed file '$file': $!/$@"];
	return;
    }
    close FH;

    $IF->load_SaveFile($new);
    $IF->updateCache;
}

if ($IF->{sys}{game_file} eq "\0NONE") {
    $IF->getRoomNode->do('introduction');
    doOutput();
    exit;
}

while (1) {
    if ($IF->{sys}{force_new_room} or $IF->isNewRoom) {
	$IF->{sys}{force_new_room}=0;
	$IF->checkRoom;
    }
    if (not length $IF->{stdin}) {
	push @{$IF->{stdout}} , ['\c', $IF->{sys}{prompt} ] unless ref $IF->{stdout}[-1] eq 'ARRAY' and $IF->{stdout}[-1][1] eq $IF->{sys}{prompt};
    } elsif ($IF->{stdin} !~ /^!/) {
	push @{$IF->{stdout}} , $IF->{sys}{prompt} . ($IF->{stdin}=~/^([^;]*)(;|\Z)/)[0];
    }
    doOutput();
    $IF->{sys}{prompt}=$IF->{sys}{prompt_default};

    $IF->{stdin}=<STDIN> if not length $IF->{stdin}; $DB::single=1 if $IF->{stdin} =~ /!DEBUG/i;
    $IF->ParseInput;
    next unless length $IF->{input}{sentance};
    if ($IF->{input}{sentance} =~ /!\s*(\S*)(?:\s*(\S+?))?\s*$/) {
	#Commands handeling. All of the form "!<command> [<parameter>]"
	my $command=$1//'';
	my $par=$2;
	if ("quit"=~/^$command/i) { #allow partial match
	    $IF->{private}{__command_quit}{backup}={%{$IF->{sys}}}; 
	    $IF->{sys}{room}="__command_quit";
	} elsif ($command eq "quit_now") { #require exact match
	    exit (0);
	} elsif ($command eq "no_quit") { #require exact match
	    $IF->{sys}=delete $IF->{private}{__command_quit}{backup};
	} elsif ( ("save"=~/^$command/i) or ("save_force"=~/^$command/i) ) {
	    if (not defined $par) {
		push @{$IF->{stdout}}, [ "info", "Usage: '!save <filename>'" ];
	    } elsif (-e $par and $command !~/^save_f/) {
		push @{$IF->{stdout}}, [ "warning", "The file exists. Use '!save_force $par' to overwrite." ];
	    } else {
		save_file($par);
	    }
	} elsif ("load"=~/^$command/i) {
	    if (not defined $par) {
		push @{$IF->{stdout}}, [ "info", "Usage: '!load <filename>'" ];
	    } elsif (! -e $par) {
		push @{$IF->{stdout}}, [ "warning", "The file '$par' does not exist." ];
	    } else {
		load_file($par);
	    }
	} elsif ("cheat"=~/^$command/i) {
	    if (not defined $par) {
		push @{$IF->{stdout}}, [ "info", "Usage: !cheat [words|rooms|items|all|sys]" ], [ "info", "Where:" ],
			[ "info", "<words>   shows all words currenlty available" ],
			[ "info", "<rooms>   lists all rooms in the game" ], 
			[ "info", "<items>   lists every item in the game" ],
		    	[ "info", "<all>     lists every object in the game" ],
		    	[ "info", "<sys>     Peek at system values" ];
	    } elsif ("words"=~/^$par/i) {
		push @{$IF->{stdout}}, [ "info", "All Currently understood words:" ];
		push @{$IF->{stdout}}, (sort { lc $a cmp lc $b } @{$IF->{cache}{words}});

	    } elsif ("rooms"=~/^$par/i) {
		push @{$IF->{stdout}}, [ "info", "All rooms:" ];
		push @{$IF->{stdout}}, (sort { lc $a cmp lc $b } map { $_->{attr}{name} } grep { $_->{attr}{type} =~ /room/i } values %{$IF->{gme}});
	    } elsif ("items"=~/^$par/i) {
		push @{$IF->{stdout}}, [ "info", "All items" ];
		push @{$IF->{stdout}}, (sort { lc $a cmp lc $b } map { $_->{attr}{name} } grep { $_->{attr}{type} =~ /item/i } values %{$IF->{gme}});
	    } elsif ("all"=~/^$par/i) {
		push @{$IF->{stdout}}, [ "info", "All defined rooms and items in this GaMEfile:" ];
		push @{$IF->{stdout}}, (sort { lc $a cmp lc $b } map { $_->{attr}{name} . "  [" . $_->{attr}{type} . "]" } values %{$IF->{gme}});
	    } elsif ("sys"=~/^$par/i) {
		push @{$IF->{stdout}}, [ "info", "Current SYStem values" ];
		push @{$IF->{stdout}}, (sort { lc $a cmp lc $b } map { $_ . "  [" . $IF->{sys}{$_} . "]" } keys %{$IF->{sys}});
	    } 
	}

    } elsif ( 
	#"Look" imples "look at the room I'm in"
	    (($IF->{input}{verb}//'') eq $IF->{sys}{look_verb}) and 
	    not defined $IF->{input}{object1} and 
	    not defined $IF->{input}{part} and
	    $IF->{sys}{look_implies_room}
	) { 
	$IF->{gme}{ $IF->{sys}{room} }->do($IF->{input}{verb}) ;
	$IF->ShowContent;
	$IF->ShowExits;

    } elsif (
	#"Inventory" does what you expect.
	    (($IF->{input}{object1_name}//'') eq $IF->{sys}{inventory_noun}) and 
	    not defined $IF->{input}{verb}
	) {
        if (scalar keys %{$IF->{cache}{inventory}}) {
            push @{$IF->{stdout}} , "You have: ", join (", ", sort {$a cmp $b} map { $_->{name} } values %{$IF->{cache}{inventory}} );
        } else {
            push @{$IF->{stdout}} , "You are not carrying anything";
        }

    } elsif (
	#Just pressed 'N'? you're proabably going north.
	    (($IF->{input}{verb}//'') eq $IF->{sys}{direction_only_verb}) and 
	    defined $IF->{input}{object1}
	) {
	    $IF->{gme}{$IF->{sys}{room}}->do($IF->{input}{verb});

    } elsif (
	#"get all" magic to include everything in the room
	    $IF->{sys}{get_allows_all} and
	    (($IF->{input}{verb}//'') eq $IF->{sys}{get_verb}) and 
	    ($IF->{input}{object1_name}//'') eq $IF->{sys}{get_all_noun}
	) {
        map { $_->{node}->do($IF->{sys}{get_verb}) } values %{$IF->{cache}{content}};

    } elsif (
	#"drop all" magic to include everything in inventory
	    $IF->{sys}{drop_allows_all} and
	    (($IF->{input}{verb}//'') eq ($IF->{sys}{drop_verb}//'')) and 
	    ($IF->{input}{object1_name}//'') eq ($IF->{sys}{drop_all_noun}//'')
	) {
        map { $_->{node}->do($IF->{sys}{drop_verb}) } values %{$IF->{cache}{inventory}};

    } elsif (defined $IF->{input}{verb} and not defined $IF->{input}{object1}) {
	if (defined $IF->{input}{implied_object_node}) {
	    $IF->{input}{implied_object_node}->do($IF->{input}{verb});
	} elsif ($IF->{common_replies}->verb($IF->{input}{verb})) {
	    print "TODO!\n";
	    1; #do the common thing.
	} else { 
	    push @{$IF->{stdout}},$IF->{input}{verb_name}." what?" 
	}
    } elsif ( defined $IF->{input}{verb} ) {
	if (ref $IF->{input}{object1_name} eq 'HASH') {
	    $IF->{gme}{$IF->{input}{object1_name}{target}}->do($IF->{input}{verb});
	} elsif (defined $IF->{input}{object1}{node} and ref $IF->{input}{object1}{node} eq 'geNode') {
	    $IF->{input}{object1}{node}->do($IF->{input}{verb});
	} elsif (defined $IF->{iput}{implied_object_node}) {
	    $IF->{input}{implied_object_node}->do($IF->{input}{verb});
	} else {
	    push @{$IF->{stdout}}, ['error',"your command completely confused me"];
	}
    } elsif ( defined $IF->{input}{object1} and defined $IF->{common_replies}) {
	$DB::single=1;
	if ( defined $IF->{common_replies}{object} and defined $IF->{common_replies}{object}{''} ) {
	    $IF->{common_replies}{object}{''}->doSet();
	}
	if ( defined $IF->{common_replies}{both} and defined $IF->{common_replies}{both}{''} ) {
	    $IF->{common_replies}{both}{''}->doSet();
	}
    }
}

$DB::single=1;
__DATA__
{
    "__meta" : { "game_file" : "\u0000NONE" },
    "introduction" : { 
        "type" : "room",
        "location": "",
        "name" : "introduction",
        "can" : {
            "introduction" : {
                "set" : [ 
		    [ "stdout" , "value", "Welcome to ae6.pl" ],
		    [ "stdout" , "value", "\u0000 1" ],
		    [ "stdout" , "value", "Please provide a game file" ],
		    [ "stdout" , "value", "\u0000 0.5" ],
		    [ "stdout" , "value", "Check 'ae6.pl -h' for basic help." ]
		]
	    }
        }
    }
}
