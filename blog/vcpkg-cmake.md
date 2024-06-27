---
title: Common vcpkg and cmake problems
layout: default
nav_order: 140
has_children: false
description: descript the common vcpkg and cmake error messages.
parent: Blogs for pagehelper
---

## Trying to delete the ```build``` folder and reconfig

If you didn't try it, do it first.
```sh
-- Configuring done
CMake Error in CMakeLists.txt:
  No known features for CXX compiler

  "GNU"

  version 11.2.0.

CMake Generate step failed.  Build files cannot be regenerated correctly.
```
Maybe you copy a CMakeLists.txt from another project and it has some feature don't support on this machine the error will occur. like CUDA.

## Could not find a package configuration file provided by "xxx"  with any of the following names:

if ```cmake.sourceDirectory``` point to the CMakeLists.txt different from which you intended to then vcpkg and cmake cann't find any package in the CMakeLists.txt file.

Checking the ```.vscode/settings.json``` or user specific setting file to confirm the value. And if you look at the output terminal you may find the whole cmake command be executed,  check the folder the command using.

## cannot find -lopencv_core: No such file or directory

If you already use ```opencv_world``` which may include all the mentioned missing libs. Try to tell compiler only to link ```opencv_world``` only.

```cmake
find_package( OpenCV REQUIRED )
include_directories( ${OpenCV_INCLUDE_DIRS} )
# ADDED the line bellow.
set(OpenCV_LIBS opencv_world)
target_link_libraries( main PRIVATE ${OpenCV_LIBS} )
message(STATUS "OpenCV_LIBS: ${OpenCV_LIBS}")
```
