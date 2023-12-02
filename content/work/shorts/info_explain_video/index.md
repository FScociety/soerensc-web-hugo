---
title: "Computer sciene explainer video"
draft: false
year: "2021"
weight: 30
---

For my 11th grade computer science class, I was asked to make a StopMotion movie explaining a principle of computer science. I decided to make a dramatic production with Lego.

{{< youtube-lite src="Pkx-H8FAbDk" >}}

## Story

The story is about a robot that gets an order from the user to remove an element at the beginning of a list. The robot accepts this command and calls the first element of the list (a person). It asks this element who is its successor (future first element). Then it shoots/removes the first and calls its successor. After the command "Remove first" is executed again, it removes the new first one as well.

## VFX

To make the shot at "0:55" even more dramatic, I wanted to include blood particles. For this I quickly modeled a round Lego brick in Blender, created a material and a suitable particle system.

I thought about how to visually represent the command transmission at "0:24". The result was a text made of Lego bricks. To make the whole thing more appealing, I let the Lego bricks slowly form the text and then full up with green color. I realized the whole thing in Blender with the tools "Shader Nodes" and "Geometry Nodes".

Small remark: During production my PC broke down, so I had to use my old laptop, whose screen doesn't have much color depth, because of that there are some hard color transitions in some places.