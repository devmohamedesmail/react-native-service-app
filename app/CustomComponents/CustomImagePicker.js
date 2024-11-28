import React from 'react'
import { Button, Icon, Div } from "react-native-magnus";
import CustomColors from '../Config/CustomColors';

export default function CustomImagePicker({onPress}) {
  return (
    <Button bg={CustomColors.primary} h={40} w={40} onPress={onPress} rounded="circle">
    <Icon name="camera" color="white" />
  </Button>
  )
}
