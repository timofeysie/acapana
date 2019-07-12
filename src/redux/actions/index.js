import { ADD_ARTICLE } from "../constants/action-types";
import { DATA_LOADED } from "../constants/action-types";
import { CONSTRUCTED_LIST_OF_SPARQL } from "../constants/action-types";
import { CONSTRUCTED_ITEM_CODE_SPARQL } from "../constants/action-types";
import { ITEM_CODE_LOADED } from "../constants/action-types";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}
export function getList(payload) {
  return { type: CONSTRUCTED_LIST_OF_SPARQL, payload };
}
export function getItemCode(payload) {
  return { type: CONSTRUCTED_ITEM_CODE_SPARQL, payload };
}

export function getData() {
  return function(dispatch) {
    return fetch("https://query.wikidata.org/sparql?format=json&query=%0A%20%20%20%20%20%20%20%20SELECT%20%3Ffallacies%20%3FfallaciesLabel%20%3FfallaciesDescription%20WHERE%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2Cen%22.%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ffallacies%20wdt%3AP31%20wd%3AQ186150.%0A%20%20%20%20%20%20%20%20%7D%0A%09%09LIMIT%201000")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: DATA_LOADED, payload: json.results.bindings });
      });
  };
}

export function getItemCodeData(itemCodeSparql) {
  return function(dispatch) {
    return fetch("itemCodeSparql")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: ITEM_CODE_LOADED, payload: json.results.bindings });
      });
  };
}
