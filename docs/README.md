### Starting up

Simply:
```
perl ae6.pl
```

To point at a specific GaMEfile
```
perl ae6.pl -f MyFile.json
```

To start a story and automatically run several commands:
```
perl ae6.pl -f TestStoryOne.json look;get all;go north;n;n;duck;enchant lantern
```
Note that you can use ';' in the game to provide multiple commands at once.

### Did someone say [WebPerl](https://webperl.zero-g.net/)
Yes. Yes I did.
WebPerl is burdened with some limitations imposed by [emscripten](https://emscripten.org/).
Most notably:
1. The lack of an console for 'normal' Output.
2. The lack of an console for 'normal' Input.
3. Browsers won't paint the screen while a script (i.e. the Perl binary) is running.

WebPerl solves issue 1: 'Output' by letting you write directly to HTML elements, and can even 'magically' direct `print` to an object of your choice.  
I built a proof-of-concept workig around 3: (Painting). Just have your code end, but your main loop is called by JavaScripts' `setInterval`. I'll post this somewhere and update a link here.

That leaves issue 2: Input.  
With emscipten, you can't do `$inut=<STDIN>`{:.PERL}. Emscripten's filesystem just returns `null` from the filehandle, instead of blocking.  
Again, the solution is having your Perl code end, and have an event that triggers a `process_inpt`-type function.

But of corse the program needs to be designed around this flow, and typically they arent.

### Why Not hack some existing engine rather than build a new one?
I looked at [rezrov](http://edmonson.paunix.org/rezrov/) and similar. I decided that making my own engine would be easier.
Or at least more fun.

## DETAILS.

### * ge&lt;Thing&gt;.pm
Specifically: geCan.pm, geCommon.pm, geConst.pm, geExit.pm, geIf.pm, geNode.pm, geSet.pm, geSum.pm, geTest.pm  
These perl modules define the various 'things' that exist in the game's GaME file.  
Each will have its own details below.

### * gme.pm
This is the main interface to the GaME engine. It houses the state information, JSON converter (alright, I just call JSON.pm), input and output and a few utility functions.  
Note that as part of the input is a routine that tries to figure out what got typed. I wouldn't call it a lexical parser. More of a substring guesser.  
It's unreasonably forgiving and just a tiny bit smart. It does a good job of mimmicking what I'm used to seeing, so oong as you don't notice the way it ignores evrything you type that isnt' a known (as of right this moment) word.  

### * ae6.pl
This is a 'refrence' program using gme.pm.  
It handles the command line, load and save, input and output special cases and provdes the cheats.

### * GaMEfile.json
This is the hard part. Mostly because typing JSON in vim is frustrating when you are used to Perl hashes. So many double-quotes.

## GaMEFile details

The basic GaMEfile contains a single JSON object of the form:
#### root of the file
```JSON
{
    "unique_name" : { <base_node> },
    "unique_name2" : {<base_node2> },
    etc...
}
```

