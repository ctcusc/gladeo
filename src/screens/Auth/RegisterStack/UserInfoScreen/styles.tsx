import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    marginTop: '30%'
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
    alignItems: 'center',
    color: '#000',
    
  },

  catagories: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'montserrat-bold',
    fontStyle: 'normal',
    fontWeight: '600',
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
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 22,
    lineHeight: 27,
    color: '#E5186E',
  },

  bar: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#D1D1D1', 
    borderTopWidth:1,
  },
  
  titleText: {
    fontFamily: 'roboto-regular',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 30,
    lineHeight: 37,
    textAlign: 'center'
  },

  subtitleText: {
    fontFamily: 'roboto-regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 19,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: '5%'

  },

  normalText: {
    fontStyle: 'normal',
    fontFamily: 'roboto-regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
  },

  pinkTextButton: {
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'roboto-regular',
    color: '#E5186E',
  },

  resendButtonLine: {
    marginBottom: '4%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '4%'
  },

  image: {
  }
})

export default styles