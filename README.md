# markdown2html
## converts markdown to html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Markdown 2 Html</title>
  </head>
  <body>
    <x-markdown2html>
# This is title
## tagline
markdown text     
    </x-markdown2html>
    <script src="https://rhildred.github.io/custom-element/custom-element.js"></script>
  </body>
</html>


```

or

```
<p></p>
<div><iframe srcdoc="<x-markdown2html src='https://github.com/rhildred/custom-element/raw/main/README.md'></x-markdown2html><script src='https://rhildred.github.io/custom-element/custom-element.js'></script>" frameborder="0"></iframe></div>
```

You can also imbed this as an iframe. Adjust the height to suit.

```html
<iframe src="https://rhildred.github.io/custom-element/index.html?src=https://github.com/rhildred/custom-element/raw/main/README.md" frameborder="0" style="width:100%;height=25rem"></iframe>
```

I did this so that I can embed my repositories in d2l/brightspace


