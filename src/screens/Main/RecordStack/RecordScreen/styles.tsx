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
    fontFamily: 'roboto-regular',
  },
  bottomSection: {
    flex: 1,
  },
})

export default styles