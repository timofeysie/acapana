import reducers from './reducers';

test('reducers', () => {
  let state;
  state = reducers({articles:[{title:'asdfffff',id:'782ecae9-2da2-4c4b-b103-2697a5e1929b'}]}, {type:'FOUND_BAD_WORD'});
  expect(state).toEqual({articles:[{title:'asdfffff',id:'782ecae9-2da2-4c4b-b103-2697a5e1929b'}]});
});
