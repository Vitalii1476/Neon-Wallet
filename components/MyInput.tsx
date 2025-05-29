import React from 'react'
import { TextInput } from 'react-native'
import { StyleSheet } from 'react-native'

export default function MyInput({value}: {value: string} ) {
  return (
   <TextInput value={value} style={styles.input}>

   </TextInput>
  )
}

const styles = StyleSheet.create({
    input: {
        color: 'white',
        height: 60,
        width: 350,
        backgroundColor: 'black',
        borderRadius: 15,
        textAlign: 'center'
    },
    text: {
        color: 'white'
    },

})
