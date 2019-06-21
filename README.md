
# Acapana

A React app to consume serverless functions on AWS.

## Beginning


### Setting up AWS

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



### the favicon, custom fonts and Bootstrap

Setting up the UI infrastructure at the start.

We're using Serif (PT Serif) and Sans-Serif (Open Sans) typefaces served through Google Fonts.

The favicon was set up with the steps outlined [here](https://serverless-stack.com/chapters/add-app-favicons.html).  It calls for using this site:

https://realfavicongenerator.net/

This all involves adding stuff to the public/index.html file, css etc.


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
