---
layout: default
---

## ae6 Text Adventure Engine.

###  TL;DR
Text adventure. Think Zork. Need an engine? This’ll do. It reads JSON. It was made as a proof-of-concept for WebPerl

### Basics
ae6 Consists of 3 basic parts.

* gme.pm (and firends) that handle the data
* ae6.pl that drives the logic
* Your story, in a JSON file

You should be ble to write just about any text-only adventre without modifying the code, but I'm not going to tell you what to do.

### 'Installing'
Tytpically I always just put all the files in one directory, but you are weocome to put the .pm's elsewhere so long as that 'elsewhere' is in @INC ( or -I, as you choose).

The default 'GaMEfile' (your .json story) is 'GaMEfile.json', but you can point at any file.

### Starting up

Simply:
```
perl ae6.pl
```

To point at a specific GaMEfile (e.g. the included Martian Mystery. Included courtesy of [spoonman2525](https://www.perlmonks.org/?node_id=1067571). Posted on [PerlMonks](https://www.perlmonks.org/?node_id=1067575) December 18, 2013 )
```
perl ae6.pl -f Martian_Mystery.json
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
With emscipten, you can't do `$inut=<STDIN>`. Emscripten's filesystem jsut returns `null` from the filehandle, instead of blocking.
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
    "unique_name" : { base node },
    "unique_name2" : { base node2 },
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
			If this is missing, ae6 will die.
The may also contain the following keys:
`game_file_compatability` : `some meaningful compatability string`
			This is used to decide if a save game is valid for this story.
			It must be an exact match to the save file.
			It defaults to the same value as `game_file`
`base_attr` : `[ 'attr1', 'attr2',....]`  
			Extra attributes that items can have
			Base attributes	* can only exist in base nodes. 
					* will be included in save files
					* can be updated by the game
			The built-in base attributes are: 
				`type`, `name`, `location`
`find_attr` : `[ 'findattr1', 'findattr2',....]`  
			Extra attributes that items can have.
			Find attributes	* can exist in any node
					* will not be included in savefiles
					* cannot be updaed by the game
You can also update any 'system' attribute. The most common to change are: 
`room` : `starting_room`  Default is 'introduction'
`prompt_default` : `input prompt` 
			Default is `:> `
			If the game changes `prompt`, it is automatically reset to 
			`prompt_default` at the next action.

#### magic base node : "__common_actions" (geCommon.pm)
This contains a list of actions that will be used many times.
```JSON
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
```JSON
"__common_replies" : {
	"verb" : { "look" : { "set" : [ [ "stdout", [ "unknown ", { "input" : "part"} ] ] ] } }
}
```

#### base nodes / other nodes (geNode.pm)
Every base node must have a unique name, and may not be any of the 3 magic names above.

It is of the form
```JSON
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

`<base_attr>` May _only_ appear in base nodes. There is no other difrence in a node's functionality*.

*Note that `__self` and `private` all refer to the base node that they decend from, not the node they are immediately attached to.

##### <base_attr>
They may only contain simple strings.

Base Attributes can appear in any base node as `"base_node" : { "my_base" : "value" }`.
Or you can put them one level deeper as `"base_node" : { "attr" : { "my_base" : "value", "if" : "ever" } }`.
You may choose the first form to simplify your data (or just less typing).
Or the second form to clarify your data.
However, there are 5 reserved words that can only appear in the second form, otherwise they will clash with builtins.
These names are:
*if, *set, *can, *exit, *attr*

##### <find_attr>
They may contain 
* strings
* arrays of strings
* constants

Find Attributes can appear in _any_ node as `"node" : { "my_attr" : "value" }`.
Or you can put them one level deeper as `"node" : { "attr" : { "my_node" : "value", "iff" : "ever" } }`.
You may choose the first form to simplify your data (or just less typing).
Or the second form to clarify your data. It doesn't really matter because the first form is internally changed to the second form at load time.
However, there are 5 reserved words that can only appear in the second form, otherwise they will clash with builtins.
These names are:
*if, *set, *can, *exit, *attr*

Se geConst.pm below for information on constants.

#### If (geIf.pm)
If objects are either
```JSON
 "if" : <if-then-else block>
```
or
```JSON
 "if" : [
 	<if-then-else block>,
 	<if-then-else block>,
	etc...
 ]
```

###### if-then-else block
Of the form
```JSON
	<if test>, <then block> (, <else block>)
```
When ae6 is walking the tree looking for a find-attribute or honoring a do-set (see below), the &lt;if test&gt; will be performed every time and the approprate block followed.

The `&lt;if test&gt;` is described in detail below in geTest.pm
The `&lt;then block&gt;` and `&lt;else block&gt;` (if provided) are regular nodes.

#### Tests (geTest.pm)
A test can be of the form:
` { "and" : { <test1>, <test2>, ... } ` or of the form ` { "or" : { <test1>, <test2>, ... } ` or of the form ` { "not" : <test> } ` or just ` <test> `
Where `<test>` is:
`
 [ <constant>, <oper>, <constant> ]
`
or
`
 [ <constant>, <"defined"|"undef"> ]
`

In the `"and"` form, every test is performed in the order they appear untill one fails. After a failure, no further tests are performed.
If the final  test passes, the test is 'true'. If any fail, the test is 'false'

In the `"or"` form, every test is performed in the order they appear untill one suceeds. After a success, no further tests are performed.
If the final  test fails, the test is 'false'. If any succeed, the test is 'true'

In the `"not"` form, the single test is run. If that test succeeds, then 'false' is returned. If it fails, 'true' is returned.

In a test, `<constant>` is a geConst.pm described below.
`<oper>` must be one of:
* comparing as numbers
    `==`, `!=`, `>=`, `>`, `<=`, `<`
* comparing as text
    `eq`, `ne`, `ge`, `gt`, `le`, `lt`
* Perl regular expressions
    `=~`, `!~`

When comparing as numbers, undefined values are assumed to be 0, so that you don't need to pre-initialize a counter if you don't mind starting at 0.
When comparing as text, undefined values are assumed to be '' (Empty string) so that you don't need to pre-initialize _anything_

Since tests can contain tests (e.g. `"and"`), it is possible to build any logic. There is no limit on depth (untill you run out of RAM. This _is_ Perl).


#### Constants (geConst.pm)
This can have 2 primary forms:
```JSON
 "value"
```
or
```JSON
 { <keyword> : <value> }
```

When the constant is just a value, as in the first case, there is no magic at all. It is just a raw string. 
Being Perl, that string could be a number just by using a neumeric operator.


Where `<keyword>` is one of 
* `node`
	the `<value>` is an array of the form `[ <name>, <attr> ]`.
		the `<name>` here is the name of  a base node (or the special '__self'- see note below)
		the `<attr>` here is an attribute (find or base) to refrence from the node `<name>`
* `private`
	the `<value>` is any variable name and is visible only to the current base node and decendants.
* `global`
	the `<value>` is any variable name and is visible evrywhere.
* `sys`
	This provides acccess to the engines internal settings. The `<value>` is the setting name
	Typically this would be to locate the player by reading the 'room' or checking for longer input in the `input`.
	Check the head of gme.pm for all `sys` settings.
* `stdin`
	the `<value>` is ignored. This refrences the input stream. Use to forge user input, or read text following a `;`
	You dont' need to use this. See geSet.pm below
* `input`
	This gives access to the various parts of the sentance as determined by the input parser. Mor below	
	
#### Setting values (geSet.pm)
This is used to assign values to things.
The values can be constants (geConst.pm) or sums (see geSum.pl below)
The things can be private variables, global variables, system settings or certain system obejcts
```JSON
 "set" : <set>
```
or 
```JSON
 "set" : [ <set1>, <set2>...]
```

Each `<set>` is of the form:
`
	[ <key>, (<type>,) <value> ]
`

Where:
`<key>` is one of
	* `"stop"`	Stop processing `set`. Go back to waiting on user input. (Used to break race conditions.)
	* `"stdin"`	Forge input. The `<value>` is pushed in to gme.pm's stdin buffer.
	* `"stdout"`	Append (not replace) the output stream. `<value>` can be a string or an array.
	* `{"private":<variable>}`
			Set the value of a variable private to this object.
	* `{"global":<variable>}`
			Set the value of a variable that is visible to all objects.
	* `{"node": [<name>, <base_attr>]}`
			Set the base attribute `<base attr>` on the base node called `<nam>`.
			If `<name>` is `"__self"`, it is translated _at load time_ to the base node above this set.
	* `{"sys":<setting>}`
			This provides acccess to the engines internal settings. 
			Typically this would be to teleport (walk) by setting 'room', temporarily changeing 'prompt' or 
			disabling the 'honour_auto_exit' (below). Check the heasd of gme.pm for all `sys` settings.
	* `{"input":<parts>}`
			Provide access to the various parts of the input produced by the input parser.

`<type>` defaults to `"value"` and is one of
	* `"array"`	The right hand side is treated as an array.
	* `"value"`	~The right had side is treated as a single value. Arrays are flattened with `join("",@)`. I should probably 
			add some sort of $RS. Maybe `$self->{sys}{flatten_array_separator}`. Yeah, I'll do that now... Done.~
			The right had side is treated as a single value. Arrays are flattened using the `flatten_array_separator`
			system value to join the strings.
	* `"sum"`	The right hand side must be a sum (geSum.pm)

`<value>` is one of:
	* constant (geConst.pm)		  if `<type>` is `"array"` or `"value"`
	* array of constant (geConst.pm)  if `<type>` is `"array"` or `"value"`
	* sum (geSum.pm)		  if `<type>` if `"sum"`

#### Sums (geSum.pm)
For doing both string and neumerical sums as part of geSet.pm (above). 
```JSON
 "sum", <raw value>
```
or
```JSON
 "sum", [ <computed value>,<oper>,<computed value>(,<oper>,<comuted value>(,...)) ]
```
`<raw value>` is just a string.
`<computed value>` is either 
	* `<value>`   		as contant (geConst.pm)
	* `"!", <value>`	computes the logical-not of `<value>` (as Perl understands ```PERL $x != $x```)
	* `"ltrim", <value>`	
	* `"rtrim", <value>`	
	* `"trim", <value>`	returns `<value>` with whitespace stripped from the left/right/both ends
	* `"sub", [ <num>, <num> ], <value>`		
				returns the substirng of `<value>` starting at byte `<num1>`, ending at byte `<num2>`
				Note that `<num1>` and `<num2>` are (geConst.pm), so can be computed values. 
`<oper>` is one of:
	* `"+"`		adition
	* `"-"`		subtraction
	* `"&mult;"`		multiplication
	* `"/"`		division
	* `"%"`		modulo
	* `"^"`		exponent (in perl, its `&mult;&mult;`)
	* `"."`		string concatenation. So you can do ("1",".","0","/","5") and get "2"

I just realized that this method means that you can't have any of the `<computed value>` special words (!,trim,etc) as actual values. 
Good thing this is math and none of those are numbers.

#### can do (geCan.pm)
Verbs associated with this node. Note that since nodes can apear below `"if"`, this makes it possible to vary an objects possible actions.
Of the form:
```JSON
"can" : {
	<action1>(, <action2>...)
    }
```

```JSON
 {
     <verb> : "1"
 }
```
OR
```JSON
 {
     <verb> : <node>
 }
```
OR
```JSON
 {
     <verb> : [ <node>(, <node>(, ...)) ]
 }
```

Here, `<verb>` can be anything you want. ae6's Input parser can handle verbs and objects haveing a space (e.g. "pick up the red thing" gets understood as verb:"pick up" and object1:"red thing"). Typically most objects will have "get" and most rooms will ahve "go".

In the special case where the right-hand side is `"1"`, a verb of the same name is expected to exist in `__common_actions`. That verb's `<node>` is then deep copied (at load time), so any `__self` or `private` in the common action will (correctly) act as if you cut-and-pasted it in the GaMEfile.

#### Exits (geExit.pm)
Of the form
```JSON
 "exit" : { <exit_name> : <exit_room>(, <exit_name2> : <exit_room2>(,...)) }
```

Here, `<exit_name>` is any string that you want to refrence an exit. Typically "North", "Down", "Door", "Flee".

`<exit_room>` is one of two things:
	* Raw text - the name of a room to go to if the user 'goes to' this exit. This must exactly match a base node's name.
	* `{ "alias" : [ <alias1>(, <alias2>(,...)) ], "target" : <exit_room> }`
		Here, you can provide aliased (`<alias1>`, etc) for an exit.
		This way, you can honour "South", "Swim", "river", "water", but still only have "south" as a visible exit.

Note that if you have `sys->direction_only_verb` set to any valid verb (for the current room), the player can travel by
only entering the name (or alias) of an exit. This is magic in line with most text advenrtures (or every one I've seen)


