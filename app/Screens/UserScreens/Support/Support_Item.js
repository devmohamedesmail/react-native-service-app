import React from 'react'
import { Linking } from 'react-native'
import { Button, Div, Text } from 'react-native-magnus'

export default function Support_Item({onPress,title,icon,link}) {
  return (
   <Button bg="white" w='48%' py={20} onPress={()=>Linking.openURL(link)} my={5}>
    <Div justifyContent='center' alignItems='center'>
   
        {icon}
        <Text mt={20} fontWeight='bold'>{title}</Text>
    
    </Div>
   </Button>
  )
}
