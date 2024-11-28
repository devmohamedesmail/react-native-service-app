import React from 'react'
import { Div,Text } from 'react-native-magnus'
import ConfigApi from '../../../../Config/ConfigApi'

export default function Profile_Article_Item(images, body) {
    return (
        <Div>
            {images && images.length > 0 ? (
                <Swiper style={{ height: 200 }} showsButtons={true}>
                    {images.map((image, index) => (
                        <Image
                            key={index}
                            h={100}
                            w={100}
                            m={10}
                            rounded="circle"
                            source={{
                                uri:
                                    `${ConfigApi.API_URL}public/uploads/articles/${image}`,
                            }}
                        />
                    ))}


                </Swiper>
            ) : (<></>)}


            <Text>{body}</Text>
        </Div>
    )
}
