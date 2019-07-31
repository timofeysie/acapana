# Issues for the Acapana project

The Akapana is a cross-shaped pyramidal structure with a sunken court at its center. It is build on an entirely manmade earthen mound, faced with a mixture of large and small stone blocks.  The structure was possibly for the shaman-puma relationship/transformation through shape shifting. Tenon puma and human heads stud the upper terraces.


## Issue 21: Articles added with the form do not show up on the list

In the form submit function, we do this:
```
this.props.addArticle({ title, id });
```

In the Redux debugger we can see actions like this showing up:
```
{
  type: 'CONSTRUCTED_LIST_OF_SPARQL',
  payload: 'https://query.wikidata.org/sparql?format=json&query=%0A%20%20%20%20%20%20%20%20%20%20%20%20SELECT%20%3Ffallacy%20%3FfallacyLabel%20%3FfallacyDescription%20WHERE%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2Cen%22.%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ffallacy%20wdt%3A%20wd%3A.%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%09%09LIMIT%201000'
}
```

So that's actually promising, as we can see the function to create the SPARQL is working.

The result for that would be:
```
{
  "head" : {
    "vars" : [ "fallacy", "fallacyLabel", "fallacyDescription" ]
  },
  "results" : {
    "bindings" : [ ]
  }
}
```


Our notes show that the code is Q186150 for fallacy.  Here is the SPARQL (this one leads to the SPARQL editor)
https://query.wikidata.org/#SELECT%20%3Ffallacy%20%3FfallacyLabel%20%3FfallacyDescription%20WHERE%20%7B%0A%20%20%20%20%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2C%24%7Blanguage%7D%22.%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%3Ffallacy%20wdt%3AP31%20wd%3AQ186150.%0A%20%20%20%20%7D%0ALIMIT%201000

Here is the actual url that would return the list that we need:
https://query.wikidata.org/sparql?format=json&query=%0A%20%20%20%20%20%20%20%20%20%20%20%20SELECT%20%3Ffallacy%20%3FfallacyLabel%20%3FfallacyDescription%20WHERE%20%7B%0A%20%20%20%20%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2C%24%7Blanguage%7D%22.%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%3Ffallacy%20wdt%3AP31%20wd%3AQ186150.%0A%20%20%20%20%7D%0ALIMIT%201000


The next step is the pass that result to the next action, with is to make the call to get the Q code.  Then, use the Q code to make another call to get the actual list.

As well as this we want to preserve the first functionality which is to add it to the list of articles.

Let's track what should happen with the current workflow of addArticle.

Redux goes like this:

Action -> Reducer -> Store

or

Action -> Effect -> State result action -> Reducer -> Store


On either end of that chain, is the UI.  The UI lets the user call the addArticle function from the form submit button.

The order then is:
Form.jsx
```
function mapDispatchToProps(dispatch) {
  return {
    addArticle: article => dispatch(addArticle(article))
  };
}
handleSubmit(event) {
  this.props.addArticle({ title, id });
```

action/index.js
```
export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}
```

reducers/index.js
```
if (action.type === ADD_ARTICLE) {
  return Object.assign({}, state, {
    articles: state.articles.concat(action.payload)
  });
}
```

Where does redux/index.js fit in?
```
window.addArticle = addArticle;
```

There is no reducer for the bad words middleware.  The reducer is only going to update the state.

Anyhow, we need to slip in our new functionality.
```
if (action.type === CONSTRUCTED_LIST_OF_SPARQL)
```

But actually, I'm not sure at what point the middle steps in.  Before the action or after it?

And then, we have the SPARQL to run in an action:
```
export function getItemCodeData(itemCodeSparql) {
```

So we can do something like this:
```
this.props.getItemCodeData(action.payload);
```

That would be great if we were in a a page.  But in the middleware there is no this.props.  Actually this may be what redux sagas are for.  Too bad we're using thunk instead because it's simpler.

The spec just imports the function from index and uses it there, but trying that with the get item code data function causes the following error:
```
Failed to compile.
./src/redux/reducers/index.js
Attempted import error: 'getItemCodeData' is not exported from './index'.
```

I'm sorry, but it is being imported:
```
export function getItemCodeData(itemCodeSparql) {
```

The import statement was the issued:
```
import { getItemCodeData } from '../actions/index';
```

Now the flow gets to getItemCodeData() but dispatch inside the fetch statement is never called.  A quick google turns up this advice: *You forgot to add dispatch method to trigger action*.  But where the action needs to be dispatched does not have access to dispatch, which is

If the proper or for flow is:

UI -> Action -> Reducer -> Store

We are actually calling action from the reducer.  We should be clear about the order of execution here.

Redux/index.js: window.addArticle = addArticle;
UI: Form.jsx calls this.props.addArticle({ title, id });
Action: function addArticle(payload) {return { type: ADD_ARTICLE, payload };
Reducer:
Store



## Issue 20: Each child in a list should have a unique "key" prop


index.js:1375 Warning: Each child in a list should have a unique "key" prop.

Check the render method of `Post`. See https://fb.me/react-warning-keys for more information.
    in li (at Posts.jsx:15)
    in Post (created by ConnectFunction)
    in ConnectFunction (at Articles.js:18)

The solution was to use the url value as the id.
```
<li className="list-group-item" key={el.fallacies.value}>
```

A binding from the SPARQL query looks like this:
```
{
  "fallacies" : {
    "type" : "uri",
    "value" : "http://www.wikidata.org/entity/Q295150"
  },
  "fallaciesLabel" : {
    "xml:lang" : "en",
    "type" : "literal",
    "value" : "ecological fallacy"
  },
  "fallaciesDescription" : {
    "xml:lang" : "en",
    "type" : "literal",
    "value" : "logical fallacy"
  }
}
```

It might be nice to use just the Q295150 code, but that's not really an issue right now.
