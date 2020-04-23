import React, {useState, useRef} from 'react'
import {
  View,
  TextInput,
} from 'react-native'
import styles from './styles'

interface Props {
  changeTextContent(input: string): void,
  changeReference(input: React.MutableRefObject<unknown>): void,
  input: string,
}

const GreyTextNumInput = React.forwardRef((props: Props, ref) => {
  const [text, setText] = useState('')
  const [inFocus, setInFocus] = useState(false)
  const inputRef = useRef(ref)
  return (
    <View>
      <TextInput 
        onChangeText={
          (input) => {
            setText(input),
            props.changeReference(inputRef),
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
})

GreyTextNumInput.displayName = 'component'
export default GreyTextNumInput
