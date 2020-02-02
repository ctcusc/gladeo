import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    color: '#000',
  },
  title: {
    fontSize: 40,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ellipses: {
    color: '#E5186E',
    fontSize: 200,
    letterSpacing: -50,
  },
  text: {
    fontFamily: 'montserrat-regular', 
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 37,
    textAlign: 'center',
    color: '#E5186E',
    height: 114,
    width: 307,
    marginBottom: '45%',
  },
  submittedText: {
    padding: 20,
    marginBottom: '0%',
    fontFamily: 'montserrat-bold', 
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 37,
    textAlign: 'center',
    color: '#E5186E',
    height: 114,
    width: 307,
  },
  subtext: {
    alignContent: 'center',
    fontFamily: 'roboto-regular',
    fontSize: 16,
    color: '#727272',
    marginVertical: '5%',
    textAlign: 'center',
    width: 307,
    marginTop: '0%',
    marginBottom: '19%',
  },
  button: {
    marginBottom: '15%',
    width: 200,
    height: 50,
    backgroundColor: '#E5186E',
    borderRadius: 25,
    justifyContent: 'center',
  },
    
  buttonText: {
    marginBottom: '-10%',
    fontStyle: 'normal',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  }
})

export default styles