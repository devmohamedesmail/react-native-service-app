import React from "react";
import { Button, Div, Icon, Text } from "react-native-magnus";


export default function Contact_Item( { bg,
    icon,
    title,
    onPress,
    color,
  }) {
  return (
    <Button
    mt="lg"
    px="xl"
    py="lg"
    bg={bg}
    w="80%"
    alignSelf="center"
    color="white"
    onPress={onPress}
  >
    <Div row justifyContent="space-between" alignItems="center">
     
      <Div flex={1}>
         {icon}
      </Div>

      <Text flex={4} color={color}>
        {title}
      </Text>
    </Div>
  </Button>
  )
}
