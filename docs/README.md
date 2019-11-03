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

