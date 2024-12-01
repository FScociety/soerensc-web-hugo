---
title: "Big blood simulation in blender"
layout: single
summary: "My workflow of handling a big fluid simulation in blender"
---

{{< image src="media/final.webm" scale=50 >}}

## Software choice
I choose Blender and the flip-fluids addon for all the 3d stuff and nuke for compositing.
I thought about using houdini but I had no experience and no license, so i went with the safe route.

## Shot structure

1. Set reconstruction based on 3d scans of the room and the characters
2. A fluid simulation using the 3d mesh as a collision
3. Roto of the characters and compositing. 

## Workflow

### Splitting into different files
For the entire 3d process i used blender, which I have a lot of experience.
Though this project was a new challenge. 
In the beginning I naivly had everything in one file, but then I started to play around with the sim everything became slow.
The modelling was really painfull, so it was clear to me I have to split the project into different files.
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

TODO: GEONODE bin ich mir noch nicht ganz so sicher und muss nochmal in die files schauen

### using geo node for linking.

## the simulation
After splitting file into three different parts I had to think of a way on how to bring the simulation from the simulation to the rendering file. I did some experimentation with the flip fluids addon, but had no success in linking the domain object from the simulation file into the rendering file. Also importing the raw simulation cache with a new domain object didn't work, so I choose to export alembic caches. These made the hole process a lot slower and basicly doubled my cache size,
but with the time constrains I couldn't find anything *smarter*.

## Hardware

In the beginning of the project I only had my personal pc (i7 8700k 64gb gtx 1080).
After some tests, it was clear my pc was at its limit. A big problem was that i trying to simulating and rendering simulatinoiusly to speed up my workflow.
But with only one pc this was not really possible. I had the luck to be able to rent a second pc from a friend and place.
I was a little slower but this way i could render the last simulation bake to test the lighting and shading while i was already baking the new simulation.
This speed up my workflow a lot.
In the final stage of the project i got acces to a new pc in uni which really rescured the project ( amd threadripper 128gb nvidia a6400 ).
This speed up rendering and baking a lot and allowed me to go to a final voxel resolution of 1024.
In uni i also had acces to 5 other pcs with varying configuration to render over night which also speed up my ability to test things.

### Syncronisation

For this project to work it was crucial to sync the project files between the machines.
I mostly used syncthing which was amazing. I takes some time to recognize new files but is really robust.
I also used it to sync to the uni machine, I was lucky to have a fast internet without that it would probably would be much more tedious to sync big new simulations.
The pc in the uni synced it then through a project share to other devices.

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
