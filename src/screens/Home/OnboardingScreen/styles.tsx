import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D94077',
  },

  main: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  footer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    marginBottom: 37,
  },

  text: {
    fontFamily: 'montserrat-regular', 
    fontWeight: 'bold',
    fontSize: 22,
    lineHeight: 27,
    color: '#F5F5F5',
    textAlign: 'center',
    width: 283,
  }, 

  button: {
    width: 179,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
  },

  buttonText: {
    fontStyle: 'normal',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E5186E',
    textAlign: 'center',
  }
})

export default styles