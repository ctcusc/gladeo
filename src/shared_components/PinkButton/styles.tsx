import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  pinkButton: {
    width: 320,
    height: 48,
    backgroundColor: '#E5186E',
    borderRadius: 64,
    justifyContent: 'center',
    marginTop: '1.5%',
  },

  pinkButtonDisabled: {
    width: 320,
    height: 48,
    backgroundColor: '#E5186E',
    borderRadius: 64,
    justifyContent: 'center',
    marginTop: '1.5%',
    opacity: 0.5
  },

  buttonText: {
    fontStyle: 'normal',
    fontSize: 16,
    fontFamily: 'roboto-bold',
    color: '#E5E5E5',
    textAlign: 'center',
  }
})

export default styles