# My Personal Website
This repository contains the source code for my personal website. It contains the following resources:
- Blog
- Portfolio
- Woodworking Gallery

## Frameworks and Technologies Used:
This website was written with the following frameworks and technologies:
- NextJS
- SASS
- React
- MDX
- Typescript

## Build Dependencies
The following dependencies are required to build this project:

- [NodeJS v16.20.2](https://nodejs.org/en/download)
- [NPM v8.19.4](https://nodejs.org/en/download)
  - This version of NodeJS should come with the NPM package manager

Additional dependencies are listed in the `package.json` file, but those will be handled by NPM.

## Building and Testing
Before building and testing, you must run the following commands to install all NPM packages needed:
```shell
npm install
```

To run the development server locally, run:
```shell
npm run dev
```

To build the application so that you can host it on a web server, you must run:
```shell
npm run build
```

This will generate a `./out` folder containing all of the necessary HTML, CSS, Javascript, and asset files needed to host a website. If you want to locally test if the files in the `./out` folder work correctly, you can use the following command AFTER running `npm run build`:
```shell
npm run start
```


## Design Choices
I've decided to make this website a static, multi-page application that users can browse with or without Javascript enabled on their browsers. I don't want to alienate users who do not like keeping Javascript enabled from accessing all the information on my website.

### Static

This is a static web application, meaning that the web server simply serves all website files without modification to all visitors. The server does not dynamically alter the contents of files nor can it add or remove files. This makes the website both secure and cheap to host. 

### Multi-Page

This is also a multi-page website, meaning that there are multiple HTML files that can be served within the web server's website directory. What HTML file is served depends on the path within the URL. Had I made this website into a single-page application (SPA), I would either need to fit all the website data into one HTML file, or use Javascript to dynamically load new data as the user navigates the website. 

### Browsing Without Javascript
Because I'm using NextJS, I'm taking advantage of its ability to render React components at build time in order to avoid the need to rely on Javascript for website functionality. I also created a `no-js` CSS class in order to have components use different CSS code depending on if they have the `no-js` class defined or not. By default, any components that require browser-side Javascript to work are marked with the `no-js` class. If the browser is not using Javascript, then this class remains untouched and uses any CSS code that is under the `no-js` class. If the browser is using Javascript, then the `no-js` class is removed from all components, forcing them to use a different set of CSS to render the component so that it works correctly with the browser's Javascript code.

By doing this, it ensures that my website retains all of its important functionalities, like navigation and displaying data, even without Javascript enabled on the browser.




