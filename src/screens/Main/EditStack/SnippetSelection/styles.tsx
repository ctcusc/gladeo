import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    marginTop: '3%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  question: {
    backgroundColor: '#E5186E',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    width: '90%'
  },

  questionSelected: {
    backgroundColor: '#A02257',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    width: '90%'
  },

  title: {
    fontSize: 18,
    fontFamily: 'roboto-regular', 
    color: '#FFFFFF',
    fontWeight: '500',
  },

  titleSelected: {
    fontSize: 18,
    fontFamily: 'roboto-regular', 
    color: '#FFFFFF',
    fontWeight: '500',
  },

  createVideo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  questions: {
    flex: 5,
  },

  pinkButton: {
    width: 240,
    height: 40,
    backgroundColor: '#E5186E',
    borderRadius: 32,
    justifyContent: 'center',
    marginTop: '4%',
    opacity: 0.5
  },

  pinkButtonAbled: {
    width: 240,
    height: 40,
    backgroundColor: '#E5186E',
    borderRadius: 32,
    justifyContent: 'center',
    marginTop: '4%',
  },

  buttontext: {
    fontStyle: 'normal',
    fontSize: 14,
    fontFamily: 'roboto-bold',
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
    borderRadius: 100/2,
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
  }
})

export default styles