import React, { useState } from 'react'
import Header from '../../../Components/Header/Header'
import Bottom_Navbar from '../../../Components/Bottom_Navbar/Bottom_Navbar'
import { Image, Div, Text, ScrollDiv, Button } from "react-native-magnus";
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper'
import CustomColors from '../../../Config/CustomColors';
import ConfigApi from '../../../Config/ConfigApi';
import Contact_Section from './parts/Contact_Section';
import Publisher_Info_Section from './parts/Publisher_Info_Section';


export default function Details() {
    const route = useRoute();
    const { adDetails } = route.params;
    const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    return (
        <Div flex={1}>
            <Header />
            <ScrollDiv bg={CustomColors.screenColor}>

                <Div mt={70}>
                    <Swiper showsButtons={true} style={{ height: 250 }} dotColor={CustomColors.secondary} activeDotColor={CustomColors.primary}>

                        {adDetails.images.map((image, index) => (
                            <Image key={index}
                                w='100%'
                                h={250}
                                source={{
                                    uri: `${ConfigApi.API_URL}/public/uploads/ads/${image}`,
                                }}
                            />
                        ))}

                    </Swiper>
                </Div>

                <Div px={20}>
                    <Text mt={20} fontWeight='bold' fontSize={20} textAlign={i18n.language === 'ar' ? 'right' : 'left'}>
                        {adDetails.title}
                    </Text>

                    <Text mt={20} fontSize={14}>
                        {adDetails.description}
                    </Text>
                </Div>


                <Contact_Section adDetails={adDetails} />
                <Publisher_Info_Section adDetails={adDetails} />




            </ScrollDiv>
            <Bottom_Navbar />
        </Div>
    )
}
