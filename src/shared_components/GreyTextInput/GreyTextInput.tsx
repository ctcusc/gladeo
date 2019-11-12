import React, {useState} from 'react'
import {
  View,
  TextInput,
} from 'react-native'
import styles from './styles'
import PropTypes from 'prop-types'

export default function GreyTextInput (props){
  const [text, setText] = useState('')

  const [inFocus, setInFocus] = useState(false)

  return (
    <View>
      <TextInput 
        placeholder={props.placeholder}
        onChangeText={(input) => setText(input)}
        value={text}
        style={inFocus ? styles.inFocus : styles.input}
        onFocus={() => setInFocus(true)}
        onBlur={() => setInFocus(false)}
        selectTextOnFocus={true}
        textContentType={props.inputType}
        secureTextEntry={props.inputType === 'password'}
      />
    </View>
  )
}

GreyTextInput.propTypes = {
  placeholder: PropTypes.string,
  inputType: PropTypes.string
}