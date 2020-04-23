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

  code: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    marginBottom: '5%',
  },

  regularText: {
    fontSize: 16,
    fontFamily: 'roboto-regular',
    fontStyle: 'normal',
    textAlign: 'center',
    color: '#777777',
    marginLeft: '10%.6%',
    marginRight: '10.3%',
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
  codeField: {margin: 20},

  input: {
    width: 48,
    height: 64,
    fontFamily: 'roboto-bold',
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
  },
  
  cell: {
    width: 46,
    height: 64,
    lineHeight: 62,
    fontSize: 36,
    borderWidth:2,
    borderRadius: 3,
    backgroundColor: '#F0F0F0',
    borderColor: '#fff',
    textAlign: 'center',
    fontFamily: 'roboto-bold',
    margin: 10,

  },
  focusCell: {
    borderColor: '#E5186E',
  },
})

export default styles