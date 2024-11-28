import React from 'react'
import { Div,Input,Icon } from 'react-native-magnus'
import CustomColors from '../Config/CustomColors'

export default function CustomInput({value,placeholder,icon,onChangeText,password=false}) {
  return (
    <Div>
        <Input
            placeholder={placeholder}
            p={1}
            h={55}
            my={10}
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
            secureTextEntry={password}
            suffix={<Icon name={icon} color="gray900" fontSize={17} fontFamily="Feather" />}
           
            
          />
    </Div>
  )
}
