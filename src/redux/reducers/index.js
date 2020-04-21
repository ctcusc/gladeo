
const initialState = 
  [{
    questionID: 1,
    uri: null,
    questionText: null,
  },
  {
    questionID: 2,
    uri: null,
    questionText: null,
  },
  {
    questionID: 3,
    uri: null,
    questionText: null,
  },
  {
    questionID: 4,
    uri: null,
    questionText: null,
  },{
    questionID: 5,
    uri: null,
    questionText: null,
  },
  {
    questionID: 6,
    uri: null,
    questionText: null,
  },
  {
    questionID: 7,
    uri: null,
    questionText: null,
  },
  {
    questionID: 8,
    uri: null,
    questionText: null,
  },{
    questionID: 9,
    uri: null,
    questionText: null,
  },
  {
    questionID: 10,
    uri: null,
    questionText: null,
  }]

 
function rootReducer(state = initialState, action) {
  if (action.type === 'SAVE_VIDEO') {
    return state.map(videoObj => {
      // found: update video
      if (videoObj.questionID === action.payload.questionID) {
        console.log('located ', state)

        return action.payload
      }
      // not the video we are looking for continue
      return videoObj

    })
  }
  console.log('returning redux state ', state)
  return state
}
 
export default rootReducer