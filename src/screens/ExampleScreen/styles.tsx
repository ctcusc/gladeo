import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    color: '#000',
    padding: '5%',
    
  },
  title: {
    fontSize: 40,
    paddingBottom: 10,
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 5,
  },
})

export default styles