import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  main: {
    flex: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
  },

  regularText: {
    fontSize: 16,
    fontFamily: 'roboto-regular',
    fontStyle: 'normal',
    textAlign: 'center',
    color: '#777777',
    marginLeft: '15.6%',
    marginRight: '15.3%',
    marginTop: '7.46%',
    marginBottom: '10%'
  },

  normalText: {
    fontStyle: 'normal',
    fontFamily: 'roboto-regular',
    fontSize: 16,
    color: '#777777',
  },

  pinkTextButton: {
    fontStyle: 'normal',
    fontSize: 16,
    fontFamily: 'roboto-regular',
    color: '#E5186E',
  },

  resendButtonLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },

  messageError: {
    marginTop: 0,
    color: 'red',
  },

  footer: {
    flex: 1
  }
})

export default styles