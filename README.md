# markdown2html
## converts markdown to html

```
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

I also intended this as a little vite custom element demo. If you turn on read and write permissions for actions in your project settings and replace the code in `lib/index.js` with your own code it will serve your custom element from github pages. 