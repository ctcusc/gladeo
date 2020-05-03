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
    fontFamily: 'Montserrat-Regular', 
    fontSize: 30,
    textAlign: 'center',
    color: '#E5186E',
    marginHorizontal: '20%',
    marginBottom: '45%',
  },
  submittedText: {
    margin: '5%',
    fontFamily: 'Montserrat-Bold', 
    fontSize: 30,
    textAlign: 'center',
    color: '#E5186E',
    marginHorizontal: '10%',
  },
  subtext: {
    alignContent: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#727272',
    textAlign: 'center',
    marginHorizontal: '10%',
    marginBottom: '19%',
  },
  button: {
    paddingHorizontal:'20%',
    backgroundColor: '#E5186E',
    borderRadius: 25,
    justifyContent: 'center',
  },
    
  buttonText: {
    paddingVertical: '8%',
    fontStyle: 'normal',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  }
})

export default styles