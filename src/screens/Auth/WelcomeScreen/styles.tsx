import { StyleSheet } from 'react-native'

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

  margin: {
    marginBottom: '13%',
  },

  regularText: {
    fontSize: 24,
    fontFamily: 'roboto-regular',
    fontStyle: 'normal',
    lineHeight: 28,
    textAlign: 'center',
    color: '#777777',
    marginLeft: '17.6%',
    marginRight: '17.3%',
    marginTop: '5%',
    marginBottom: '3%'
  },

  blackTextButton: {
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 22,
    fontFamily: 'montserrat-semibold',
    color: '#000000',
    marginTop: '5%'
  },

  imageMiddle: {
    height: 228,
    width: 158
  },

  imageBotton: {
    height: 92,
  },

  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default styles