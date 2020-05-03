const initialState = {
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
  if (action.type === 'SAVE_VIDEO') {
    // if(state.has(action.payload.questionID)) {
    const key = action.payload.questionID
    console.log('key?: ', key)
    return {   // a new array
      ...state,
      [key]: action.payload
    }
    
    
    // return state.map(videoObj => {
    //   // found: update video
    //   if (videoObj.questionID === action.payload.questionID) {
    //     videoExists = true
    //     return action.payload
    //   }
    //   // not the video we are looking for continue
    //   return videoObj
    // })
    
  

    // } 
    // return {
    //   ...state,
    //   state.set(action.payload.questionID, action.payload)
    // }
    // return state.map((videoObj, index) => {
    //   // found: update video
    //   if (videoObj.questionID === action.payload.questionID) {
    //     return action.payload
    //   }
    //   // not the video we are looking for continue
    //   return videoObj
    // })
  }
  return state
}
  
export default rootReducer