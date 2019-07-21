import { ADD_ARTICLE } from "../constants/action-types";
import { DATA_LOADED } from "../constants/action-types";
import { CONSTRUCTED_LIST_OF_SPARQL } from "../constants/action-types";
import { CONSTRUCTED_ITEM_CODE_SPARQL } from "../constants/action-types";
import { getItemCodeData } from '../actions/index';

const initialState = {
  articles: [],
  remoteArticles: []
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    console.log('add',action.payload);
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }
  if (action.type === DATA_LOADED) {
    return Object.assign({}, state, {
      remoteArticles: state.remoteArticles.concat(action.payload)
    });
  }
  if (action.type === CONSTRUCTED_LIST_OF_SPARQL) {
    console.log('reducer CONSTRUCTED_LIST_OF_SPARQL',action.payload);
    getItemCodeData(action.payload);
  }
  if (action.type === CONSTRUCTED_ITEM_CODE_SPARQL) {
    console.log('yay CONSTRUCTED_ITEM_CODE_SPARQL');
  }
  return state;
}
export default rootReducer;
