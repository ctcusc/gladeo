import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D94077',
    color: '#fff',
  },
  title: {
    fontSize: 40,
  },
  logo: {
    width: 200,
    resizeMode: 'contain',
  },
  step: {
    color: '#DEA3BB',
    fontFamily: 'Arial', //Montserrat
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: '10%',
  
  },
  question: {
    fontFamily: 'Arial', //Montserrat;
    fontWeight: 'bold',
    fontSize: 30,
    color: '#F5F5F5',
    marginBottom: '20%',
    textAlign: 'center',
    width: 307,
    height: 111,
  }, 
  button: {
    width: 179,
    height: 50,
    backgroundColor: 'rgba(196, 196, 196, 0.2)',
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 12,
    borderColor: 'white',
    borderWidth: 1,
  },
  buttonText: {
    fontStyle: 'normal',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  }


})

export default styles