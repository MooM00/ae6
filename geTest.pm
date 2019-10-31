#!perl -I.

use strict;
use warnings;
use v5.14.0;
no warnings 'experimental';

package geTest;
use geConst;

sub new {
    my $class=shift;
    my $stack=shift; $stack=[@$stack,'geTest'];
    my $data=shift;

    my $self={stack=>$stack};

    if (ref $data eq 'HASH') {
	if (defined $data->{and}) { 
	    $self->{and}=[ map { geTest->new($stack,$_) } @{$data->{and}} ] ; 
	} elsif (defined $data->{or}) {
	    $self->{or}=[ map { geTest->new($stack,$_) } @{$data->{or}} ] ; 
	} elsif (defined $data->{not}) {
	    $self->{not}=geTest->new($stack,$data->{not});
	} else {
	    $DB::single=1; die "Bad GaMEfile; unknown conjunction [".join("/",keys %$self)."]on node '$stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")";
	}
    } elsif (ref $data eq 'ARRAY') {
	if ( ($data->[1] eq 'defined') or ($data->[1] eq 'undef') ) { $data->[2]//=''; } #un/def only requires 2 parameters
	if (@$data != 3) { $DB::single=1; die "Bad GaMEfile; test must be 3 elements on node '$stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")";}
	unless ($data->[1]=~/^([=!]=|>=?|<=?|eq|ne|g[te]|l[te]|[=!]~|defined|undef)$/) {
	    $DB::single=1; die "Bad GaMEfile; operator '$data->[1]' unknown on node '$stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")";
	}
	$self->{left}=geConst->new($stack,$data->[0]);
	$self->{oper}=$data->[1];
	$self->{right}=geConst->new($stack,$data->[2]);
    } else {
	$DB::single=1; die "Bad GaMEfile; Test is malformed on node '$stack->[0]' (".join("/",reverse @$stack[2..$#{$stack}]).")";
    }

    return bless $self,$class;
}

sub test {
    my $self=shift;

    if (defined $self->{and}) { map { return 0 unless $_->test() } @{$self->{and}} ; return 1; }
    if (defined $self->{or}) { map { return 1 if $_->test() } @{$self->{or}} ; return 0; }
    if (defined $self->{not}) { return not $self->{not}->test(); }

    my $left= $self->{left}->get;
    if ($self->{oper} eq 'defined') { return defined $left; }
    if ($self->{oper} eq 'undef') { return not defined $left; }
    my $right=$self->{right}->get;
    given ($self->{oper}) {
	when ('==') { return ($left//0) == ($right//0); }
	when ('!=') { return ($left//0) != ($right//0); }
	when ('>=') { return ($left//0) >= ($right//0); }
	when ('>')  { return ($left//0) >  ($right//0); }
	when ('<=') { return ($left//0) <= ($right//0); }
	when ('<')  { return ($left//0) <  ($right//0); }
	when ('eq') { return ($left//'') eq  ($right//''); }
	when ('ne') { return ($left//'') ne  ($right//''); }
	when ('ge') { return ($left//'') ge  ($right//''); }
	when ('gt') { return ($left//'') gt  ($right//''); }
	when ('le') { return ($left//'') le  ($right//''); }
	when ('lt') { return ($left//'') lt  ($right//''); }
	when ('=~') { return ($left//'') =~  ($right//''); }
	when ('!~') { return ($left//'') !~  ($right//''); }
    }
}

1;
