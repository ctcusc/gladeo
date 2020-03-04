import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  text: {
    fontFamily: 'montserrat-regular', 
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 37,
    textAlign: 'center',
    color: 'black',
    marginTop: '40%',
  },

  textOne: {
    marginBottom: '17%',
    height: 74,
    width: 256,
  }, 

  textTwo: {
    marginBottom: '13%',
    height: 111,
    width: 256,
  }, 

  textThree: {
    marginBottom: '12%',
    height: 111,
    width: 270,
  }, 

  textFour: {
    marginBottom: '10%',
    height: 111,
    width: 307,
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