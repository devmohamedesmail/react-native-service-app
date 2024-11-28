import React from "react";
import Icons from "react-native-vector-icons/AntDesign";
import { Button, Icon, Div,Text } from "react-native-magnus";


export default function Bottom_Navbar_Item({ onPress, title, icon }) {
  return (
    <Button onPress={(onPress)} bg="white" py={0} flex={2}>
      <Div flexDir="column" justifyContent="center" alignItems="center"  py={10}>
         {icon}
         <Text fontSize={10} >{title}</Text>
      </Div>
    </Button>

  )
}
