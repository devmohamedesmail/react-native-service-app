import React from 'react'
import { Button, Div, Image, Text } from 'react-native-magnus'
import Swiper from 'react-native-swiper'
import CustomColors from '../../../Config/CustomColors'
import ConfigApi from '../../../Config/ConfigApi'

export default function Post_Item({ id, author, images,image, body, avatar, onPress }) {
    return (
        <Div bg="white" my={5}>
            <Div flexDir='row'>

                <Button bg="transparent" p={0} m={0} onPress={onPress}>
                    <Div flexDir='row'>
                        {avatar ? (
                            <Image
                                h={50}
                                w={50}
                                m={10}
                                rounded="circle"
                                source={{
                                    uri:`${image}`,
                                }}
                            />
                        ) : (
                            <Image
                                h={40}
                                w={40}
                                m={10}
                                rounded="circle"
                                source={require('./user.png')}
                            />
                        )}
                        <Text>{author}</Text>
                    </Div>
                </Button>
            </Div>

            {images && images.length > 0 ? (
                <Swiper showsButtons={false} style={{ height: 200 }} dotColor={CustomColors.primary} activeDotColor={CustomColors.secondary}>
                    {images.map((image, index) => (
                        <Image
                            key={index}
                            h={200}
                            w='100%'

                            rounded="sm"
                            source={{
                                uri:
                                    `${ConfigApi.API_URL}/public/uploads/articles/${image}`,
                            }}
                        />
                    ))}


                </Swiper>
            ) :
                (<></>)
            }

            <Text px={10} py={20}>{body}</Text>




        </Div>
    )
}
