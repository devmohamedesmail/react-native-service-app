import React from 'react'
import { Div } from 'react-native-magnus'
import { Linking } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import Contact_Item from '../items/Contact_Item';
import CustomColors from '../../../../Config/CustomColors';



export default function Contact_Section({ adDetails }) {
    const { t } = useTranslation();
    const navigation = useNavigation();
    return (
        <Div justifyContent='center' alignItems='center' my={30}>

            <Contact_Item
                bg={CustomColors.primary}
                title={t('chat')}
                icon={<Entypo name="chat" size={20} color="white" />}
                color="white"
                onPress={() => navigation.navigate('Chat', { adDetails })}
            />

            {adDetails.whatsup ?
                <Contact_Item
                    bg={CustomColors.secondary}
                    title={t('whatsapp-messsage')}
                    icon={<FontAwesome name="whatsapp" size={20} color="white" />}
                    color='white'
                    onPress={() => Linking.openURL(`https://wa.me/${adDetails.whatsapp}text=Hello I Saw Your Ad ${adDetails.title}`)}
                /> : <></>}




            {adDetails.phone ?
                <Contact_Item
                    bg={CustomColors.secondary}
                    title={t('call')}
                    color='white'
                    icon={<AntDesign name="mobile1" size={20} color="white" />}
                    onPress={() => Linking.openURL(`tel:${adDetails.phone}`)} /> : <></>}


            {adDetails.email ?
                <Contact_Item
                    bg='blue'
                    title={t('call')}
                    icon={<FontAwesome name="envelope" size={20} color="white" />}
                    color='white'
                    onPress={() => Linking.openURL(`mailto:${adDetails.email}`)} /> : <></>}

        </Div>
    )
}
