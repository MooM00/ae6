#!perl

use strict;
use warnings;
use v5.14.0;

package geExit;
sub new {
    my $class=shift;
    my $stack =shift; $stack=[@$stack,'geExit'];
    my $data =shift;
    my $self={stack=>$stack,exits=>{}};
    my $target;

    if (ref $data ne 'HASH') { $DB::single=1; die "Bad GaMEfile; 'exit' must be an object in node '$stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")"; }

    while (my ($key,$val) = each %$data) {
	if (ref $val eq 'HASH') {
	    if (not defined $val->{target}) { $DB::single=1; die "Bad GaMEfile; 'exit' must have a target in node '$stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")"; }
	    $target=$val->{target}
	} else {
	    $target=$val;
	}
	if ($val eq '__self') {$val = $stack->[0];}
	$self->{exits}{$key} = geConst->new($stack,$target);
	if (ref $val eq 'HASH') {
	    #Trying to avoid 'magic' strings. Null is pretty safe in a text-only environment.
	    map { $self->{exits}{"\0".$_} = geConst->new($stack,$target) } @{$val->{alias}};
	}
    }

    return bless $self, $class;
}

sub getExit { my $self=shift; return map { $_,$self->{exits}{$_}->get } keys %{$self->{exits}}; }

1;
