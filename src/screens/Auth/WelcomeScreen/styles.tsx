import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  imageTop: {
    width: 251,
    height: 59
  },

  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    marginTop: '10%'
  },

  margin: {
    marginBottom: '45%',
  },

  regularText: {
    fontSize: 24,
    fontFamily: 'roboto-regular',
    fontStyle: 'normal',
    lineHeight: 28,
    textAlign: 'center',
    color: '#000',
    marginLeft: '17.6%',
    marginRight: '17.3%',
    marginTop: '5%',
    marginBottom: '3%'
  },

  blackTextButton: {
    fontStyle: 'normal',
    fontSize: 24,
    fontFamily: 'montserrat-semibold',
    color: '#000000',
    marginTop: '5%'
  },
  pinkButton: {
    backgroundColor: '#E5186E',
    borderRadius: 64,
    justifyContent: 'center',
    paddingHorizontal: '10%',
    paddingVertical: '5%',
  },

  pinkButtonText: {
    fontStyle: 'normal',
    fontSize: 24,
    fontFamily: 'montserrat-semibold',
    color: '#F5F5F5',
    textAlign: 'center',
  },

  imageMiddle: {
    height: 228,
    width: 158
  },

  footer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default styles