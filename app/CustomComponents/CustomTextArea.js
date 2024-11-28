import React from 'react'
import { Div,Input,Icon } from 'react-native-magnus'
import CustomColors from '../Config/CustomColors'

export default function CustomTextArea({value,placeholder,onChangeText}) {
  return (
    <Div>
    <Input
        placeholder={placeholder}
        p={1}
        h={150}
        my={10}
        py={0}
        multiline
        borderWidth={1}
        borderColor={CustomColors.gray}
        rounded={5}
        bg="white"
        color="black"
        fontSize="lg"
        placeholderTextColor="gray700"
        focusBg="white"
        focusBorderColor={CustomColors.secondary}
        value={value}
        onChangeText={onChangeText}
        
      />
</Div>
  )
}
