import React from 'react'
import { Button, Text } from 'react-native-magnus'
import CustomColors from '../Config/CustomColors'

export default function CustomRedirectButton({onPress,title}) {
  return (
    <Button bg={CustomColors.primary} mx={10} onPress={onPress} py={6}>
    <Text color='white'>{title}</Text>
</Button>
  )
}
