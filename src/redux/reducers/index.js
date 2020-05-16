const initialState = {
  'COMBINED_PLACEHOLDER': {},
  1: {},
  2: {},
  3: {},
  4: {},
  5: {},
  6: {},
  7: {},
  8: {},
  9: {},
  10: {},
  11: {},
  12: {},
}
  
function rootReducer(state = initialState, action) {
  if(action.type === 'SAVE_PLACEHOLDER') {
    return {
      ...state,
      ['COMBINED_PLACEHOLDER']: action.payload
    }
  }
  if (action.type === 'SAVE_VIDEO') {

    const key = action.payload.questionID

    return {   // a new array
      ...state,
      [key]: action.payload
    }
  }
  return state
}
  
export default rootReducer