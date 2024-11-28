import React from 'react'
import { Div, Text, Image, Button, Icon } from 'react-native-magnus'
import Swiper from 'react-native-swiper'
import ConfigApi from '../../../../Config/ConfigApi'
import { useTranslation } from 'react-i18next'
import { Linking } from 'react-native'
import CustomColors from '../../../../Config/CustomColors'

export default function Profile_Portfolio_item({ images, title, description, link }) {
    const { t } = useTranslation()



    const handleOpenURL = () => {
        if (link) {
            Linking.openURL(link).catch((err) => console.error("Failed to open URL:", err));
        }
    };

    return (
        <Div bg="white" w='49%' mb={5} pb={20} rounded={12}>
            {images && images.length > 0 ?
                <Swiper showsButtons={true} style={{ height: 100 }} >
                    {images.map((image, index) => (
                        <Image
                            key={index}
                            h={100}
                            w='100%'

                            rounded="sm"
                            source={{
                                uri:
                                    `${ConfigApi.API_URL}/public/uploads/portfolio/${image}`,
                            }}
                        />
                    ))}

                </Swiper> :
                <Text>{t('no-images')}</Text>}

            <Div py={10} px={10}>
                <Text fontWeight='bold' mb={20}>{title}</Text>
                <Text>{description}</Text>
            </Div>

            {link ? (
                <Div>
                    <Button
                        onPress={handleOpenURL}
                        w='90%'
                        m="auto"
                        block
                        suffix={
                            <Icon
                                position="absolute"
                                right={8}
                                name="arrowright"
                                color="white"
                            />
                        }
                        bg={CustomColors.secondary}
                        px={10}
                        py={5}
                        color="white"
                        rounded="circle"
                        mt="lg">
                        {t('view')}
                    </Button>
                </Div>) : (
                <Div>
                    <Button
                        disabled
                        w='90%'
                        m="auto"
                        block
                        suffix={
                            <Icon
                                position="absolute"
                                right={8}
                                name="arrowright"
                                color="white"
                            />
                        }
                        bg={CustomColors.primary}
                        px={10}
                        py={5}
                        color="white"
                        rounded="circle"
                        mt="lg">
                        {t('view')}
                    </Button>
                </Div>)}






        </Div>
    )
}
