---
title: How to setup a uWebSockets C++ Project
layout: default
nav_order: 70
has_children: false
description: Learn about setting up a C++ development environment on WSL2 in Windows 11 using vcpkg and VS Code. Gain insights into managing dependencies with CMake and setting up a uWebSockets tutorial project.
parent: Blogs for pagehelper
---

## My Development Environment

I'm using WSL2 on Windows 11, with vcpkg as the package manager and VS Code as my IDE.

To ensure the successful build of a C++ project, it's crucial to resolve all dependencies. The key lies in informing CMake about where to locate them.

For my uWebSockets tutorial, I've created a subdirectory named uw, within which I've placed a CMake file.


<pre><code class="hljs"><style>
.hljs-link,
.hljs-operator,
.hljs-regexp,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-symbol,
.hljs-template-variable,
.hljs-variable {
  color: #ab5656;
}
</style><span class="hljs-keyword" style="font-weight: 700;">find_path</span>(UWEBSOCKETS_INCLUDE_DIRS <span class="hljs-string" style="color: #800;">&quot;uwebsockets/App.h&quot;</span>)
<span class="hljs-keyword" style="font-weight: 700;">find_path</span>(USOCKET_LIB_A <span class="hljs-string" style="color: #800;">&quot;lib/libuSockets.a&quot;</span>)
<span class="hljs-keyword" style="font-weight: 700;">find_package</span>(ZLIB REQUIRED)
<span class="hljs-keyword" style="font-weight: 700;">add_executable</span>(UwStart)
<span class="hljs-keyword" style="font-weight: 700;">include_directories</span>(<span class="hljs-string" style="color: #800;">&quot;${UWEBSOCKETS_INCLUDE_DIRS}&quot;</span>)
<span class="hljs-keyword" style="font-weight: 700;">include_directories</span>(<span class="hljs-string" style="color: #800;">&quot;${UWEBSOCKETS_INCLUDE_DIRS}/uwebsockets&quot;</span>)
<span class="hljs-keyword" style="font-weight: 700;">target_sources</span>(UwStart PRIVATE start.cpp)
<span class="hljs-keyword" style="font-weight: 700;">target_link_libraries</span>(UwStart <span class="hljs-string" style="color: #800;">&quot;${USOCKET_LIB_A}/lib/libuSockets.a&quot;</span> ZLIB::ZLIB)</code></pre>

### find_path

The [vcpkg document](https://learn.microsoft.com/en-us/vcpkg/users/buildsystems/cmake-integration) mentions that after the vcpkg toolchain takes effect, the find_path command will search the directories managed by vcpkg.

So here, we're searching for the header files for uWebSockets and the uSockets static library.

**Carefully watch the output of cmake;** there is a lot of information about the installed packages.

```txt
[cmake] The package zlib is compatible with built-in CMake targets:
[cmake] 
[cmake]     find_package(ZLIB REQUIRED)
[cmake]     target_link_libraries(main PRIVATE ZLIB::ZLIB)
[cmake] 
[cmake] uwebsockets is header-only and can be used from CMake via:
[cmake] 
[cmake]   find_path(UWEBSOCKETS_INCLUDE_DIRS ")uwebsockets/App.h")
[cmake]   target_include_directories(main PRIVATE ${UWEBSOCKETS_INCLUDE_DIRS})
[cmake] 
```

### run cmake build

**Watch the OUTPUT carefully**. I missed the ZLIB dependency at the beginning. Look at the log bellow:

```log
[build] : && /usr/bin/c++ -g  uw/CMakeFiles/UwStart.dir/start.cpp.o -o uw/UwStart  vcpkg_installed/x64-linux/debug/lib/libuSockets.a && :
[build] /usr/bin/ld: uw/CMakeFiles/UwStart.dir/start.cpp.o: in function `uWS::DeflationStream::~DeflationStream()':
[build] helloworld/build/vcpkg_installed/x64-linux/include/uwebsockets/PerMessageDeflate.h:211: undefined reference to `deflateEnd'
[build] /usr/bin/ld: uw/CMakeFiles/UwStart.dir/start.cpp.o: in function `uWS::InflationStream::~InflationStream()':
[build] helloworld/build/vcpkg_installed/x64-linux/include/uwebsockets/PerMessageDeflate.h:224: undefined reference to `inflateEnd'
[build] collect2: error: ld returned 1 exit status
[build] ninja: build stopped: subcommand failed.
```

Follow the reference chains it shows it's from the zlib. So I added ZLIB dependency. Now it builds.

```txt
[build] [2/2] Linking CXX executable uw/UwStart
[driver] Build completed: 00:00:04.492
[build] Build finished with exit code 0
```

### Start the simple server.

Source code:

```c++
#include "App.h"
int main()
{
	/* Overly simple hello world app */
	int port = std::getenv("SERVER_PORT") ? std::stoi(std::getenv("SERVER_PORT")) : 3000;
	std::cout << "Starting server on port " << port << std::endl;
	uWS::App()
		.get("/*", [port](auto *res, auto * /*req*/) // Capture 'port' in the lambda capture list
			 { res->end("Hello world!"); })
		.listen(port, [port](auto *listen_socket) // Capture 'port' in the lambda capture list
				{
	    if (listen_socket) {
			std::cout << "Listening on port " << port << std::endl;
	    } })
		.run();
	std::cout << "Failed to listen on port 3000" << std::endl;
}
```

Command to start:

```bash
j:~/helloworld$ SERVER_PORT=3001 ./build/db/uw/UwStart 
Starting server on port 3001
Listening on port 3001
```
