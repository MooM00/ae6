#!perl

use strict;
use warnings;
use v5.14.0;

package geNode;
use geConst;
use geIf;
use geCan;
use geSet;
use geExit;

sub new {
    my $class=shift;
    my $stack=shift;  $stack=[@$stack,'geNode'];# Stack[0] is the node's name. $stack[1] is the root of the GmE.
    my $data=shift;
    my $common=shift;
    my $base=(caller)[0] eq 'gme';
    my $self={
	stack=>$stack,
	attr=>{},
	base=>$base,
	if=>[],
	set=>[],
	can=>undef,
	exit=>undef
    }; #now there are no 'reserved' attributes

    if (ref $data ne 'HASH') { $DB::single=1; die "Bad GaMEfile making node '$stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")"; }
    $data->{attr}//={};

    #copy all attributes to 'attr', where 'attr' takes presidence if there is duplication.
    #the GmE file can then use type 'attr' interchangably and concurrently with attributes in the node. Usefull if you want to use a 'reserved word' (if/set/can/exit/attr)
    map { 
	if (defined $data->{attr}{$_}) {
	    delete $data->{$_} 
	} else {
	    $data->{attr}{$_}= delete $data->{$_} 
	}
    } grep {!/^(if|set|can|exit|attr)$/} keys %$data;

    # 'if' and 'set' don't need to be arrays of <if> and <set> in the GmE file, but we make them arrays to simplify things later.
    if (defined $data->{if} ) { $self->{if}  =[ grep {defined} map { geIf->new ($stack,$_,$common) } (ref $data->{if }[1] eq 'HASH') ? ($data->{if }) : @{$data->{if }} ]; }
    if (defined $data->{set}) { $self->{set} =[ grep {defined} map { geSet->new($stack,$_,$common) } (ref $data->{set}[0] eq 'ARRAY') ?  @{$data->{set}} : ($data->{set}) ]; }
    # 'can' and 'exit' must have unique 
    if (defined $data->{can}) { $self->{can} =        geCan->new($stack,$data->{can },$common); }
    if (defined $data->{exit}){ $self->{exit}=       geExit->new($stack,$data->{exit},$common); }

    while (my ($name,$node) = each %{$data->{attr}}) {
	if (defined $stack->[1]{base_attr}{$name}) {
	    unless ($base) { die "Cant use base key '$name' in subNode of '$stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")"; }
	    $self->{attr}{$name}=$node;
	} elsif (defined $stack->[1]{find_attr}{$name}) {
	    $self->{attr}{$name} = [ map {geConst->new($stack,$_)} (ref $node eq 'ARRAY') ? @$node : ($node) ];
	} else {
	    die "Bad gamefile: Unknonwn '$name' in node '$stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")";
	}
    }
    return bless $self, $class;
}

sub get {
    my $self=shift;
    my $attr=shift;

    if (defined $self->{stack}[1]{base_attr}{$attr}) { return $self->{attr}{$attr}; }

    if (not defined $self->{stack}[1]{find_attr}{$attr}) { 
	push @{$self->{stack}[1]{stdout}}, ['error', "Bad request for un-declared attribute '$attr' in $self->{stack}[0]"]; 
	return undef; 
    }
    my @reply=();
    push @reply, 
	map { $_->get($attr) } 
		@{$self->{attr}{$attr}//[]},
		@{$self->{if}//[]}
    ;

    return wantarray ? @reply : (@reply==1 ? $reply[0] : \@reply);
}

sub getCan {
    my $self=shift;
    my @reply=();
    push @reply, $self->{can}->getCan if defined $self->{can};
    push @reply, map { $_->getCan } @{$self->{if}};

    return wantarray ? @reply : (@reply==1 ? $reply[0] : \@reply);
}

sub getExit {
    my $self=shift;
    my @reply=();
    push @reply,$self->{exit}->getExit if defined $self->{exit};
    push @reply, map { $_->getExit() } @{$self->{if}};

    return wantarray ? @reply : (@reply==1 ? $reply[0] : \@reply);
}

sub doSet {
    my $self=shift;
    my $action=shift;

    map { $_->doSet($action) } @{$self->{set}}, @{$self->{if}};
}

sub do {
    my $self=shift;
    my $action=shift;

    $self->{can}->do($action) if defined $self->{can};
    map { $_->do($action) } @{$self->{if}};
}

sub TO_JSON {
    my $self=shift;
    return
	{ attr=> {
		map { $_ => $self->{attr}{$_ } } grep { ref $self->{attr}{$_} eq '' } keys %{$self->{attr}}
	    }
	}
}
1;
