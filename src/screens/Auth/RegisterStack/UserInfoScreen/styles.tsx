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

  catagories: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'montserrat-semibold',
    fontSize: 16,
    lineHeight: 20,
    color: '#000000'
  },

  valuesText: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'montserrat-regular',
    fontSize: 22,
    lineHeight: 27,
    color: '#E5186E',
  },

  bar: {
    flex: .25,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#D1D1D1', 
    borderTopWidth:1,
  },
  
  titleText: {
    display: 'flex',
    fontFamily: 'roboto-regular',
    fontSize: 30,
    lineHeight: 37,
    textAlign: 'center',
    marginTop: '15%'
  },

  subtitleText: {
    fontFamily: 'roboto-regular',
    fontSize: 16,
    marginTop: '2%',
    marginBottom: '5%'
  },

})

export default styles