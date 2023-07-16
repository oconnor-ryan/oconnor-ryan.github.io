const fs = require('fs');
const path = require('path');

/*
  There is a bug in NextJS's 'export' function where the 
  custom 404 page located in src/app/not-found.tsx is not 
  rendered in the out folder and is replaced with NextJS's 
  default 404 page. 

  Also, when trailingSlashes is set to true in next.config.ts,
  the default 404 page is duplicated and placed in out/404.html
  and out/404/index.html.

  To fix this, I added a notfound route that displays the custom
  404 page as if it was a regular page and set the path to that
  route as the location of the 404 page. I also delete the 
  default 404 pages genereated by NextJS below.
*/

fs.rmSync(path.resolve("./out/404.html"));
fs.rmSync(path.resolve("./out/404"), {recursive: true});

