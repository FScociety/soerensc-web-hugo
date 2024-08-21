---
title: "STIGMA II: Big blood sim in blender"
layout: single
summary: "My workflow of handling a big fluid simulation in blender"
---

{{< image src="media/BACKDROP.webp" scale="75" >}}


## Introduction
This is a followup to the last article "My first experience as an on set VFX sup". (Insert link here)

## Software choice
I went with blender and the flip fluids addon. 
Why not houdini you may ask?
I never used it before but actually wanted to try it out for this project, but sadly licenses came in my way.
Our school has houdini licenses, but as a first year students you don't have access to on campus pcs so no license either.
I think there was a non commerial license, but it had restrictions which were unfeasible for the project.
For comp I went with nuke, they generesly had a free student license for my personal pc. ( This was my second project in nuke so a lot of things there very new to me ).

## Structure
The shot had different components :

- CG double of the room assembled from 3D scans and hand models. 
Which I used for shadow catching, fluid collision, occlusion for static objects

- fluid simulation

- roto of moving foreground characters. It was unrealistic to match move them in 3d, so I took the rough 3d scans of the character just for reflection and not occlusion.

## Workflow

### Splitting into different files
For the entire 3d process i used blender, which was handy cause I had experience in handling big files in it. 
Though this project was a new challenge. 
In the beginning I naivly had everything in one file, but then I started to play around with the sim everything became slow.
The modelling was impact the most, it was clear to me I have to split the project into different files.
I choose for 3 files:

- rendering.blend

- simulation.blend ( which is linked into rendering )

- modelling.blend ( which is linked into simulation and rendering ) 

Voala everything was up to speed again. This had two other advantages:

- individual versioning of the different working regions / files

- smaller file sizes when versioning. ( the modelling file was huge ( 1GB ). When I a new version of lighting I then only had to update version the lightweight rendering file and not the bloated modelling )

LEARNING: From this I took away, that its not only usefull for teams to split the project into different files
but it can also be usefull for one person projects. Though it ads complexity and chances for things breaking which for most projets is not worth it

### File linking and versioning
For versioning I used a small script from another project.
It would save the file a an incremented version number to the same directory ( the working dir ).
Then one directory it would remove the the version from the name and store it there.
For example:

    └── modelling
        ├── sh01_mod.blend
        └── work
            └── sh01_mod_01.blend

When using this structure you can link to the file without versioning and will work with new versions.

TODO: GEONODE bin ich mir noch nicht ganz so sicher und muss nochmal in die files schaune

### using geo node for linking.

## the simulation
After splitting file into three different parts I had to think of a way on how to bring the simulation from the simulation to the rendering file. I did some experimentation with the flip fluids addon, but had no success in linking the domain object from the simulation file into the rendering file. Also importing the raw simulation cache with a new domain object didn't work, so I choose to export alembic caches. These made the hole process a lot slower and basicly doubled my cache size,
but with the time constrains I couldn't find anything *smarter*.

## handling the compute

In the beginng 

When I was doing the software choice it looked like I was stuck with my home pc ( i7800k 64gb gtx 1080 ).
But to my rescue in the process I actually got a seat to use a uni pc ( amd threadripper 128gb a6400 ).

### setup before the upgrade

While at home, a producer of the project was generous to give me her pc ( i6xxxx 32gb gtx 1070 ) for the project which really helped.
So I could start a simulation on one machine and work rendering on the other.
This really helped and speed up the process, though both pcs were a lot of the times at their limit.

To keep everything in sync I used Syncthing to keep in a synced folder between the pcs. 

### setup after the upgrade

At uni I also used syncthing to keep in sync with my pc at home.
On the uni pc the project was stored on a local network share made availible by the uni.
In the night I could use empty pcs to help out with rendering.
The network share helped me to render the project in sync without a dedicated render manager.
When rendering an image sequence in blender you can set the options:
Overwrite to **false** and Placehold to **true**.
This would allow one pc to mark the frame he is rendering right now (placeholder option) and
skip the frames already rendered by the other clients (overwrite option).

Note: I had one problem. I wasnt using the default output option for rendering, 
but rather the compositor node *File Output* for rendering. This doesnt have the overwrite and placeholder options.
I solved it by rendering the real image using the *File Output* node and a dummy png in the Output Tab
which would keep track of render management.

Note: For this to work you need a fast network share. 
I tried to use this method of render management with syncthing, which did not work, because it wasn't syncing the placeholder files fast enough so the two clients would render the same frame.
