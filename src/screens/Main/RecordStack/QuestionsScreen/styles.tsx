import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    marginTop: '5%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  titleAnswered: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular', 
    color: '#FFFFFF',
    fontWeight: '500',
  },
  titleUnanswered: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular', 
    color: '#E5186E',
    fontWeight: '500',
  },
  question: {
    padding: '4.9%',
    marginVertical: '2.0%',
    borderRadius: 8,
    width: '100%',
    borderColor: '#E5186E',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  notSelectedAnswered: {
    backgroundColor: '#E5186E',
    
  }, 
  notSelectedUnanswered: {
    backgroundColor: '#FFFFFF',
  },
  modalLayout: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '80%',
    left: '10%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    fontSize: 18,
    color: '#D94077',
    fontFamily: 'Roboto-Bold', 
    fontStyle: 'normal',
    marginVertical: 15,
  },
  topModalBorder: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#E8E8E8',
    width: '100%',
    borderBottomColor:'#F0F0F0',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  middleModalBorder: {
    backgroundColor: '#E8E8E8',
    width: '100%',
    borderBottomColor:'#F0F0F0',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  bottomModalBorder: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#E8E8E8',
    width: '100%',
    borderBottomColor:'#F0F0F0',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  topModal: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleModal: {
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomModal: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeTitle: {
    fontSize: 18,
    marginVertical: 15,
    color: '#727272',
    fontFamily: 'roboto-bold', 
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  header: {
    fontFamily: 'montserrat-semibold',
    fontStyle: 'normal',
    fontSize: 30,
    color: '#000',
    paddingLeft: '15%',
    width: '100%',
    
  },
  headerContainer: {
    paddingTop: 40,
  }
})

export default styles