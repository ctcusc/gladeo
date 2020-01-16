import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  pinkButton: {
    height: 60,
    backgroundColor: '#E5186E',
    borderRadius: 64,
    justifyContent: 'center',
    paddingHorizontal: '10%',
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
    fontSize: 24,
    fontFamily: 'montserrat-semibold',
    color: '#F5F5F5',
    textAlign: 'center',
  }
})

export default styles