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

  header: {
    color: '#DEA3BB',
    fontFamily: 'montserrat-regular', 
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: '10%',
  },

  stepOne: {
    fontFamily: 'montserrat-regular', 
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 37,
    textAlign: 'center',
    color: '#F5F5F5',
    marginBottom: '20%',
    height: 74,
    width: 256,
  }, 

  stepTwo: {
    fontFamily: 'montserrat-regular', 
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 37,
    textAlign: 'center',
    color: '#F5F5F5',
    marginBottom: '11%',
    height: 111,
    width: 256,
  }, 

  stepThree: {
    fontFamily: 'montserrat-regular', 
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 37,
    textAlign: 'center',
    color: '#F5F5F5',
    marginBottom: '11%',
    height: 111,
    width: 270,
  }, 

  stepFour: {
    fontFamily: 'montserrat-regular', 
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 37,
    textAlign: 'center',
    color: '#F5F5F5',
    marginBottom: '11%',
    height: 111,
    width: 307,
  }, 

  image: {
    marginBottom: '3%',
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