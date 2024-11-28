import React from 'react'
import { Div, Button } from 'react-native-magnus'
import CustomColors from '../Config/CustomColors'

export default function CustomButton({ title, onPress }) {
    return (
        <Div>
            <Button
                mt="lg"
                px="xl"
                py={14}
                w='100%'
                rounded={4}
                shadow={10}
                bg={CustomColors.secondary}
                color="white"
                fontWeight='semibold'
                fontSize={15}
                onPress={onPress}
            >
                {title}
            </Button>
        </Div>
    )
}
