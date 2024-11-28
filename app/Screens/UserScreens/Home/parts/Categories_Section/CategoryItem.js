import React from 'react'
import { Button, Text, Div, Image } from 'react-native-magnus'


export default function CategoryItem({ title, image, counter, onPress }) {
  return (
    <Button
    bg='white'
    w='33%'
    color="black"
    textAlign='center'
    fontSize={12}
    rounded='sm'
    p={10}
    onPress={onPress}
    mb={4}

>

    <Div flexDir='column' justifyContent='center' alignItems='center'>
        <Image
            h={60}
            w={60}
            m={10}
            
            source={{
                uri:
                    `${image}`,
            }}
        />
        <Text fontWeight='semibold'>{title}</Text>
    </Div>
</Button>
  )
}
