import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  main: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
  },

  margin: {
    marginBottom: '10%',
  },

  regularText: {
    fontSize: 16,
    fontFamily: 'roboto-regular',
    fontStyle: 'normal',
    lineHeight: 19,
    textAlign: 'center',
    color: '#777777',
    marginLeft: '17.6%',
    marginRight: '17.3%',
    marginTop: '7%',
    marginBottom: '7.7%'
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
    marginBottom: '4%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '4%'
  },

  messageError: {
    fontSize: 16,
    fontFamily: 'roboto-regular',
    fontStyle: 'normal',
    lineHeight: 19,
    textAlign: 'center',
    color: '#777777',
    marginLeft: '17.6%',
    marginRight: '17.3%',
    marginTop: '7%',
    marginBottom: '7.7%',
    color: 'red',
  },

  imageLine: {
    marginTop: '2%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    height: 92,
  },

  footer: {
    flex: 1,
  }
})

export default styles