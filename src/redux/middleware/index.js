import { ADD_ARTICLE } from "../constants/action-types";
import { FOUND_BAD_WORD } from "../constants/action-types";
import { CONSTRUCTED_LIST_OF_SPARQL } from "../constants/action-types";
import { CONSTRUCTED_ITEM_CODE_SPARQL } from "../constants/action-types";
import * as wdk from 'wikidata-sdk';

const forbiddenWords = ["spam", "money"];

export function forbiddenWordsMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === ADD_ARTICLE) {
        const foundWord = forbiddenWords.filter(word =>
          action.payload.title.includes(word)
        );
        if (foundWord.length) {
          return dispatch({ type: FOUND_BAD_WORD });
        }
      }
      return next(action);
    };
  };
}

export function constructListOfSparql({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === ADD_ARTICLE) {
        const category = action.payload.title;
        const language = 'en';
        const wdt = '';
        const wd = '';
        const sparql = `
            SELECT ?${category} ?${category}Label ?${category}Description WHERE {
                SERVICE wikibase:label {
                    bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${language}".
                }
                ?${category} wdt:${wdt} wd:${wd}.
            }
    		LIMIT 1000`
    	const url = wdk.sparqlQuery(sparql);
      return dispatch({ type: CONSTRUCTED_LIST_OF_SPARQL, payload: url });
      }
      return next(action);
    };
  };
}

export function constructItemCodeSparql({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === ADD_ARTICLE) {
        const category = action.payload.title;
        const language = 'en';
        const wdt = 'P31';
        const wd = 'Q4167836';
        const sparql = `
        SELECT ?lab ?item WHERE {
          ?item rdfs:label ?lab .
          MINUS {?item wdt:${wdt} wd:${wd} } . # no category items
          VALUES ?lab {"${category}"@${language}
          } .
        }`
    	const url = wdk.sparqlQuery(sparql);
      // add to store
      return dispatch({ type: CONSTRUCTED_ITEM_CODE_SPARQL, payload: url });
      }
      return next(action);
    };
  };
}
