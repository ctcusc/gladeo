import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'
export default function TickingTimer () {
  const [minutesCounter, setMinutesCounter] = useState('00')
  const [seconds, setSeconds] = useState(0)
  const [secondsCounter, setSecondsCounter] = useState('00')
  const [isRecording, setRecording] = useState(false)
  const [timer, setTimer] = useState()

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('is recording: ', isRecording)
      setSeconds(seconds => seconds + 1)
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
  }, [])
 
  return (
    <View style={styles.MainContainer}>
 
      <Text style={styles.counterText}>{minutesCounter} : {seconds}</Text>
 
    </View>
 
  )
}