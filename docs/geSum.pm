#!perl

use strict;
use warnings;
use v5.14.0;
no warnings 'experimental';

package geSum;
use geConst;
sub new {
    my $class=shift;
    my $stack=shift; $stack=[@$stack,'geSum'];
    my $data=shift;

    my $self={stack=>$stack};

    if (ref $data eq '') { 
	$self->{value}=$data; 
    } elsif (ref $data ne 'ARRAY') {
	$DB::single=1; die "Bad GaMEfile; 'sum' should be constant or array in node '$stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")";
    } else {
	$self->{data}=[];
	my $flag=0; #0=value, 1=oper.
	foreach my $item (@$data) {
	    if (($flag) or ($item eq '!') or ($item =~ /trim/)) {
		unless ($item =~/^(\+|\-|\*|\/|\%|\^|\!|\.|[lr]?trim|sub)/) {
		    $DB::single=1; die "Malformed sum, bad oper '$item' making node $stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")";
		}
		push @{$self->{data}}, $item;
		$flag=0;
		next;
	    }
	    if (($self->{data}[0]//'') eq 'sub') {
		if (ref $item ne 'ARRAY') { 
		    $DB::single=1; die "Bad GaMEfile; 'sub/sum' not array in node '$stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")"; 
		}
		push @{$self->{data}}, [ geConst->new($item->[0]), geConst->new($item->[1]) ] ;
	    } else {
		push @{$self->{data}}, geConst->new($stack,$item);
	    }
	    $flag=1;
	}
	unless ($flag) { $DB::single=1; die "Bad GaMEfile; ends in operator in node '$stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")"; }
    }
    return bless $self,$class;
}

sub get {
    my $self=shift;
    my $reply;
    my $oper='';
    
    if (defined $self->{value}) {return $self->{value};} #shortcut for simple values.
    my @tmp;
    foreach my $item ( reverse @{$self->{data}}) {
	given ($item) {
	    #first, resolve geConst to final value
	    when (ref $_ eq 'geConst') { 
		    my $l_tmp=$item->get;
		    unshift @tmp, (ref $l_tmp eq 'ARRAY') ? @$l_tmp : $l_tmp;
            }
	    # apply uniary operators to the last thing we saw.
	    when (ref $_ eq 'ARRAY') { $tmp[0] = substr(($tmp[0]//''),$_->[0]->get, $_->[1]->get); }
	    when ('!') { $tmp[0] != $tmp[0]; }
	    when ('ltrim') { $tmp[0] =~ s/^\s*//; }
	    when ('rtrim') { $tmp[0] =~ s/\s*$//; }
	    when ('trim') { $tmp[0] =~ s/^\s*(.*?)\s*$/$1/; }
	    #binary operators are kept in place for running the other way.
	    default {unshift @tmp,$_; }
	}
    }
    #@tmp should now be purely x+y-z.... or just x

    $reply=shift @tmp;
    $oper='';
    foreach my $item (@tmp) {
	given ($oper) {
	    when ('')  { $oper = $item;   }
	    when ('+') { $reply += $item; $oper=''; }
	    when ('-') { $reply -= $item; $oper=''; }
	    when ('*') { $reply *= $item; $oper=''; }
	    when ('/') { $reply /= $item; $oper=''; }
	    when ('%') { $reply %= $item; $oper=''; }
	    when ('^') { $reply **=$item; $oper=''; }
	    when ('.') { $reply .= $item; $oper=''; }
	}
    }
    return $reply;
}

1;
