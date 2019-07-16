# Issues for the Acapana project

The Akapana is a cross-shaped pyramidal structure with a sunken court at its center. It is build on an entirely manmade earthen mound, faced with a mixture of large and small stone blocks.  The structure was possibly for the shaman-puma relationship/transformation through shape shifting. Tenon puma and human heads stud the upper terraces.


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
