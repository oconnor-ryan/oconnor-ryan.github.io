/** @type {import('next').NextConfig} */

const path = require('path');

//note that you can access the webpack config through here as well

const nextConfig = {
  //statically generate the website when building
  output: "export",

  //Each route goes into its appropriate directory in the out folder
  //instead of being generated as HTML files on the same directory.
  //allow each route to accessible via website.com/<route> instead of website.com/<route>.html.
  trailingSlash: true, 

  sassOptions: {
    includePaths: [path.resolve("./src/styles")],
  },
}


module.exports = nextConfig;
