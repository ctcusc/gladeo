import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
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
    top: Dimensions.get('window').width * 1.95,
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
    transform: [{
      rotate: '-180deg'
    }]
  },
  overlay: {
    position: 'absolute',
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
    right: -Dimensions.get('window').width + (Dimensions.get('window').width * 0.35), // funky but it works
    top: Dimensions.get('window').width,
    fontFamily: 'roboto-regular',
  },
  bottomSection: {
    flex: 1,
  },
  videoBottom: {
    flex: 1,
    position: 'absolute',
  },
  videoPlay: {
    flex: 1,
  
  }
})

export default styles