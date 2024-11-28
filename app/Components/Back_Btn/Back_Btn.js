import React from 'react'
import { Button, Div ,Text} from 'react-native-magnus'
import Entypo from '@expo/vector-icons/Entypo';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

export default function Back_Btn() {
const { t } = useTranslation();
const navigation = useNavigation();

  return (
   
    <Div>
         <Button bg='transparent' p={0} mr={10} onPress={() => navigation.goBack()}>
        <Div flexDir='row'  justifyContent='center' alignItems='center'>
          <Entypo name="chevron-left" size={24} color="black" />
          <Text>{t('back')}</Text>
        </Div>
    </Button>
    </Div>
  )
}
