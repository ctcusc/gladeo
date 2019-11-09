import React from 'react'
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import styles from './styles'
import PropTypes from 'prop-types'

export default function PinkButton (props) {
  return (
    <View>

      <TouchableOpacity
        onPress={props.onPress}
        style={styles.pinkButton}
      >
        <Text
          style={styles.buttonText}
        >{props.title}</Text>
      </TouchableOpacity>
    </View>
  )
}

PinkButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func
}