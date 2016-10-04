# gitbook-plugin-plantuml

Gitbook plugin to add plantuml support. By default it uses a codeblock with `plantuml`, like this:

<pre>
  ```plantuml
  A -> B
  ```
</pre>

It also can cache the images in your book root directory so that the image generation is faster.

## Configuration

Add the following into your book.json:

```
"plugins": ["plantuml@git+https://github.com/ingoclaro/gitbook-plugin-plantuml.git#1.0.0"]
```

If you want to configure it use the following:

```
"pluginsConfig": {
  "plantuml": {
    "imagesDir": "images/plantuml",
    "codeBlockKey": "plantuml",
    "cacheImages": true
  }
}
```

## How caching works
Caching is completely optional, you can disable it or change it's directory.

If the directory of the imagesDir configuration doesn't exist in your book [root directory](http://toolchain.gitbook.com/config.html), caching will be disabled automatically.

Gitbook will copy that directory by default to your output directory (_book), as part of copying the assets step.

When caching is enabled, this plugin will generate the uml in the output (_book) images directory and also in your gitbook root images directory (as configured by imagesDir).

Each image will have the name of the file where it's included and a hash of the content so that a new image is created if you change the content.
