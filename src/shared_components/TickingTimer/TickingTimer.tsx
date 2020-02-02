import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
 
export default function TickingTimer () {
  const [minutesCounter, setMinutesCounter] = useState('00')
  const [seconds, setSeconds] = useState(0)
  const [secondsCounter, setSecondsCounter] = useState('00')
  const [isRecording, setRecording] = useState(false)
  const [timer, setTimer] = useState()

  useEffect(() => {

    // if(isRecording === true) {
    const interval = setInterval(() => {
      console.log('is recording: ', isRecording)
      setSeconds(seconds => seconds + 1)
      // if(!isRecording) {
      //   setSeconds(0)
      // }

     
      let num = seconds.toString(),
        count = minutesCounter
      console.log('seconds timer:', num)
      if (Number(secondsCounter) == 59) {
        count = (Number(minutesCounter) + 1).toString()
        num = '00'
      }
    
      setMinutesCounter(count.length == 1 ? '0' : count)
      setSecondsCounter(num.length == 1 ? '0' + num : num)
    
       
    }, 1000)
  
      
    return () => clearInterval(interval) 
    // } else {
    //   setSeconds(0)
    //   return
    // }
    

    
   
    return
  }, [])


  // useEffect(() => {
  //     let timer = setInterval(() => {
  //         var num = (Number(secondsCounter) + 1).toString(),
  //         count = minutesCounter;
            
  //         if (Number(secondsCounter) == 59) {
  //             count = (Number(minutesCounter) + 1).toString();
  //             num = '00';
  //         }

  //         setMinutesCounter(count.length == 1 ? '0' : count);
  //         setSecondsCounter(num.length == 1 ? '0' + num : num)
  //     }, 1000);
  //     setStartDisable(true);
  //     setTimer(timer);
  // }, [])
    
  function onButtonStart() {
    // setInterval(() => {
    //   setSeconds(seconds+1)
    //   let num = seconds.toString(),
    //     count = minutesCounter
    //   console.log('seconds timer:', num)
    //   if (Number(secondsCounter) == 59) {
    //     count = (Number(minutesCounter) + 1).toString()
    //     num = '00'
    //   }

    //   setMinutesCounter(count.length == 1 ? '0' : count)
    //   setSecondsCounter(num.length == 1 ? '0' + num : num)
    // }, 1000)
    // // setTimer(timer)
    // setStartDisable(true)
  }
 
 
  //   onButtonStop() => {
  //     clearInterval(this.state.timer);
  //     this.setState({startDisable : false})
  //   }
 
 
  //   onButtonClear = () => {
  //     this.setState({
  //       timer: null,
  //       minutes_Counter: '00',
  //       seconds_Counter: '00',
  //     });
  //   }
 
  return (
    <View style={styles.MainContainer}>
 
      <Text style={styles.counterText}>{minutesCounter} : {seconds}</Text>
 
      <TouchableOpacity
        onPress={() => setRecording(isRecording => !isRecording)}
        activeOpacity={0.6}
        style={[styles.button, { backgroundColor: isRecording ? '#B0BEC5' : '#FF6F00' }]} 
      >
 
        <Text style={styles.buttonText}>{isRecording ? 'STOP' :'START'} </Text>
 
      </TouchableOpacity>
      {/*
 
        <TouchableOpacity
          onPress={this.onButtonStop}
          activeOpacity={0.6}
          style={[styles.button, { backgroundColor:  '#FF6F00'}]} >
 
          <Text style={styles.buttonText}>STOP</Text>
 
        </TouchableOpacity>
 
        <TouchableOpacity
          onPress={this.onButtonClear}
          activeOpacity={0.6}
          style={[styles.button, { backgroundColor: this.state.startDisable ? '#B0BEC5' : '#FF6F00' }]} 
          disabled={this.state.startDisable} >
 
          <Text style={styles.buttonText}> CLEAR </Text>
 
        </TouchableOpacity> */}
 
    </View>
 
  )
}
 
 
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    width: '80%',
    paddingTop:8,
    paddingBottom:8,
    borderRadius:7,
    marginTop: 10
  },
  buttonText:{
    color:'#fff',
    textAlign:'center',
    fontSize: 20
  },
  counterText:{
 
    fontSize: 20,
    color: '#000'
  }
})