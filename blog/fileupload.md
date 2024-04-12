---
title: File upload explained
layout: default
nav_order: 10
has_children: false
parent: Blogs for pagehelper
---

# File Upload Explained

When submitting an HTML form in the usual manner, the encoding type should be enctype="multipart/form-data".

The corresponding CURL command would be like curl -F "file=@path-to-file".

## Setup an endpoint for test
Let's setup a test endpoint to inspect the submitted body. This endpoint echo the upload body in `{body: body}`

```java
 public Mono<ServerResponse> uploadBlob(ServerRequest req) {
  Flux<DataBuffer> dbs = req.bodyToFlux(DataBuffer.class);
  Path tmpfile;
  try {
   tmpfile = Files.createTempFile("blobupload", null);
   return DataBufferUtils.write(dbs, tmpfile)
     .then(Mono.defer(() -> {
      String body;
      try {
       body = Files.readString(tmpfile);
      } catch (IOException e) {
       throw new RuntimeException(e);
      }
      return ResponseUtil.okJson().bodyValue(Map.of("body", body));
     }));
  } catch (IOException e) {
   throw new RuntimeException(e);
  }
 }

```

## Upload blob

The received body on server side is exactly the content of the file to upload.

```java
 // curl --data-binary "@tt.sh"  http://localhost:4002/uploadBlob --noproxy '*'
 @Test
 void testUploadFileBlob(@TempDir Path tempDir) throws IOException {
  Path f = tempDir.resolve("a.txt");
  Files.writeString(f, "hello");
  assertThat(f).exists();
  Resource resource = new FileSystemResource(f);

  var multipartBodyBuilder = new MultipartBodyBuilder();
  multipartBodyBuilder.part("file", resource);

  UtilForT.webTestClientWithLongTimeout(webClient)
    .post()
    .uri(ub -> ub.path("/uploadBlob").build())
    .contentType(MediaType.APPLICATION_OCTET_STREAM)
    .body(BodyInserters.fromResource(resource))
    .exchange()
    .expectBody(UploadResult.class)
    .consumeWith(response -> {
     log.info("response: {}", response);
     Assertions.assertThat(response.getResponseBody().body()).isEqualTo("hello");
    });
 }
```

## by multipart/formdata

Need to extract the File object from the request body.
```java
 // curl -F "file=@tt.sh" http://localhost:4002/uploadBlob --noproxy '*'
 @Test
 void testUploadFileMultipart(@TempDir Path tempDir) throws IOException {
  Path f = tempDir.resolve("a.txt");
  Files.writeString(f, "hello");
  assertThat(f).exists();
  Resource resource = new FileSystemResource(f);

  var multipartBodyBuilder = new MultipartBodyBuilder();
  multipartBodyBuilder.part("file", resource);
  var multipartData = multipartBodyBuilder.build();

  UtilForT.webTestClientWithLongTimeout(webClient)
    .post()
    .uri(ub -> ub.path("/uploadBlob").build())
    .contentType(MediaType.MULTIPART_FORM_DATA)
    .body(BodyInserters.fromMultipartData(multipartData))
    .exchange()
    .expectBody(UploadResult.class)
    .consumeWith(response -> {
     log.info("response: {}", response);
     // "--LYctsxGWZLmPyH5RpZfo31RJ2mFoGmV\r\nContent-Disposition: form-data;
     // name=\"file\"; filename=\"a.txt\"\r\nContent-Type:
     // text/plain\r\nContent-Length:
     // 5\r\n\r\nhello\r\n--LYctsxGWZLmPyH5RpZfo31RJ2mFoGmV--\r\n");
     Assertions.assertThat(response.getResponseBody().body()).contains(
       "Content-Length:");
    });
 }
```
