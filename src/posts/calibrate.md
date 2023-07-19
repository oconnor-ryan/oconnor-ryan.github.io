---
title: My Template Post
description: >- 
  In this blog post, I will utilize every HTML tag that can be
  used in Markdown in order to ensure that every element in 
  each post is styled correctly and looks nice on all browsers
  and all screens

tags: []
thumbnailSrc: /assets/images/blog/default-thumbnail.jpg
thumbnailCaption: Penny Lane
---

## Heading 2 \<h2>
### Heading 3 \<h3>
#### Heading 4 \<h4>
##### Heading 5 \<h5>
###### Heading 6 \<h6>




## Multiple Paragraphs \<p>
<!-- &nbsp; is one space, &emsp; is 4 -->

&emsp; Irure aliqua dolor cupidatat qui eiusmod nostrud reprehenderit id do ullamco aliquip nostrud tempor est. Aliqua id magna ea nostrud laborum culpa laborum. Nulla et in ex quis consequat elit in pariatur consequat minim laborum ut. Cupidatat reprehenderit eu fugiat ad. Occaecat excepteur reprehenderit amet proident reprehenderit minim sit laborum magna anim dolor elit qui non.

&emsp; Proident occaecat ullamco deserunt sunt proident in exercitation nisi pariatur et ad excepteur anim tempor. Aliquip magna nostrud sunt deserunt deserunt nostrud ea commodo cillum est nisi velit. Do consectetur nulla incididunt exercitation amet. Nisi ad adipisicing proident ex voluptate enim nisi occaecat laborum ipsum. Ullamco sunt nulla est nostrud ad duis elit exercitation qui consectetur exercitation. Nulla minim amet irure sunt mollit aute aliqua voluptate anim cupidatat elit excepteur.

&emsp; Commodo officia laboris ut occaecat aliquip. Ad magna minim laboris velit velit quis sunt tempor ut. Ad consectetur consectetur sit sint reprehenderit esse. Ex ut do do dolore proident elit exercitation veniam anim. Cupidatat laboris ad consectetur laborum sunt dolor. Cupidatat dolore velit laborum reprehenderit. Irure ad commodo cillum officia.


## Unordered Lists \<ul>
* Item 1
  * Item 1a
    * Item 1aa
    * Item 1ab
  * Item 1b
* Item 2
* Item 3
* Item 4
* Item 5
* Item 6
* Item 7
* Item 8
* Item 9

## Ordered Lists \<ol>
Note that 2 spaces are needed for nested
unordered lists but 4 are needed for nested
ordered lists

1. Item 1
    1. Item 1a
        1. Item 1aa
        2. Item 1ab
    2. Item 1b
2. Item 2
3. Item 3
4. Item 4
5. Item 5
6. Item 6
7. Item 7
8. Item 8
9. Item 9


## Bold \<strong>
I love **bold** text!

## Italic \<em>
I think *italic* text is okay.

## Block Quotes
> Do quis consequat cillum nulla consectetur sit irure est amet culpa ad sit. Consequat velit duis et ullamco fugiat est nulla aliquip elit magna duis reprehenderit. Aliquip ex ea tempor consequat Lorem eu dolore labore quis sit pariatur nostrud deserunt. Aliquip est voluptate labore officia magna culpa veniam aute culpa eiusmod. In laborum quis elit occaecat mollit. Enim elit aliqua proident mollit adipisicing ipsum ad pariatur cupidatat. Deserunt dolor consequat adipisicing consectetur aliqua adipisicing aliqua officia culpa.

## Images \<img>
![Image](/assets/images/me.jpg)

## Images with \<figure>

<figure>
  <img src="/assets/images/me.jpg"></img>
  <figcaption>A Picture Of Myself</figcaption>
</figure>

## Links \<a>
[Click Link Here](/assets/images/me.jpg)

## Horizontal Rule \<hr> 
---
> Note that the Remark package (the Markdown parser)
> uses CommonMark for the syntax of Markdown files
---

## Inline Code
Here is `some code` here

## Code Block
```
//Some C code
struct Something {
  int some = 0;
  char[20] thing;
}

struct Something s;
p.thing = "Something";

if(strcmp(s.thing, "Something") == 0) {
  p.some = 1;
  printf("Something");
}

//Some Java code
(new Thing.ThingBuilder().setThis(1).setThat(2).doThis(3).doThat(4).build()).out.println("Hello World!");
```

