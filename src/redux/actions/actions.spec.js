import { addArticle } from './index';
import * as actions from '../actions/index'
import { ADD_ARTICLE } from '../constants/action-types';

describe('actions', () => {
  it('should create an action to add an article', () => {
    const payload = 'Add works'
    const expectedAction = {
      type: ADD_ARTICLE,
      payload
    }
    expect(addArticle(payload)).toEqual(expectedAction)
  });
});
