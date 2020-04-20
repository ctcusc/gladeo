import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: '40%',
  },

  main: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    marginTop: '20%',
  },

  normalText: {
    fontStyle: 'normal',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
  },

  pinkTextButton: {
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Roboto-Regular',
    color: '#E5186E',
  },

  resendButtonLine: {
    marginBottom: '4%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '4%'
  },

  imageLine: {
    marginTop: '2%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  messageNormal: {
    marginTop: 0,
  },

  messageError: {
    marginTop: 0,
    color: 'red',
  },

  graphic: {
    height: '60%',
  },

  footer: {
    flex: 1,
  }
})

export default styles