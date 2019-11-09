import React from 'react'
import {
  Text,
  View,
} from 'react-native'
import styles from './styles'
import PropTypes from 'prop-types'

export default function BlackHeading(props){
  return(
    <View>
      <Text style={styles.title}>
        {props.title}
      </Text>
    </View>
  )
}

BlackHeading.propTypes = {
  title: PropTypes.string
}

