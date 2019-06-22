
# Acapana

A React app to consume serverless functions on AWS.

## The Serverless stack


Using the full [guidelines](https://serverless-stack.com/chapters/what-is-serverless.html) to create an ecosystem of apps using the AWS CLI, DynamoDB, the API Gateway, a React.js app, Bootstrap, AWS Amplify, authenticated with Cognito, S3, CloudFront, deployments and using SSL.


* [Setting up AWS](#setting-up-AWS)
* [React and Cognito](#react-and-Cognito)
* [Original Readme](#original-Readme)

## Workflow


Compile svgs into Javascript classes:
```
npm run svgr
```

Start the server:
```
yarn start
```


## Setting up AWS

There are three projects now that this application covers.

The location of the service in the Calasasaya app is *us-east-1*.
The location of the S3 bucket says *US East (N. Virginia)*.

The Acapana app needs to have AWS configured in the (surprise!) config.js file.
Which region should be used?  This is what the [article says](https://serverless-stack.com/chapters/create-an-s3-bucket-for-file-uploads.html)

Other things needed for the config are:
```
YOUR_API_GATEWAY_REGION
YOUR_API_GATEWAY_URL
YOUR_COGNITO_REGION
YOUR_COGNITO_USER_POOL_ID
YOUR_COGNITO_APP_CLIENT_ID
YOUR_IDENTITY_POOL_ID
```

When logging in, despite a successful result, we get this in the console:
```
POST https://cognito-identity.us-east-1.amazonaws.com/ 400
AWSPinpointProvider.js:341 Uncaught (in promise) Error: No credentials, applicationId or region
    at AWSPinpointProvider.<anonymous> (AWSPinpointProvider.js:341)
    ...
Show 138 more frames
```

Seems like an error, but the error alert will get triggered if the name or password is changed, so I suppose it's all good.  Something to figure out later.

Our test user:
```
--username admin@example.com
--password Passw0rd!
```

## React and Cognito

Using an AWS User Pool where users sign in and sign up with their email as their username, the React app will use the Amplify lib to authenticate these users.


### Load the state from the session

This section is not working as expected.  The logged in state does not want to be stored.
This property does not get set:
```
this.state.isAuthenticated
```


### the favicon, custom fonts and Bootstrap

Setting up the UI infrastructure at the start.

We're using Serif (PT Serif) and Sans-Serif (Open Sans) typefaces served through Google Fonts.

The favicon was set up with the steps outlined [here](https://serverless-stack.com/chapters/add-app-favicons.html).  It calls for using this site:

https://realfavicongenerator.net/

This all involves adding stuff to the public/index.html file, css etc.

<confession>Not many of my projects get favicons.  But the first thing in this serverless stack set of articles with the React app was setting one up.  Unexpectedly, it provided inspiration for working on the app.  I chose a glue stick becuase I love collage and it matches the direction I want to go with creating curated lists of items from WikiData API calls.  Inspiration to continue with all the articles in this set (there must be about 100 pages) might turn out to be an important factor.  I now love looking up and seeing my favicon in a tab and it beckons to me.</confession>

Used the example in [this article](https://www.robinwieruch.de/react-svg-icon-components/) to further work with SVG files to spice up the app.

We add *npm run svgr* to the scripts which will generate Javascript files from SVG files in the assets directory.

The generated Javascript uses an SVG tag with props passed into it.

I don't get to play with SVGs enough on the job, so I have to do a refresher every time I have to go a little deeper.  Here are some notes about scaling SVG images used as an <svg> tag from the [usual source](https://css-tricks.com/scale-svg/):

### Width & Height
*If you use inline SVG (i.e., <svg> directly in your HTML5 code), then the <svg> element does double duty, defining the image area within the web page as well as within the SVG. Any height or width you set for the SVG with CSS will override the height and width attributes on the <svg>. So a rule like svg {width: 100%; height: auto;} will cancel out the dimensions and aspect ratio you set in the code, and give you the default height for inline SVG. Which, as mentioned above, will be either 150px or 100vh, depending on the browser.*

### viewBox
*The viewBox is used to set an aspect ratio for the image, and have the drawing scale to fit.  The width is the width in user coordinates/px units, within the SVG code, that should be scaled to fill the width of the area into which you're drawing your SVG (the viewport in SVG lingo). Likewise, the height is the number of px/coordinates that should be scaled to fill the available height.*


### preserveAspectRatio
*preserveAspectRatio describes how the image should scale if the aspect ratio of the viewBox doesn't match the aspect ratio of the viewport. Most of the time, the default behavior works pretty well: the image is scaled until it just fits both the height and width, and it is centered within any extra space.*

But the code generated by our utility looks like this:
```
const SvgGlueStick = props => (
  <svg width={97} height={122} {...props}>
```

So where is the viewBox?  Not sure.  Will work on the SVG later.  I've spent too much time on it right now.  Also, it is single lines.  We need to actually have boxes with fills so we can color it.  Add that to the list of things to do.



#
## Original Readme

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
