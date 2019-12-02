import { StyleSheet } from 'react-native'
import { normalize } from 'path'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  main: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    color: '#000',
  },

  title: {
    marginBottom: '16%',
  },

  normalText: {
    fontStyle: 'normal',
    fontFamily: 'roboto-regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
  },

  pinkTextButton: {
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'roboto-regular',
    color: '#E5186E',
  },

  resendButtonLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2.3%'
  },

  image: {
    height: 95,
  },

  footer: {
    flex: 1
  }
})

export default styles