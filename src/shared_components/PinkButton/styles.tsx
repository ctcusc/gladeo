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
    opacity: 0.5
  },

  buttonText: {
    fontStyle: 'normal',
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: '#F5F5F5',
    textAlign: 'center',
    marginBottom: 5,
  }
})

export default styles