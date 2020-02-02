import React, {useState, useEffect} from 'react'
import {View, Text} from 'react-native'

interface Props {
  startOnRender: boolean,
}

export default function StopWatch(props: Props) {
  const [stopWatchOn, setStopWatchOn] = useState(false)
  const [stopWatchStart, setStopWatchStart] = useState(0)
  const [stopWatchTime, setStopWatchTime] = useState(0)

  useEffect(() => {
    if(props.startOnRender) {
      setStopWatchOn(true)
      setStopWatchTime(stopWatchTime)
      setStopWatchStart(Date.now() - stopWatchTime)
            
      const timer = setInterval(() => {
        setStopWatchTime(Date.now() - stopWatchStart)
      }, 1000)
    }
  })
}