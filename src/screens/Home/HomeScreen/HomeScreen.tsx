import React, { useState, useEffect } from 'react'
import logo from '../../../../assets/images/gladeo_logo.png'
import background from '../../../../assets/images/dotsbackground.png'
import {
  Text,
  View,
  Image,
  Alert,
  SafeAreaView, 
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import styles from './styles'
import { BASE_PATH } from 'react-native-dotenv'
 
interface IQuestion {
  id: string;
  text: string;
}

/* AKA: Q&A screen */
export default function HomeScreen() { 
  const [selected, setSelected] = useState<string | null>(null)
  const [questions, setQuestions] = useState<Array<IQuestion>>([])

  useEffect(() => {
    fetch(`${BASE_PATH}/api/questions`)
      .then(res => res.json())
      .then(data => {
        setQuestions( data )
        console.log(data)
      })
      .catch(error => {
        console.log('Error' + error)
      })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={background} style={{width: '100%', height: '100%'}}>
        <View style={styles.banner}>
          <Text style={styles.bannertext}>QUESTIONS</Text>
          <Image source={logo} style={styles.bannerlogo} />
        </View>
        <FlatList<IQuestion>
          data={questions}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              title={item.text}
              selected={selected === item.id}
              onSelect={() => setSelected(item.id)}
            />
          )}
          keyExtractor={item => item.id}
          extraData={selected}
        />
        {/* replace with PinkButton from sharedcomponents later */}
        <TouchableOpacity onPress={() => Alert.alert('button')} style={styles.continueButton}>
          <Text style={styles.buttonText}>CONTINUE</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  )
}

function Item(props: ItemProps) {
  return (
    <TouchableOpacity
      onPress={() => props.onSelect(props.id)}
      style = {props.selected ? styles.questionSelected : styles.question}
    >
      <Text 
        style = {props.selected ? styles.titleSelected : styles.title}
      >{props.title}</Text>
    </TouchableOpacity>
  )
}

interface ItemProps {
  id: string,
  title: string,
  selected: boolean,
  onSelect: any,
}



