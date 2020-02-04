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
    fontSize: 30,
    textAlign: 'center',
    color: '#E5186E',
    marginHorizontal: '20%',
    marginBottom: '45%',
  },
  completedText: {
    margin: '5%',
    marginBottom: '20%',
    fontFamily: 'montserrat-bold', 
    fontSize: 30,
    textAlign: 'center',
    color: '#E5186E',
    marginHorizontal: '10%',
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