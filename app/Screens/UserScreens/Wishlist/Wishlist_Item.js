import React from 'react'
import { Div, Text, Button, Icon } from 'react-native-magnus'
import { Image } from "react-native-magnus";
import Swiper from 'react-native-swiper'
import ConfigApi from '../../../Config/ConfigApi';

export default function Wishlist_Item({ title, images, description, Deleteitem }) {
    return (
        <Div flexDir='row' bg="white" my={10}>
            <Div w={150} h={150} bg='red'>
                <Swiper style={{ height: 200 }} showsButtons={false}>
                    {images && images.map((image, index) => (
                        <Image
                            h={150}
                            w={150}

                            source={{
                                uri:
                                    `${ConfigApi.API_URL}/public/uploads/ads/${image}`,
                            }}
                        />
                    ))}
                </Swiper>
            </Div>


            <Div mx={5} flex={1} py={5}>
                <Div>
                    <Text fontWeight='bold'>{title}</Text>
                    <Text mt={5}>{description}</Text>
                </Div>
                <Div flexDir='row' justifyContent='flex-end' mt={10}>
                    <Button bg="red600" onPress={Deleteitem} h={40} w={40} rounded="circle">
                        <Icon name="delete" color="white" />
                    </Button>
                </Div>
            </Div>
        </Div>
    )
}
