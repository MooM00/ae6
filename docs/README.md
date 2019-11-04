8
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
`<base_attr>` May _only_ appear in base nodes. There is no other difference in a node's functionality.
&nbsp;&nbsp;&nbsp;Note that `__self` and `private` all refer to the base node that they descend from, not the node they are immediately attached to.

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
&bull;if, &bull;set, &bull;can, &bull;exit, &bull;attr

See geConst.pm below for information on constants.  

#### If (geIf.pm)
If objects are either
```
 "if" : <if-then-else block>
```
or
```
 "if" : [
 	<if-then-else block>,
 	<if-then-else block>,
	etc...
 ]
```

###### if-then-else block
Of the form
```
	<if test>, <then block> (, <else block>)
```
When ae6 is walking the tree looking for a find-attribute or honoring a do-set (see below), the &lt;if test&gt; will be performed every time and the approprate block followed.

The `<if test>` is described in detail below in geTest.pm
The `<then block>` and `<else block>` (if provided) are regular nodes.

#### Tests (geTest.pm)
A test can be of the form:
```
{ "and" : { <test1>, <test2>, ... } 
```
or 
``` 
{ "or" : { <test1>, <test2>, ... } 
``` 
or 
``` 
{ "not" : <test> } 
``` 
or just 
```
<test> 
````

Where `<test>` is:
```
 [ <constant>, <oper>, <constant> ]
```
or
```
 [ <constant>, <"defined"|"undef"> ]
```

In the `"and"` form, every test is performed in the order they appear untill one fails. After a failure, no further tests are performed.  
If the final  test passes, the test is 'true'. If any fail, the test is 'false'  

In the `"or"` form, every test is performed in the order they appear untill one suceeds. After a success, no further tests are performed.  
If the final  test fails, the test is 'false'. If any succeed, the test is 'true'  

In the `"not"` form, the single test is run. If that test succeeds, then 'false' is returned. If it fails, 'true' is returned.  

In a test, `<constant>` is a geConst.pm described below.  
`<oper>` must be one of:  
&nbsp;&nbsp;&nbsp;&bull; comparing as numbers
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`==`, `!=`, `>=`, `>`, `<=`, `<`
&nbsp;&nbsp;&nbsp;&bull; comparing as text
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`eq`, `ne`, `ge`, `gt`, `le`, `lt`
&nbsp;&nbsp;&nbsp;&bull; Perl regular expressions
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`=~`, `!~`

When comparing as numbers, undefined values are assumed to be 0, so that you don't need to pre-initialize a counter if you don't mind starting at 0.  
When comparing as text, undefined values are assumed to be '' (Empty string) so that you don't need to pre-initialize _anything_  

Since tests can contain tests (e.g. `"and"`), it is possible to build any logic. There is no limit on depth (untill you run out of RAM. This _is_ Perl).  


#### Constants (geConst.pm)
This can have 2 primary forms:
```json
 "value"
```
or
```
 { <keyword> : <value> }
```

When the constant is just a value, as in the first case, there is no magic at all. It is just a raw string.   
Being Perl, that string could be a number just by using a neumeric operator.


Where `<keyword>` is one of  
&nbsp;&nbsp;&nbsp;&bull; `node`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the `<value>` is an array of the form `[ <name>, <attr> ]`.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the `<name>` here is the name of  a base node (or the special '__self'- see note below)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the `<attr>` here is an attribute (find or base) to refrence from the node `<name>`  
&nbsp;&nbsp;&nbsp;&bull; `private`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the `<value>` is any variable name and is visible only to the current base node and decendants.  
&nbsp;&nbsp;&nbsp;&bull; `global`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the `<value>` is any variable name and is visible evrywhere.  
&nbsp;&nbsp;&nbsp;&bull; `sys`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This provides acccess to the engines internal settings. The `<value>` is the setting name  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Typically this would be to locate the player by reading the 'room' or checking for longer input in the `input`.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Check the head of gme.pm for all `sys` settings.  
&nbsp;&nbsp;&nbsp;&bull; `stdin`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the `<value>` is ignored. This refrences the input stream. Use to forge user input, or read text following a `;`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You dont' need to use this. See geSet.pm below  
&nbsp;&nbsp;&nbsp;&bull; `input`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This gives access to the various parts of the sentance as determined by the input parser. More below  
	

#### Setting values (geSet.pm)
This is used to assign values to things.  
The values can be constants (geConst.pm above) or sums (see geSum.pl below)  
The things can be private variables, global variables, system settings or certain system obejcts  
```
 "set" : <set>
```
or 
```
 "set" : [ <set1>, <set2>...]
```

Each `<set>` is of the form:
```
	[ <key>, (<type>,) <value> ]
```

Where:  
`<key>` is one of  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `"stop"`	Stop processing `set`. Go back to waiting on user input. (Used to break race conditions.)  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `"stdin"`	Forge input. The `<value>` is pushed in to gme.pm's stdin buffer.  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `"stdout"`	Append (not replace) the output stream. `<value>` can be a string or an array.  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `{"private":<variable>}`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Set the value of a variable private to this object.  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `{"global":<variable>}`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Set the value of a variable that is visible to all objects.  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `{"node": [<name>, <base_attr>]}`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Set the base attribute `<base attr>` on the base node called `<name>`.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If `<name>` is `"__self"`, it is translated _at load time_ to the base node above this set.  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `{"sys":<setting>}`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This provides acccess to the engines internal settings.   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Typically this would be to teleport (walk) by setting 'room', temporarily changeing 'prompt' or  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;disabling the 'honour_auto_exit' (below). Check the head of gme.pm for all `sys` settings.  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `{"input":<parts>}`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Provide access to the various parts of the input produced by the input parser.  

`<type>` defaults to `"value"` and is one of  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `"array"`	The right hand side is treated as an array.  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `"value"`	~~The right had side is treated as a single value. Arrays are flattened  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;with `join("",@)`. I should probably add some sort of $RS.   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maybe `$self->{sys}{flatten_array_separator}`. Yeah, I'll do that now... Done.~~    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The right had side is treated as a single value.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Arrays are flattened using the `flatten_array_separator`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;system value to join the strings.  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `"sum"`	The right hand side must be a sum (geSum.pm)  

`<value>` is one of:  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; constant (geConst.pm)		  if `<type>` is `"array"` or `"value"`  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; array of constant (geConst.pm)  if `<type>` is `"array"` or `"value"`  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; sum (geSum.pm)		  if `<type>` if `"sum"`  

#### Sums (geSum.pm)
For doing both string and neumerical sums as part of geSet.pm (above). 
```
 "sum", <raw value>
```
or
```
 "sum", [ <computed value>,<oper>,<computed value>(,<oper>,<comuted value>(,...)) ]
```

`<raw value>` is just a string.  
`<computed value>` is either  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `<value>`   		as constant (geConst.pm)  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `"!", <value>`	computes the logical-not of `<value>` (as Perl understands `$x != $x`)  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `"ltrim", <value>`  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `"rtrim", <value>`  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `"trim", <value>`	returns `<value>` with whitespace stripped from the left/right/both ends  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `"sub", [ <num1>, <num2> ], <value>`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;returns the substirng of `<value>` starting at byte `<num1>`, ending at byte `<num2>`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Note that `<num1>` and `<num2>` are (geConst.pm), so can be computed values.  
`<oper>` is one of:  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `"+"`		adition  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `"-"`		subtraction  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `"\*"`		multiplication  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `"/"`		division  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `"%"`		modulo  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `"^"`		exponent (in perl, its `**`)  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `"."`		string concatenation. So you can do ("1",".","0","/","5") and get "2"  

I just realized that this layout means that you can't have any of the `<computed value>` special words (!,trim,etc) as actual values.  
Good thing this is math and none of those are numbers.  


#### Exits (geExit.pm)
Of the form
```
 "exit" : { <exit_name> : <exit_room>(, <exit_name2> : <exit_room2>(,...)) }
```

Here, `<exit_name>` is any string that you want to refrence an exit. Typically "North", "Down", "Door", "Flee".  

`<exit_room>` is one of two things:  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `<exit_room>` - the name of a room to go to if the user 'goes to' this exit.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This must exactly match a base node's name.  
&nbsp;&nbsp;&nbsp;&nbsp;&bull; `{ "alias" : [ <alias1>(, <alias2>(,...)) ], "target" : <exit_room> }`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Here, you can provide aliases (`<alias1>`, etc) for an exit.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This way, you can honour "South", "Swim", "river", "water", but still  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only have "south" as a 'visible' exit.  

Note that if you have `sys->direction_only_verb` set to any valid verb (for the current room), the player can travel by  
only entering the name (or alias) of an exit. This is magic in line with most text advenrtures (or every one I've seen)  

### The sys->{input}{_&lt;thing&gt;_} that are important

Of importance to note about how `ParseInput` sees the world.
It gets a list of evry viable word. For every item in inventory or the room, the room itself and every exit it gathers their name, alias(es) and actions.  
It then scans the sentance for anything that matches one of those words, or the beginning of one. if there are multiple matches, it'll say what conflicted.
In the event that one word is the beginning of another, it'll 'do the right thing'  
e.g.
If there are words 'ball', 'balloon' and 'one big ball' and 'onerous task'
Then  
'oner' matches 'onerous task'
'b' will list 'ball' and 'balloon' as possible matches.  
'ball' will match 'ball' and not complain about 'balloon'
'one b' will match 'one big ball' and wont' think its 'one' and 'b'

_Anything typed that does not match a word in the list is silently ignored_  
'_get all_ things', '_get all_' and 'frobnicate _get_ things to the max that _all_ you people want' will behave the same 
(unless the GaMEfile check sys->{input}{sentance})

There are several `_<things>_` produced by `ParseInput` that you may want to consider.
Firstly, `ParseInput` will check sys->{stdin} and pull the text from the beginning of the string up to the first ';'. It will strip that and leave the rest in sys->{stdin}.  
If the user enters 'up;left;up', then `ParseInput` would process 'up', leaving 'left;up' in sys->{stdin} for the next cycle.

`sys->{input}{sentance}`  The sentance parsed (i.e. the bit before the first ';', or all of sys->{stdin} if there are no ';')  
`sys->{input}{verb}`	The name of the action, even if an alias was entered.
`sys->{input}{verb_raw}`  What was actually typed (in case you care wether the user uses abbreviations)
`sys->{input}{verb_word}`  The word that was matched. i.e. this may be an alias.
`sys->{input}{verb_name}`  Same as sys->{input}{verb}
`sys->{input}{implied_object}`  the object that the verb was attached to (or the first one  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;we saw), in case there is no object in the sentance  
`sys->{input}{implied_object_node}`  A pointer to the implied object, since we won't have any other handle to it.

As to the object(s) returned, `ParseInput` will allow up to sys->{max_obj_in_input} Objects. They will be numbered in the order in which they appear in the sentance.
The list below would equally apply to `<object2>` and `<object3>`, etc.

`sys->{input}{object1}`       A pointer to the object1 object.
`sys->{input}{object1_raw}`   What was actually typed (in case you care wether the user uses abbreviations)  
`sys->{input}{object1_word}`  The word that was matched. i.e. this may be an alias.  
`sys->{input}{object1_name}`  The name of the action, even if an alias was entered  


Read the provided GaMEfile to see it all in action.
