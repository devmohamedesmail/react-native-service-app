import React from 'react'
import { Div, Image, Text } from 'react-native-magnus'
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Profile_Skeleton from './Profile_Skeleton';

export default function Basic_Info({ profileData }) {
    const { t } = useTranslation();
    return (
        <Div>

            {profileData ? (
                <Div px={10}>
                    {profileData && profileData.image ? (
                        <Image
                            h={100}
                            w={100}
                            m='auto'
                            rounded="circle"
                            source={{
                                uri:
                                    `${ConfigApi.API_URL}/public/uploads/users/${profileData.image}`,
                            }}
                        />
                    ) : (
                        <Image
                            h={100}
                            w={100}
                            m='auto'
                            rounded="circle"
                            source={require('./boy.png')}
                        />
                    )}

                    <Text textAlign='center' mt={10} mb={30} fontWeight='bold'>{profileData.name}</Text>
                    <Div>

                        <Div flexDir='row' justifyContent='flex-start' mb={10}>
                            <Text>
                                <Entypo name="email" size={20} color="black" />
                            </Text>
                            <Text mx={10} fontWeight='semibold'>{profileData.email}</Text>
                        </Div>

                        <Div flexDir='row' justifyContent='flex-start' mb={10}>
                            <Text>
                                <AntDesign name="mobile1" size={20} color="black" />
                            </Text>
                            <Text mx={10} fontWeight='semibold'>{profileData.phone ? profileData.phone : t('no-phone')}</Text>
                        </Div>

                        <Div flexDir='row' justifyContent='flex-start' mb={10}>
                            <Text>
                                <Entypo name="location-pin" size={24} color="black" />
                            </Text>
                            <Text mx={10} fontWeight='semibold'>{profileData.phone ? profileData.address : t('no-address')}</Text>
                        </Div>



                    </Div>
                </Div>
            ) : (
                <Div px={10}>
                    <Profile_Skeleton />
                    <Profile_Skeleton />
                    <Profile_Skeleton />
                </Div>)}


        </Div>
    )
}
