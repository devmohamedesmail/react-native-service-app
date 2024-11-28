import React from 'react'
import { Button, Div, Text } from 'react-native-magnus'

export default function DashboardItem({onPress,icon,title}) {
  return (
    <Button onPress={onPress} bg="white" shadow='sm' py={40} rounded={5} px={10} w="48%">
        <Div flexDir='column' justifyContent='center' alignItems='center' >
            {icon}
            <Text mt={10} fontWeight='bold'>{title}</Text>
        </Div>
    </Button>
  )
}
