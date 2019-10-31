#!perl

use strict;
use warnings;
use v5.14.0;
no warnings 'experimental';

package geCan;
use geConst;
use geNode;

sub new {
    my $class=shift;
    my $stack=shift; $stack=[@$stack,'geCan'];
    my $data=shift;
    my $common=shift;
    my $self={stack=>$stack, attr=>{}};

    if (ref $data ne 'HASH') {$DB::single=1; die "Bad GaMEfile; 'can' should be an object in node '$stack->[0] (".join("/",reverse @$stack[2..$#{$stack}]).")"; }
    while (my ($action,$data) = each %$data) {
	if ($data eq "1") {
	    my $new_action=deepcopy($common->{$action});
	    $self->{attr}{$action}=[geNode->new($stack,$new_action,$common)];
	} elsif (ref $data eq 'ARRAY') {
	    $self->{attr}{$action}=[ map { geNode->new($stack,$_,$common) } @$data ];
	} else {
	    $self->{attr}{$action}=[geNode->new($stack,$data,$common)];
	}
    }
    return bless $self,$class;
}

sub deepcopy {
    my $src=shift;
    given (ref $src) {
	when ('') { return $src ; }
	when ('ARRAY') { return [ map { deepcopy($_)} @$src ] ; }
	when ('HASH') { return { map { $_ => deepcopy($src->{$_}) } keys %$src }; }
    }
}

sub getCan {
    my $self=shift;
    return map { $_ => [ $self->{attr}{$_}[0]->get('alias')]  } keys %{$self->{attr}}
}

sub do {
    my $self=shift;
    my $action=shift;

    map { $_->doSet($action) } @{$self->{attr}{$action}//[]};
}

1;
