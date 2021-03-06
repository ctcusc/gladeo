import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
  camera: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
  uiContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: '5%',
    marginBottom: 20,
  },
  recordButton: {
    backgroundColor: '#FF3B30',
    width: 40,
    height: 40,
    borderRadius: 48,
    alignSelf: 'center',
  },
  isRecordingButton: {
    backgroundColor: '#FF3B30',
    width: 16,
    height: 16,
    borderRadius: 4,
    alignSelf: 'center',
  },
  recordOutline: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 53,
    height: 53,
    borderRadius: 58,
    borderWidth: 5,
    borderColor: '#fff',
  },
  whiteButton: {
    backgroundColor: '#fff',
    width: 30,
    height: 30,
    borderRadius: 30,
    alignSelf: 'center',
  },
  flipCamera: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 53,
  },
  whiteButtonOutline: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
    borderRadius: 44,
    borderWidth: 4,
    borderColor: '#fff',
  },
  texts: {
    flex: 0.95,
    paddingHorizontal: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoText: {
    flexDirection: 'column',
    backgroundColor: 'rgba(51,51,51,0.4)',
    color: '#fff',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
    textAlignVertical: 'center',
    textAlign: 'center',
    marginTop: '5%',
    //left: -Dimensions.get('window').width + (Dimensions.get('window').width * 0.35),
  },
  question: {
    flexDirection: 'column',
    backgroundColor: 'rgba(51,51,51,0.4)',
    color: '#fff',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
    textAlignVertical: 'center',
    textAlign: 'center',
    //right: -Dimensions.get('window').width + (Dimensions.get('window').width * 0.25), // funky but it works
    fontFamily: 'Roboto-Regular',
  },
  videoBottom: {
    position: 'absolute',
    flexDirection: 'row-reverse',
  },
  videoTop: {
    position: 'absolute',
    flexDirection: 'row',
  },
  saveButton: {
    backgroundColor: '#E5186E',
    width: 99,
    height: 48,
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: '13%',
    borderRadius: 24,
    //right: -Dimensions.get('window').width + (Dimensions.get('window').width * 0.25)
  },
  exitButton: {
    backgroundColor: '#E5186E',
    width: 79,
    height: 48,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 24,
    //right: -Dimensions.get('window').width + (Dimensions.get('window').width * 0.25)
  },
  saveText: {
    textAlign: 'center', 
    color: '#fff', 
    fontSize: 18,
    lineHeight: 21,
    fontFamily: 'Roboto-Regular'
  },
  preview: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
 
  saveView: {
  },
  noSave: {
  },
  backButton: {
    color: '#fff',
    fontSize: 40
  },

  videoPlay: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  topSection: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '7%',
    alignItems: 'center',
    transform: [{
      rotate: '180deg'
    }]
  },
  middleSection: {
    display: 'flex',
    flexDirection: 'column',
    flex: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
    transform: [{
      rotate: '-180deg'
    }]
  },
  overlay: {
    position: 'absolute',
  },
  bottomSection: {
    flex: 1,
  },
  questionFinalText: {
    bottom: '15%',
    position: 'absolute',
    backgroundColor: 'rgba(51,51,51,0.4)',
    color: '#fff',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
    textAlignVertical: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '5%',
  }
})

export default styles