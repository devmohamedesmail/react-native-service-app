import React from 'react'
import { Button, Div, Text, Image } from 'react-native-magnus'
import Swiper from 'react-native-swiper'
import ConfigApi from '../../../Config/ConfigApi'

export default function Search_Item({ images, title, onPress, description, date }) {
    return (
        <Button my={5} w='100%' onPress={onPress} p={0} px={0} bg="white" rounded='md'>
            <Div flexDir='row' justifyContent='flex-start' alignItems='flex-start' w='100%' >
                <Div >
                    {images && images.length > 0 ? (
                        <Swiper style={{ height: 150, width: 150 }} showsButtons={false}>
                            {images.map((image, index) => (
                                <Image
                                    h={150}
                                    w={150}
                                    rounded="md"
                                    source={{
                                        uri: `${ConfigApi.API_URL}/public/uploads/ads/${image}`,
                                    }}
                                />
                            ))}
                        </Swiper>
                    ) : (<></>)}
                </Div>
                <Div mx={10} h={150} flex={1} position='relative'>
                    <Div py={10}>
                        <Text fontWeight='bold' fontSize={16}>{title}</Text>
                        <Text mt={10}>{description}</Text>
                    </Div>


                    <Text position="absolute" bottom={5} left={10}  >{date}</Text>

                </Div>

            </Div>
        </Button>
    )
}
