export function rootReducer(state, action) {
  switch(action.type) {
    case 'TABLE_RESIZE':
      return {...state, colState: {}};
      breack;
    default: return state;
  }
}