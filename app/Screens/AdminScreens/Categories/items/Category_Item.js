import React from 'react'
import { Div, Image, Text, Icon, Button } from 'react-native-magnus'

export default function Category_Item({ image, title, description,handleDelete,handleEdit }) {
    return (
        <Div w='49%' bg="white" mb={10}>
            <Div>
                <Image
                    h={150}
                    w='100%'
                    source={{
                        uri: `${image}`,
                    }}
                />
            </Div>

            <Div py={20} px={10}>
                <Text fontWeight='bold' mt={10}>{title}</Text>
                <Text>{description}</Text>
                <Div mt={10} flexDir='row' justifyContent='center'>
                    <Button bg="red500" h={40} w={40} rounded="circle" mx={10} onPress={handleDelete}>
                        <Icon name="delete" color="white" />
                    </Button>
                    <Button bg="green500" h={40} w={40} rounded="circle" mx={10} onPress={handleEdit}>
                        <Icon name="edit" color="white" />
                    </Button>
                </Div>
            </Div>
        </Div>
    )
}
