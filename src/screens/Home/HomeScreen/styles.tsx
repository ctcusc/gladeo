import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  banner: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  bannertext: {
    fontFamily: 'roboto-regular', 
    fontStyle: 'normal',
    fontWeight: 'bold',  
    fontSize: 18,
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#D94077',
    marginLeft: 20,
  },
  bannerlogo: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 20,
  },
  item: {
    backgroundColor: '#E5186E',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderColor: '#E5186E',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  title: {
    fontSize: 18,
    fontFamily: 'roboto-regular', 
    color: '#E5186E',
    fontWeight: '500',
  },
  continueButton: {
    width: 324,
    height: 64,
    backgroundColor: '#E5186E',
    borderRadius: 32,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 20,
  }, 
  buttonText: {
    fontStyle: 'normal',
    fontSize: 26,
    fontFamily: 'roboto-regular', 
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default styles