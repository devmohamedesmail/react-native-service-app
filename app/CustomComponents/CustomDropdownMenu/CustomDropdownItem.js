import React from 'react'
import { Button } from 'react-native-magnus'


export default function CustomDropdownItem({ title, onPress, bg = 'white' }) {
    return (
        <Button
            px="xl"
            py="lg"
            h={55}
            bg={bg}
            w='100%'
            color="black"
            onPress={onPress}
            fontWeight='bold'
            fontSize="xl"
            borderBottomColor='gray400'
            borderBottomWidth={1}
            rounded={30}

        >
            {title}
        </Button>
    )
}
