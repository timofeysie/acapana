import store from "./store/index";
import { addArticle } from "./actions/index";
import { getItemCodeData } from "./actions/index";
window.store = store;
window.addArticle = addArticle;
window.getItemCodeData = getItemCodeData;
