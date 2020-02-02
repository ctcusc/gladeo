import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
    
  header: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  footer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#777777',
    fontFamily: 'montserrat-regular', 
    fontWeight: 'bold',
    fontSize: 22,
    lineHeight: 27,
    width: 301,
    height: 71,
    textAlign: 'center',
    marginTop: '30%'
  },

  content: {
    fontFamily: 'montserrat-regular', 
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 37,
    textAlign: 'center',
    color: '#E5186E',
    height: 111,
    width: 281,
  }, 

  button: {
    width: 179,
    height: 50,
    backgroundColor: '#E5186E',
    borderRadius: 8,
    justifyContent: 'center',
  },
    
  buttonText: {
    fontStyle: 'normal',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  }
})

export default styles