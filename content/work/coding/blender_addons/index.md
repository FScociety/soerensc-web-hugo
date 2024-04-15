---
title: "Blender Workflow Addons"
programs_used:
    - Blender
---

While doing my internship at Faber Courtial I created some addons for blender, to connect blender more easily into the studio workflow.
3 of them I was allowed to release to the public.

## [EasyAutomation](https://github.com/FScociety/EasyAutomation)

A simple addon to ease the automation and scripting workflow in blender.
It allows you to expose variables of your python script and run them from the 3d viewport.
I created it, so you could make exports of unconvetional objects easier by defining a custom script for it.

{{< own_gallery folder="media/easy_automation/*" rowHeight= 300 />}}

## [QuixelAddonFork](https://github.com/FScociety/Blender-Quixel-Bridge)

A modified version of the Quixel Bridge import script for blender. For every imported material it creates a nice node group, which makes material mixing easier.

{{< image src="media/quixel_bridge.webp" >}}

## [DynamicUV](https://github.com/FScociety/Dynamic-UV)

{{< row >}}
    {{< text >}}
Inspirered by the 3dsMax dynamic UV Unwrapping modifiers I wanted to recreate this functionality in blender.
So i created a box and a planar uv unwrapper in geometry nodes and wrote a wrapper script around them to add them to your object.
    {{< /text >}}
    {{< image src="media/dynamic_uv.webp" >}}
{{< /row >}}