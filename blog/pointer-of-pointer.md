---
title: Pointer of pointer or reference of pointer
layout: default
nav_order: 150
has_children: false
description: subtle difference between pointer of pointer and reference of pointer
parent: Blogs for pagehelper
---

## Want to bring a ponter out of a function optionally.

Bellow is an example function, I want optionally bring the ```device_tree_pointer``` to outside of the function.
```C++
    template <typename T, size_t KDim>
    void build_tree_cuda(T *&h_data_ptr,
                         size_t N,
                         T **device_tree_pointer = nullptr,
                         bool copyback = true,
                         thrust::host_vector<Range> *h_range = nullptr,
                         size_t start_from = MyApp::INVALID_INDEX,
                         size_t _depth = MyApp::INVALID_INDEX)
    {
      if (device_tree_pointer != nullptr)
      {
            *device_tree_pointer = d_ptr;
      }
      else
      {
            CUDA_CHECK_ERROR(cudaFree(d_ptr));
      }
    }
```

call it:

```c++
    thrust::host_vector<TN> h_samples = samples_origin;
    TN *d_samples_ptr = nullptr;
    size_t host_side_depth{2};
    kdtree::build_tree_cuda_hybrid(h_samples, host_side_depth, &d_samples_ptr);
```

Because &nullptr is a pointer to nullptr, although it's not pointing to valid object but it's not equal to nullptr, so ```device_tree_pointer != nullptr``` can distinguish the caller's intension to bring the pointer out or not.

## Using reference of pointer.

```c++
    template <typename T, size_t KDim>
    void build_tree_cuda(T *&h_data_ptr,
                         size_t N,
                         T *&device_tree_pointer = nullptr,
                         bool copyback = true,
                         thrust::host_vector<Range> *h_range = nullptr,
                         size_t start_from = MyApp::INVALID_INDEX,
                         size_t _depth = MyApp::INVALID_INDEX)
    {
      if (device_tree_pointer != nullptr)
      {
            device_tree_pointer = d_ptr;
      }
      else
      {
            CUDA_CHECK_ERROR(cudaFree(d_ptr));
      }
    }
```

call it:

```c++
    thrust::host_vector<TN> h_samples = samples_origin;
    TN *d_samples_ptr;
    size_t host_side_depth{2};
    kdtree::build_tree_cuda_hybrid(h_samples, host_side_depth, d_samples_ptr);
```

Here ```d_samples_ptr``` points to an indetermined address, but it isn't a nullptr, so the function will work too.

Which one do you prefer?