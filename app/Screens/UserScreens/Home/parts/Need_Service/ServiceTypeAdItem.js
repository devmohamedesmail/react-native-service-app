import React from 'react'
import { Div, Image, Text, Button, Icon } from 'react-native-magnus'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Swiper from 'react-native-swiper'
import CustomColors from '../../../../../Config/CustomColors';
import ConfigApi from '../../../../../Config/ConfigApi';

export default function ServiceTypeAdItem({ image, title, country, author, onPress, images, index, handleSave }) {
    return (
        <Button p={0} bg='transparent' onPress={onPress}>
            <Div key={index} bg="white" mx={10} w={250} rounded={10} shadow={10} my={20}>
                <Swiper showsButtons={false} style={{ height: 150 }} dotColor={CustomColors.secondary} activeDotColor={CustomColors.primary}>
                    {images && images.length > 0 ? (
                        images.map((item, index) => (
                            <Image
                                key={index}
                                w="100%"
                                h={150}
                                source={{ uri: `${ConfigApi.API_URL}/public/uploads/ads/${item}` }}  // Assuming the item is a URL
                            />
                        ))
                    ) : (
                        <Image w="100%" h={150} source={{ uri: `${image}` }} />
                    )}
                </Swiper>
                <Button bg="white" onPress={handleSave} p={0} h={30} w={30} rounded="circle" position='absolute' top={10} right={10}>
                    <Icon name="heart" color="black" />
                </Button>


                <Div px={10} py={10}>
                    <Text fontSize={13} fontWeight='semibold'>{title}</Text>

                    <Div flexDir='row' justifyContent='space-between' alignItems='center' mt={10}>
                        <Text><EvilIcons name="location" size={16} color="black" />  {country} </Text>
                        <Text><SimpleLineIcons name="user" size={15} color="black" /> {author} </Text>
                    </Div>
                </Div>
            </Div>
        </Button>
    )
}
