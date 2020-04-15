import React, {useState} from 'react'
import {
  View,
  TextInput,
} from 'react-native'
import styles from './styles'

interface Props {
  changeTextContent(input: string): void,
  input: string,
}

export default function GreyTextInput (props: Props){
  const [text, setText] = useState('')
  const [inFocus, setInFocus] = useState(false)

  return (
    <View>
      <TextInput 
        onChangeText={
          (input) => {
            setText(input),
            props.changeTextContent(input)
          }
        }
        value={props.input}
        style={inFocus ? styles.inFocus : styles.input}
        onFocus={() => setInFocus(true)}
        onBlur={() => setInFocus(false)}
        keyboardType="numeric"
        maxLength={1}
      />
    </View>
  )
}