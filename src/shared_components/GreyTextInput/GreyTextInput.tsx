import React, {useState} from 'react'
import {
  View,
  TextInput,
} from 'react-native'
import styles from './styles'

interface Props {
  placeholder: string,
  inputType: string,
  changeTextContent(input: string): void,
  input: string,
}

export default function GreyTextInput (props: Props){
  const [text, setText] = useState('')
  const [inFocus, setInFocus] = useState(false)

  return (
    <View>
      <TextInput 
        autoCapitalize="none"
        placeholder={props.placeholder}
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
        selectTextOnFocus={true}
        secureTextEntry={props.inputType === 'password'}
      />
    </View>
  )
}