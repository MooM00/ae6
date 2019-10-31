#!perl

use strict;
use warnings;
use v5.14.0;

package geConst;
sub new {
    my $class=shift;
    my $stack=shift; $stack=[@$stack,'geConst'];
    my $data=shift;
    my $self={ stack => $stack };

    if (ref $data eq '' or ref $data eq 'ARRAY') {
		$self->{value}=$data;
    } elsif (ref $data eq 'HASH') {

	map { $self->{gme}{$_} = $data->{$_} if defined $data->{$_}; } qw [global private sys input stdin stdout];

	if (defined $data->{node}) {
	    $self->{node}=$data->{node};
	    if ($self->{node}[0] eq '__self') { $self->{node}[0]=$self->{stack}[0]; }
	}
	if (keys %$self == 1) {
	    $DB::single=1; die "Bad GaMEfile; 'Const' type [" . join (' or ', keys %$data) 
	    	. "] not known in node '$stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")";
	}
	if (keys %$self == 3 or keys %{$self->{gme}//{}} > 1) {
	    $DB::single=1; die "Bad GaMEfile; 'Const' defines multiple values in node '$stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")";
	}
    } else {
	$DB::single=1; die "Bad GaMEfile; 'Const' not object or value in node '$stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")"; 
    }

    return bless $self, $class;
}

sub get {
    my $self=shift;
    my $gme=$self->{stack}[1];

    if (defined $self->{value}) { return $self->{value} }
    if (defined $self->{node}) { return $gme->{gme}{$self->{node}[0]}->get($self->{node}[1]) if defined $gme->{gme}{$self->{node}[0]}; }
    if (defined $self->{private}) { return $gme->{private}{$self->{stack}[0]}{$self->{private}}; }
    foreach my $type (keys %{$self->{gme}}) {
	my $target=$self->{gme}{$type};
	if ($type eq 'stdin') { return $gme->{stdin}; }
	if (ref $target eq '') { 
	    if ($type eq 'private') {
		return $gme->{private}{$self->{stack}[0]}{$target}; 
	    } else {
		return $gme->{$type}{$target}; 
	    }
	}
	return $gme->{$type}{$target->[0]}{$target->[1]};
    }
}

1;
