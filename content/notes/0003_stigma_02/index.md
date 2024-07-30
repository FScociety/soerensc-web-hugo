---
title: "STIGMA II: workflow of a big fluid simulation in blender"
layout: blank
---

## Introduction
This is a followup the last article "My first experience as an on set VFX sup".

## Software choice
I am very comftable with blender but wanted to try houdini for this project. Also its fluid simulation capabilities are more feature rich and superior. Saldy our uni doens't provide us with student licenses for personal devices, only for uni pcs. Which at the time I had no access to. The only option would have been a non commerical license from houdini, which woud have had restrictions in rendering and exporting.
Simultaniously I was trying out the "flip fluids" addons for blender and it looked very promising. 
So I went with blender.  
For comp I went with nuke, I didn't have a lot of experience prior, but I wanted to learn it and had a non restrictive student license.

## vfx setup
The shot had following setup:
- match the camera
- model room based on photoscans
- light
- simulation
- comp

Note: this isn't the exact order of steps. I did a lot of things simultaniously.

## workflow
Relativly quickly I noticed the fluid simulation was slowing everything down. I had everything in the same file: modeling, sim and render.
So I split the file into 3: modeling, simulation and rendering. I was linking them together.
modeling -> simulation, rendering
simulation -> rendering ... wait
I was thinking, I could just link the domain object from flip fluids into the new file and it would recognize it. Hm it wasn't that easy. Somehow the linked collection wouldn't show the simulation, so everytime I had finished the sim I would export it as an alembic sequence.
Which I could import in the rendering file, which also felt a bit safer to version and to handle than the simulation cache folder.

I then used a small script from another project which would help me version the file and update it for linking.
I'll explain its working with an example file: "project/modeling/work/modeling_03.blend".
Then the script is run, it copies the current file and increments the version number to "project/modeling/work/modeling_04.blend" and also write the file one directory up to "project/modeling/modeling.blend".
The file without a version number is there to be linked into other blend files and without the version it keeps it's name.



## the simulation

