# ae6
AE6 text Adventure Engine

TL;DR

Text adventure. Think Zork.
Need an engine? This'll do. It reads JSON.

Honestly, the zmachine that zork runs on is pretty amazing, but I had a specific use case it wasn't suited for....

Specifically, This project exists as a proof-of-concept for WebPerl (https://webperl.zero-g.net)
I wanted to show web per working in an interactive environment, and what could be better than a text adventure.
Trouble is, the limitations on emscripten makes 'normal' I/O (like $line=<STDIN>) impossible.

To that end, patchign the zmachine to work on WebPerl seemed harder than just rolling my own. 
Plus this was an... interesting challenge.

There are two branches in this repository: 
main runs on the command line (It assumes windows in one line-> cls. I should fix that)
webperl-ae6 is modified to run in WebPerl.

Enjoy.
