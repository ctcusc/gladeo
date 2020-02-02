import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  photoButtonCircle: {
    height: 45,
    width: 45,
    borderRadius: 45,
    borderColor: '#FFFFFF',
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoButton: {
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
  },
  startRecordButton: {
    backgroundColor: '#FF3B30',
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  stopRecordButton: {
    width: 16,
    height: 16,
    backgroundColor: '#FF3B30',
    borderRadius: 4,
  },
  recordButtonCircle: {
    height: 53,
    width: 53,
    borderRadius: 53,
    borderColor: '#FFFFFF',
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'space-around',
    marginLeft: 20
  },
  mainView: {
    flex: 1,
  }
})

export default styles