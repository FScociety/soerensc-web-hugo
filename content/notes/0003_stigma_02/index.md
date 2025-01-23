---
title: "Big blood simulation in blender"
layout: article
summary: "My workflow of handling a big fluid simulation in blender"
date: 2024-11-14
programs_used:
    - Blender
    - Nuke
---

{{< image src="media/final.webm" scale=50 >}}

## Intro

The project was a uni project for Filmakademie Baden-Württemberg in collaboration with Akademie für Darstellende Kunst.
Me and another VFX student did the effect and I did this shot from beginning to end.

I choose Blender and the flip-fluids addon for all the 3d stuff and nuke for compositing.
I thought about using houdini but I had no experience and no license, so i went with the safe route.

## Workflow

### Structure

1. Set reconstruction based on 3d scans of the room and the characters
2. A fluid simulation using the 3d mesh as a collision
3. Roto of the characters and compositing. 

### Splitting the project

For the entire 3d process i used blender, which I have a lot of experience.
Though this project was a new challenge :)
In the beginning I naivly had everything in one file, but then I added the simulation the file became incresingly slow.
Therefore the modelling was really painful, so it was clear to me I have to split the project into different files and link them together.

I choose for 3 files:

- rendering.blend

- simulation.blend ( which is linked into rendering )

- modelling.blend ( which is linked into simulation and rendering ) 

Voala everything was up to speed again. This had two other advantages:

- individual versioning of the different working regions / files

- smaller file sizes when versioning. The modelling file was around 1 GB in size, so changing the lighting part made me a new version where the majority of the filesize didn't change.

LEARNING: From this I took away, that its not only usefull for teams to split the project into different files
but it can also be usefull for one person projects. Though it ads complexity and chances for things breaking which for most projets is not worth it

### File versioning
For versioning I used a small script. It would save a copy with an incremented version number to the same directory ( the work dir ). Then another copy with removed version numbers one directory up acting as the publish file.
For example:

    └── modelling
        ├── sh01_mod.blend
        └── work
            └── sh01_mod_01.blend

Later I could relink the published file which always has the same name, so no relinking in the other files.

### Robust linking

Earlier I wrote about my need on why I needed to split up my blend file and how i versionend the files. But for the linking between them to work required some consideration. In the beginning I referenced the collection from the modelling file directly into the rendering and simulation file. Then i noticed that I need different versions of the fluid scene but also different ones for the individual render passes in the rendering file. So i began splitting the different parts of the room into different collections. and then instanced the ones which i needed. The problem with that solution was that it wasn't robust and could easily break. When I rename a collection or restructured the scene in the modeling file I had to update the structure downstream files. 

{{< image src="media/stigma-project-structure.png" scale=50 >}}

So I structured it that the modelling file already defines what the fluid and rendering file will get and prepares this. Adding new stuff to the fluid collision would be super easy, cause I just had to instance the internal Collection from Modelling into the Fluid Export Collection. Also with this I could easily use the hierachy of the collections to make the structure easy. In the render all I want everything to be included, so I only instance the top level instances. But when I need more granular control like in the fluid collection i combine the lower level collections to my liking.  
Then these prepared collections would be linked into the simulation and the rendering file. There a simple geometry node setup is taking the collection instance, realizing the geometry and then changing the material to my liking. This is an advantage over the normal collection instance, cause there you cannot change the material.  
All this made a really robust and easily changeable linking workflow. Iam definetly gona use it for upcoming projects.


## the simulation
After splitting the file into three different parts I had to think of a way on how to bring the simulation back into the rendering file.  
I tried linking the fluid domain object of the flip fluids addon into the rendering file, but flip fluids addon doesn't support this behaviour and showed me nothing.  
Another idea was to link the simulation cache to a new object, which sadly also didn't work.  

So I ended up exportiong the simulation as an alembic sequence, which sadly doubled my simulation size.

## Hardware

In the beginning of the project I only had my personal pc (i7 8700k 64gb gtx 1080). After some tests, it was clear my pc was at its limit.  
To optimize time I wanted to work on the simulation while working on lighting. But I couldn't bake the simulation while it was rendering. I had luck cause a producer of the a pc which she didn't use for the time, so I could borrow it. It was a little slower but this way I could render the last simulation bake to test the lighting and shading while i was already baking the new simulation. This speed up my workflow a lot!  
In the final stage of the project I had luck again and got access to a pc in uni ( amd threadripper 128gb nvidia a6400 ). This speed up rendering and baking a lot and allowed me to go to a final voxel resolution of 1024.  
In uni I also had access to 5 other pcs over the night so i could use them to speed up the rendering.

### Syncronisation

{{< image src="media/stigma-sync-config.png" scale=50 >}}

For this project to work it was crucial to keep the project filesi between the machines in sync. I mostly used syncthing which was amazing. It takes some time to recognize new files but is really robust.  
I also used it to sync to the uni machine, I was lucky to have a really fast internet ( 1GBit/s up and download ) without that it wouldn't really be feasible to sync simulation files between networks.

Besides syncthing I used a project share provided by uni to store the project so all the pcs in uni could be used to help rendering.

### Renderirng

For the rendering to work on many machines I uncecked the Overwrite and checked the Placeholders checkbox.
This way a pc would look for not rendered frames cause it doesn't want to overwrite anything and then places a placeholder file so the other pcs know this frame is getting rendered by somebody else.

I had one problem though. I wasnt using the default output option for rendering, but rather the compositor node *File Output*. This doesnt have the overwrite and placeholder options. 
I solved it by rendering the real image using the *File Output* node and doing the checks with the default node by rendering out a dummy png.

For this to work you need a realtime network share. 
I tried to use this method of render management with syncthing, but that didn't work, because it wasn't syncing the placeholder files fast enough so the other machines would start to render the same frame.
