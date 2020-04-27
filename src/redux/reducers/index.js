const initialState = {
  videos: []
}
  
function rootReducer(state = initialState, action) {
  if (action.type === 'SAVE_VIDEO') {
    return {
      ...state,
      videos: state.videos.concat(action.payload)
    }
  }
  return state
}
  
export default rootReducer