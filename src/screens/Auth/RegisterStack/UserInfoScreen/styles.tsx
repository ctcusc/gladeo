import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flex: 1.5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    marginTop: '10%'
  },

  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
  },

  footer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
  },

  subsection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    color: '#000',
  },

  categories: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#000000'
  },

  valuesText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 22,
    lineHeight: 27,
    color: '#E5186E',
  },

  bar: {
    borderColor: '#D1D1D1', 
    borderTopWidth:1,
  },
  
  titleText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 30,
    lineHeight: 37,
    marginTop: '15%'
  },

  subtitleText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    marginTop: '2%',
    marginBottom: '5%'
  },

})

export default styles