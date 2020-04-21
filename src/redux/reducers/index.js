const initialState = {
  videos: [{
    questionId: 1,
    uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540apetranik%252FGladeo/Camera/a9d0efd7-93eb-41c8-8206-5c3e3b945f26.mp4',
    questionText: 'Explain what you do in one minute or less',
  },
  {
    questionId: 2,
    uri: null,
    questionText: null,
  },
  {
    questionId: 3,
    uri: null,
    questionText: null,
  },
  {
    questionId: 4,
    uri: null,
    questionText: null,
  },{
    questionId: 5,
    uri: null,
    questionText: null,
  },
  {
    questionId: 6,
    uri: null,
    questionText: null,
  },
  {
    questionId: 7,
    uri: null,
    questionText: null,
  },
  {
    questionId: 8,
    uri: null,
    questionText: null,
  },{
    questionId: 9,
    uri: null,
    questionText: null,
  },
  {
    questionId: 10,
    uri: null,
    questionText: null,
  }]
}
 
function rootReducer(state = initialState, action) {
  if (action.type === 'SAVE_VIDEO') {
 
    if (state.videos[action.payload.questionId])
      return {
        ...state,
        videos: state.videos.map((videoObj, index) => {
          // found: update video
          if (index === action.questionId-1) {
            return {
              ...videoObj,
              ...action.payload // ...action.videoObj
            }
          }
          // not the video we are looking for continue
          return videoObj
        })
      }
  }
 
  return state
}
 
export default rootReducer