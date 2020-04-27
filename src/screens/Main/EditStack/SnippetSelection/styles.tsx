import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    marginTop: '5%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    zIndex: 10,
    backgroundColor: '#E5186E',
    padding: '4.9%',
    marginVertical: '2.0%',
    marginHorizontal: '3.8%',
    borderRadius: 8,
    width: '90%',
  },
  questionSelected: {
    backgroundColor: '#A02257',
    padding: '4.9%',
    marginVertical: '2.0%',
    marginHorizontal: '3.8%',
    borderRadius: 8,
    width: '90%',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular', 
    color: '#FFFFFF',
    fontWeight: '500',
  },
  titleSelected: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular', 
    color: '#FFFFFF',
    fontWeight: '500',
  },
  createVideo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  questions: {
    flex: 5,
  },
  pinkButton: {
    width: '58%',
    height: '35%',
    backgroundColor: '#E5186E',
    borderRadius: 32,
    justifyContent: 'center',
    marginTop: '4%',
    opacity: 0.5
  },
  pinkButtonAbled: {
    width: '58%',
    height: '35%',
    backgroundColor: '#E5186E',
    borderRadius: 32,
    justifyContent: 'center',
    marginTop: '4%',
  },
  buttontext: {
    fontStyle: 'normal',
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  circle: {
    display: 'none'
  },
  circleSelected: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#FFF',
    borderColor: '#A02257',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -30,
  },
  circleText: {
    color: '#A02257'
  },
  questionAndCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%'
  },
  header: {
    fontFamily: 'Montserrat-SemiBold',
    fontStyle: 'normal',
    fontSize: 30,
    color: '#000',
    paddingLeft: '7%',
    width: '100%',
  },
  headerContainer: {
    paddingTop: 40,
  }
})

export default styles