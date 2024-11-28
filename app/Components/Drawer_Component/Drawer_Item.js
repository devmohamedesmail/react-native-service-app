import React from 'react'
import { Button, Icon, Div,Text } from "react-native-magnus";
import Entypo from '@expo/vector-icons/Entypo';

export default function Drawer_Item({icon,title,onPress}) {
  return (
    <Button w='100%' bg="white" borderBottomColor='gray300' borderBottomWidth={1} mx={0} onPress={onPress}>
          
            <Div flexDir='row' justifyContent='space-between' alignItems='center'>
            <Div flexDir='row' flex={1}>
                {icon}
                <Text mx={10}>{title}</Text>
            </Div>
            <Entypo name="chevron-small-right" size={24} color="black" />
            </Div>
        </Button>
  )
}
