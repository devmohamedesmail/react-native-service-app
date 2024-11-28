import React from 'react'
import { Div, ScrollDiv ,Text} from 'react-native-magnus'
import Header from '../../../Components/Header/Header'
import CustomColors from '../../../Config/CustomColors'
import Bottom_Navbar from '../../../Components/Bottom_Navbar/Bottom_Navbar'
import { useTranslation } from 'react-i18next'
import Support_Item from './Support_Item'
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';

export default function Support() {
    const { t } = useTranslation()
    return (
        <Div flex={1}>
            <Header />
            <ScrollDiv bg={CustomColors.screenColor}>
                <Div px={10} pt={100}>
  
                <Text textAlign='center' fontWeight='bold' fontSize={16}>
                     {t('support')}
                </Text>

                <Div my={20} flexDir='row' justifyContent='space-between' alignItems='center' flexWrap='wrap'>
                    <Support_Item 
                    icon={<Feather name="phone" size={24} color="black" />}
                    title={t('call')}
                    link='tel:+971589107126' />

                    <Support_Item 
                    icon={<FontAwesome name="whatsapp" size={24} color="black" />}
                    title={t('chat')}
                    link='https://wa.me/+971589107126' />

                    <Support_Item 
                    icon={<Entypo name="email" size={24} color="black" />}
                    title={t('chat')}
                    link='mailto:dev.mohamed.esmail@gmail.com' />

                </Div>



                </Div>

            </ScrollDiv>
            <Bottom_Navbar />
        </Div>
    )
}
