import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    marginTop: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#fff',
  },
  bannertext: {
    fontFamily: 'roboto-bold', 
    fontStyle: 'normal',
    fontSize: 18,
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#D94077',
    marginLeft: '35%',
  },
  bannerlogo: {
    width: 40,
    height: 40,
    marginRight: '5%',
  },
  question: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderColor: '#E5186E',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  questionSelected: {
    backgroundColor: '#E8E8E8',
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
  titleSelected: {
    fontSize: 18,
    fontFamily: 'roboto-regular', 
    color: '#E5186E',
    fontWeight: '500',
  },
  buttonText: {
    fontStyle: 'normal',
    fontSize: 26,
    fontFamily: 'roboto-bold', 
    color: '#fff',
    textAlign: 'center',
  },
  counter: {
    display: 'flex',
    flexDirection: 'column',
    height: 40,
    justifyContent: 'space-around',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  answered: {
    fontFamily: 'roboto-regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    height: 12,
    alignSelf: 'center',
    color: '#9F9F9F',
  },
  numberCounter: {
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    width: 42,
    height: 28,
  },
  number: {
    fontFamily: 'roboto-bold', 
    fontStyle: 'normal',
    fontSize: 18,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 4,
    color: '#D94077',
  },
  tip: {
    fontFamily: 'roboto-regular',
    fontSize: 12,
    color: '#727272',
    marginVertical: '5%',
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
    fontFamily: 'roboto-bold', 
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
  }

})

export default styles