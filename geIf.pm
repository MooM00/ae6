#!perl

use strict;
use warnings;
use v5.14.0;

package geIf;
use geTest;
use geNode;

sub new {
    my $class=shift;
    my $stack=shift; $stack=[@$stack,'geIf'];
    my $data=shift;
    my $common=shift;
    my $self={ stack=>$stack };
    my $itr=0;

    if (ref $data ne 'ARRAY') { $DB::single=1; die "Bad GaMEfile 'if' should be an array in node '$stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")"; }
    $data->[2]//=[]; # you don't have to supply an 'else'
    if (@$data != 3) { $DB::single=1; die "Bad GaMEfile 'if' must have 2 or 3 elements in node '$stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")"; }
    $self->{test}=geTest->new($stack,$data->[0]);
    #coerce evrything to arrays to simplify things later
    $self->{then}=[ map { geNode->new([@$stack,'['.$itr++.']'],$_,$common); } (ref $data->[1] eq 'HASH') ? ($data->[1]) : @{$data->[1]} ];
    $itr=0;
    $self->{else}=[ map { geNode->new([@$stack,'['.$itr++.']'],$_,$common); } (ref $data->[2] eq 'HASH') ? ($data->[2]) : @{$data->[2]} ];

    return bless $self,$class;
}

sub get {
    my $self=shift;
    my $attr=shift;

    my $return=$self->{test}->test() ?  $self->{then} : $self->{else};

    return grep {defined} map { $_->get($attr) } @$return;
}

sub getCan {
    my $self=shift;
    my $attr=shift;

    my $return=$self->{test}->test() ?  $self->{then} : $self->{else};

    return grep {defined} map { $_->getCan($attr) } @$return;
}

sub getExit {
    my $self=shift;
    my $attr=shift;

    my $return=$self->{test}->test() ?  $self->{then} : $self->{else};

    return grep {defined} map { $_->getExit($attr) } @$return;
}

sub do {
    my $self=shift;
    my $action=shift;

    my $branch=$self->{test}->test() ?  $self->{then} : $self->{else};

    map { $_->do($action) } @$branch;
}

sub doSet {
    my $self=shift;
    my $action=shift;

    my $branch=$self->{test}->test() ?  $self->{then} : $self->{else};

    map { $_->doSet($action) } @$branch;
}

1;
