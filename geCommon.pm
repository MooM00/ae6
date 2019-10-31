#!perl

use strict;
use warnings;

package geCommon;
use geNode;

sub new {
    my $class=shift;
    my $stack=shift; $stack=[@$stack,'geCommon'];
    my $data=shift;
    my $common=shift;
    my $self={ 
	stack=>$stack, 
	verb=>{}, 
	object=>{}
    };

    my %typemap=(verb=>['verb'], object=>['object'], both=>['verb', 'object']);
    foreach my $type (qw[ verb object both ]) {
	foreach my $node (keys %{$data->{$type}}) {
	    map {
		$self->{$type}{$node}=geNode->new($stack,$data->{$type}{$node});
	    } @{$typemap{$type}};
	}
    }
    return bless $self, $class;
}

sub _do {
    my $self=shift;
    my $type=shift;
    my $word=shift;
    if (defined $self->{$type}{$word}) {
	$self->{$type}{$word}->doSet;
	return 1;
    } else {
	return 0;
    }
}

sub verb   { return   $_[0]->_do('verb'  ,$_[1]); }
sub object { return   $_[0]->_do('object',$_[1]); }
sub both   { return ( ( $_[0]->_do('verb'  ,$_[1]) ) or ( $_[0]->_do('object',$_[1]) ) ); }

1;
