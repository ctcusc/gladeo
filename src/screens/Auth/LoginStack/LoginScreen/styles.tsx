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
    fontFamily: 'roboto-regular',
    letterSpacing: 0.05,
  },

  image: {
    height: 95,
  },

  pinkTextButton: {
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'roboto-regular',
    color: '#E5186E',
  },

  text: {
    fontStyle: 'normal',
    fontFamily: 'roboto-regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
  }
})

export default styles