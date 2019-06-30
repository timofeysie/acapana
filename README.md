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

## Setting up Redux

Following the method again from [the Valentino article](https://www.valentinog.com/blog/redux/).  If there are any problems, there is already a working example in the [Viracocha project](https://github.com/timofeysie/viracocha).

Running Virachocha shows that our backend Request URL: http://radiant-springs-38893.herokuapp.com/api/list/en is returning a 503 'Service Unavailable' error.  Lucky we have a replacement now (at least for the main list).

Step 1:  Install Redux.
```
npm i redux --save-dev
```

Step 2:  Create the store.

The directory structure is slightly different.  
The js directory has been renamed redux, so it will just be src/redux/store, etc.
```
mkdir -p src/js/store -> mkdir -p src/redux/store
mkdir -p src/js/reducers -> mkdir -p src/redux/reducers
mkdir -p src/js/actions -> mkdir -p src/redux/actions
mkdir -p src/js/constants -> mkdir -p src/redux/constants
```

Then create another index in the js -> redux directory and use that in the src/index.js file.
```
src/js/index.js -> src/redux/index.js
```

The index.js file creates and exports the store.
The state in redux comes from reducers which produce the state of the application.

There are two key points for avoiding mutations in Redux:
```
Using concat(), slice(), and …spread for arrays
Using Object.assign() and …spread for objects
```


### Console tests

Open the developer tools and enter this in the console:
```
store.getState()
store.subscribe(() => console.log('Fire whenever an action is dispatched'))
store.dispatch( addArticle({ title: 'React Redux Tutorial for Beginners', id: 1 }) )
```

The add article is triggering the subscription, but the state is not being added to.  Running the add and the get again shows that the store is still empty so somethng is wrong here.



## Deploy the Frontend

https://serverless-stack.com/chapters/deploy-the-frontend.html

The general steps for this include:
* use S3 to host our assets,
* CloudFront CDN to serve it,
* Route 53 to manage our domain,
* Certificate Manager to handle our SSL certificate.

This is a work in progress.  With the IAM configuration issue and the beginning of Redux for this project, it might take some time to come back to the deployment.


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

### Signup

When implementing the signup functionality, we ran into an infinite spinner problem.
Cognito sent the email to the test user with the authorization code, but the UI didn't recover from the call, so we would have to either create a new user or create a way to pick up where the app left off and enter the code to complete the sign up.

The notes in the article at the bottom of this secion read:
*If the user refreshes their page at the confirm step, they won’t be able to get back and confirm that account. It forces them to create a new account instead. We are keeping things intentionally simple but here are a couple of hints on how to fix it.*

*Check for the UsernameExistsException in the handleSubmit method’s catch block. Use the Auth.resendSignUp() method to resend the code if the user has not been previously confirmed. Here is a link to the Amplify API docs. Confirm the code just as we did before.*


Here is a way to manually confirm the user using the CLI:
```
aws cognito-idp admin-confirm-sign-up \
   --region YOUR_COGNITO_REGION \
   --user-pool-id YOUR_COGNITO_USER_POOL_ID \
   --username YOUR_USER_EMAIL
```

You can also login to AWS and find the user pool and manually confirm the user there.

The fix for Issue #9 is not complete.  Trying to login with the credentials created after refreshes the page due to the infinite spinner results in the following message: "User is not confirmed."
At this point we can redirect the user to the signup page and preset the email so that the user can try again and we can further debug the root of this issue without having to either delete the user or create a new one and run out of active email addresses.

### The Notes api

Since the new notes page uses the API from the beginning of the series, it's time to get that working.  From the client, the network error is:
```
https://k7ixzm3zr0.execute-api.us-east-1.amazonaws.com/dev/notes
Request Method: OPTIONS
Status Code: 404
```

In the serverless command output, we see:
```
Serverless Error ---------------------------------------
ServerlessError: The security token included in the request is invalid.
```

The server was showing a *agent is not authorized to perform: dynamodb:PutItem on resource: arn:aws:dynamodb:us-east-1:100641718971:table/notes*

Added AmazonDynamoDBFullAccess policy in your role by going to "Permissions" tab in AWS console and the error changes to:
```
ValidationException: One or more parameter values were invalid: Missing the key nonteIdSortKey in the item
```

That is a not something in our project.  SO answers indicate it is a naming difference such as between Id and ID.  This problem needs to be solved in the backend project called [Tiahuanaco](https://github.com/timofeysie/tiahuanaco) which is the server side of the Serverless Stack.

The problem there was that nonteIdSortKey was used as the primary sort key.  I changed noteId to the misspelled one and now that part works, but there is a new error.

Regarding the permissions error:
An SO answer says: *I was using user pool id instead of identity pool id.*

[Here](https://serverless-stack.com/chapters/create-a-cognito-user-pool.html) we created a Cognito User Pool.  We can see in our dashboard:
```
Pool Id us-east-1_y3LHvvlPG
Pool ARN arn:aws:cognito-idp:us-east-1:100641718971:userpool/...
```

So actually I think it is a front end issue now.

So check the settings and the articles:
*userId is a Federated Identity id that comes in as a part of the request. This is set after our user has been authenticated via the User Pool. We are going to expand more on this in the coming chapters when we set up our Cognito Identity Pool. However, if you want to use the user’s User Pool user Id; take a look at the Mapping Cognito Identity Id and User Pool Id chapter.*

For us that is
```
Pool Id us-east-1_y3LHvvlPG
```

Setting the IDENTITY_POOL_ID to the value of the Pool ARN on the dashboard produces this error:
```
Value 'arn:aws:cognito-idp:us-east-1:100641718971:userpool/us-east-1_y3LHvvlPG' at 'identityPoolId' failed to satisfy constraint: Member must have length less than or equal to 55
```

What is an identity pool? *identity pools provide temporary AWS credentials for users who are guests (unauthenticated) and for users who have been authenticated and received a token. An identity pool is a store of user identity data specific to your account.*

Is it "User Pool(Identity Pool)" or "User Pool vs Identity Pool"?

No, it's "Identity Pools (Federated Identities)".


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

The editor being used is [Inkscape]().  Haven't used the bloated Illustrator for a long time as Inkscape covers all the bases.  Anyhow, the method of creating a group of all the shapes in the picture, then manually change the width and height of the canvas in the documents modal works.

In the .svg file it has:
viewBox="0 0 254.0003 312.51116"


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
