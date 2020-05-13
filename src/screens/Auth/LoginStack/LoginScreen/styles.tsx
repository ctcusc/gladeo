import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '4%',
    alignContent: 'space-between',
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

  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  subFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textButton: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    color: '#777777',
    marginTop: '1%',
    marginBottom: '3%',
    fontFamily: 'Roboto-Regular',
    letterSpacing: 0.05,
  },

  image: {
    height: 95,
  },

  pinkTextButton: {
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Roboto-Regular',
    color: '#E5186E',
  },

  messageError: {
    marginTop: 0,
    color: 'red',
  },

  text: {
    fontStyle: 'normal',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
  }
})

export default styles