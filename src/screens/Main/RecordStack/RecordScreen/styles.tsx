import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
  camera: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#555',
  },
  topSection: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '7%',
    alignItems: 'center',
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
    display: 'flex',
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
  whiteButtonOutline: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
    borderRadius: 44,
    borderWidth: 4,
    borderColor: '#fff',
  },
  middleSection: {
    display: 'flex',
    flexDirection: 'column',
    flex: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  overlay: {
    position: 'absolute',
  },
  infoText: {
    backgroundColor: 'rgba(51,51,51,0.4)',
    color: '#fff',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
    textAlignVertical: 'center',
    textAlign: 'center',
    transform: [ { rotateZ: '270deg'}],
    position: 'absolute',
    left: -Dimensions.get('window').width + (Dimensions.get('window').width * 0.35),
  },
  question: {
    backgroundColor: 'rgba(51,51,51,0.4)',
    color: '#fff',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
    textAlignVertical: 'center',
    textAlign: 'center',
    transform: [ { rotateZ: '270deg'}],
    position: 'absolute',
    right: -Dimensions.get('window').width + (Dimensions.get('window').width * 0.25), // funky but it works
    fontFamily: 'Roboto-Regular',
  },
  bottomSection: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#E5186E',
    transform: [ { rotateZ: '270deg'}],
    width: 79,
    height: 48,
    justifyContent: 'center',
    left: '75%',
    top: '15%',
    borderRadius: 24,
    right: -Dimensions.get('window').width + (Dimensions.get('window').width * 0.25)
  },
  saveText: {
    textAlign: 'center', 
    color: '#fff', 
    fontSize: 18,
    lineHeight: 21,
    fontFamily: 'Roboto-Regular'
  }
})

export default styles