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
  
  },
  question: {
    fontFamily: 'Arial', //Montserrat;
    fontWeight: 'bold',
    fontSize: 30,
    color: '#F5F5F5',
  }, 


})

export default styles