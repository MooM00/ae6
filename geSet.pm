#!perl

use strict;
use warnings;
use v5.14.0;
no warnings 'experimental';

package geSet;
use geSum;

sub new {
    my $class=shift;
    my $stack=shift; $stack=[@$stack,'geSet'];
    my $data=shift;
    my $self={stack=>$stack, left=>{}, right=>undef};

    if (ref $data eq 'ARRAY' and @$data == 1 and $data->[0] eq "stop") { $self->{left}{stop}=1; return bless $self, $class; }
    if (ref $data eq 'ARRAY' and @$data == 1 and $data->[0] eq "break") { $self->{left}{break}=1; return bless $self, $class; }
    if (ref $data eq 'ARRAY' and @$data == 2) { splice @$data,1,0,'value'; }
    if (ref $data ne 'ARRAY' or  @$data != 3) { $DB::single=1; die "Bad GaMEfile making 'set' on node '$stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")"; }

    my $left=$data->[0];
    if (ref $left ne 'HASH') { 
	if ($left =~ /^(stop|stdin|stdout)$/) { 
	    $self->{left}{$left}=1; 
	} else {
	    $DB::single=1; die "Bad GaMEfile making 'set'; left not a target object  on node '$stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")"; 
	}
    } elsif (scalar keys %$left == 1) { 
	map { $self->{left}{$_} = $left->{$_} if defined $left->{$_}; } qw [global private sys input];
	if (scalar keys %{$self->{left}}==0) {
	    if (defined $left->{node}) { 
		if (not defined $stack->[1]{base_attr}{$left->{node}[1]}) { 
		    die "Bad GaMEfile making 'set'; left node not a base key [$left->{node}[1]] in node '$stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")" 
		}
		$self->{left}{node}=$left->{node}[0]; 
		$self->{left}{key}=$left->{node}[1];
		if ($self->{left}{node} eq '__self') { $self->{left}{node}=$stack->[0]; }
	    } else {
		die "Bad GaMEfile making 'set'; left object [".(keys %$left)[0]."] not recognized in node '$stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")" 
	    }
	}
    }  else {
	$DB::single=1; die "Bad GaMEfile making 'set'; left not a single target object  on node '$stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")"; 
    }

    $self->{type}=$data->[1];
    unless ($self->{type}=~/^(value|array|sum)$/) {
	die "Bad GaMEfile making 'set'; unknown type '$self->{type}' in node '$stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")";
    }

    given ($self->{type}) {
        when ("value") { $self->{right}=[ map { geConst->new( $stack, $_) } (ref $data->[2] eq 'ARRAY') ? @{$data->[2]} : $data->[2] ] ; }
        when ("array") { $self->{right}=[ map { geConst->new( $stack, $_ ) } @{$data->[2]} ] ; }
        when ("sum"  ) { $self->{right}=geSum->new( $stack, $data->[2]); }
    }

    return bless $self, $class;
}

sub doSet {
    my $self = shift; 
    my $gme=$self->{stack}[1];
    if (defined $self->{left}{stop}) { $gme->{set_stop}=1;}
    if (defined $self->{left}{break}) { $DB::single=1; return; }
    if ($gme->{set_stop}) {$DB::single=1;}
    return if $gme->{set_stop};

    my $reply=undef;
    given ($self->{type}) {
        when ("value") {$reply=join ($gme->{sys}{flatten_array_separator}, map {$_->get//''} @{$self->{right}}); }
        when ("array") {$reply=[ map {$_->get} @{$self->{right}} ]; }
        when ("sum") {$reply=$self->{right}->get; }
    }
    if (defined $self->{left}{node})    { 
	if (defined $gme->{gme}{$self->{left}{node}}) {
	    $gme->{gme}{$self->{left}{node}}{attr}{$self->{left}{key}}     = $reply; return; 
	} else {
	    warn "Bad node: ($self->{left}{node}) doesn't exist in '$self->{stack}[0]'";
	}
    }
    if (defined $self->{left}{private}) { $gme->{private}{$self->{stack}[0]}{$self->{left}{private}}= $reply; return; }
    if (defined $self->{left}{stdout})  { push @{$gme->{stdout}}                                    , ($self->{type} eq "array") ? @$reply : $reply; return; }
    if (defined $self->{left}{stdin})   { $gme->{stdin}                                             = $reply; return; }

    map {
	$gme->{$_}{$self->{left}{$_}} = $reply;
    } keys %{$self->{left}}; 
}

1;
