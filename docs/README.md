9
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
With emscipten, you can't do `$input=<STDIN>`{:pl}. Emscripten's filesystem just returns `null` from the filehandle, instead of blocking.  
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
```
{
    "unique_name" : { <base_node> },
    "unique_name2" : { <base_node2> },
    etc...
}
```

Each object in the root node is either a room or a thing (or one of the 3 magic nodes below).  
There is no actual difrence between rooms and things. There is nothing stopping you having a `get` action on something with `type` of `room`.  
Here's a secret: nothing actually reads the `type` setting. Your story can, of corse, since it's a 'base attribute'.  
But nothing in ae6 will care if you are allowed to pick up a room or walk in to a box of matches.  

#### magic base node : "__meta"
This must contain the key  
`game_file` : `short name of the story`  
&nbsp;&nbsp;&nbsp;If this is missing, ae6 will die.


It may also contain the following optional keys:  
`game_file_compatability` : `some meaningful compatability string`  
&nbsp;&nbsp;&nbsp;This is used to decide if a save game is valid for this story.  
&nbsp;&nbsp;&nbsp;It must be an exact match to the save file.  
&nbsp;&nbsp;&nbsp;It defaults to the same value as `game_file`  

`base_attr` : `[ 'attr1', 'attr2',....]`
&nbsp;&nbsp;&nbsp;Extra attributes that items can have  
&nbsp;&nbsp;&nbsp;Base attributes  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull; can only exist in base nodes.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull; will be included in save files  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull; can be updated by the game  
&nbsp;&nbsp;&nbsp;The built-in base attributes are:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`type`, `name`, `location`

`find_attr` : `[ 'findattr1', 'findattr2',....]`  
&nbsp;&nbsp;&nbsp;Extra attributes that items can have.  
&nbsp;&nbsp;&nbsp;Find attributes  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull; can exist in any node  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull; will not be included in savefiles  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&bull; cannot be updaed by the game  

You can also update any 'system' attribute. The most common to change are:   
`room` : `starting_room`  
&nbsp;&nbsp;&nbsp;Default is 'introduction'  
`prompt_default` : `input prompt`  
&nbsp;&nbsp;&nbsp;Default is `:> `  
&nbsp;&nbsp;&nbsp;If the game changes `prompt`, it is automatically reset to   
&nbsp;&nbsp;&nbsp;`prompt_default` at the next action.  

#### magic base node : "__common_actions" (geCommon.pm)
This contains a list of actions that will be used many times.
```json
 "__common_actions" : {
     "look" : { "set" : [ [ "stdout" , "array", [ { "node" : [ "__self", "descr" ] } ] ] ] } 
}
```
They are not applied automatically, but rather an individual action (see below) can be set to a value of "1".    
At load time, that "1" will be replaced with a _clone_ of the common action provided here.  
See the sction on geCan.pm for full details.  

#### magic base node : "__common_replies"  
These are replies to be used when a sentance is only partially understood.  
If only a verb is found (e.g. `poke`), the common reply for `verb:poke` (or `both:poke`) will be executed.  
If only an object is detected (e.g. `cheese`), the common reply for `object:cheese` (or `both:cheese`) will be executed.  
This is not fully implemented for some reason.  
```json
"__common_replies" : {
	"verb" : { "look" : { "set" : [ [ "stdout", [ "unknown ", { "input" : "part"} ] ] ] } }
}
```

#### base nodes / other nodes (geNode.pm)
Every base node must have a unique name, and may not be any of the 3 magic names above.

It is of the form
```
 "unique_name" : {
     [ <base_attr>[ ,<base_attr>....],]
     [ <find_attr>[ ,<find_attr>....],]
     [ <if> ,]
     [ <set> ,]
     [ <can> ,]
     [ <exit> ,]
 }
```
Note that the order is not relevant in any hash (`{..}`) in JSON. You don't even need to keep the atributes together.
*
`<base_attr>` May _only_ appear in base nodes. There is no other difference in a node's functionality[1].

[1]Note that `__self` and `private` all refer to the base node that they descend from, not the node they are immediately attached to.

##### <base_attr>
They may only contain simple strings.

Base Attributes can appear in any base node as `"base_node" : { "my_base" : "value" }`.  
Or you can put them one level deeper as `"base_node" : { "attr" : { "my_base" : "value", "if" : "ever" } }`.  
You may choose the first form to simplify your data (or just less typing).  
Or the second form to clarify your data.  
However, there are 5 reserved words that can only appear in the second form, otherwise they will clash with builtins.  
These names are:  
&bull;if, &bull;set, &bull;can, &bull;exit, &bull;attr

##### <find_attr>
They may contain 
&nbsp;&nbsp;&nbsp;&bull;strings  
&nbsp;&nbsp;&nbsp;&bull;arrays of strings  
&nbsp;&nbsp;&nbsp;&bull;constants  

Find Attributes can appear in _any_ node as `"node" : { "my_attr" : "value" }`.  
Or you can put them one level deeper as `"node" : { "attr" : { "my_node" : "value", "iff" : "ever" } }`.  
You may choose the first form to simplify your data (or just less typing).  
Or the second form to clarify your data. It doesn't really matter because the first form is internally changed to the second form at load time.  
However, there are 5 reserved words that can only appear in the second form, otherwise they will clash with builtins.  
These names are:  
*if, *set, *can, *exit, *attr*

See geConst.pm below for information on constants.  

