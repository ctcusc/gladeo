import { StyleSheet } from 'react-native';

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
  logo: {
    width: 200,
    resizeMode: 'contain',
  }
});

export default styles;