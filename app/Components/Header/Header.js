import React from 'react'
import { Div,Text } from 'react-native-magnus'
import Logo from '../Logo/Logo'
import Drawer_Component from '../Drawer_Component/Drawer_Component'
import Back_Btn from '../Back_Btn/Back_Btn'

export default function Header({title}) {
  return (
    <Div bg='white' shadow='sm' px={10} zIndex={1000} pt={25} pb={4} h={90} w='100%' flexDir='row' justifyContent='space-between' alignItems='center' position='absolute' top={0}>
         <Back_Btn />

        <Div flexDir='row'  alignItems='center'>
            <Text mx={10} fontWeight='bold'>{title}</Text>
            <Drawer_Component />
        </Div>
      
    </Div>
  )
}
