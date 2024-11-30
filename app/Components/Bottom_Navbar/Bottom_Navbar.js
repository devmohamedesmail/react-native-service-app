import React, { useContext } from 'react'
import { Div, Button, Icon } from 'react-native-magnus'
import Bottom_Navbar_Item from './Bottom_Navbar_Item'
import { useTranslation } from 'react-i18next'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CustomColors from '../../Config/CustomColors';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Context/AuthProvider';


export default function Bottom_Navbar() {
  const { t } = useTranslation()
  const navigation = useNavigation();
  const { auth } = useContext(AuthContext)
  return (
    <Div flexDir='row' justifyContent='space-around' alignItems='center' borderTopWidth={1} borderTopColor='gray300'>
      <Bottom_Navbar_Item
        title={t('home')}
        icon={<AntDesign name="home" size={24} color="black" />}
        onPress={() => navigation.navigate('Home')} />


      <Bottom_Navbar_Item
        title={t('articles')}
        icon={<MaterialCommunityIcons name="post-outline" size={24} color="black" />}
        onPress={() => navigation.navigate('Posts')} />




      <Div bg="white" pt={5} flexDir='row' justifyContent='center' alignItems='center' h={60} position='relative'>
        <Button
          onPress={() => auth ? navigation.navigate('PostAd') : navigation.navigate("Login")}

          bg={CustomColors.secondary} shadow='lg' mx={10} h={40} w={40} rounded="circle">
          <Icon name="plus" color="white" />
        </Button>
      </Div>

      <Bottom_Navbar_Item
        title={t('wishlist')}
        icon={<FontAwesome6 name="heart" size={24} color="black" />}
        onPress={() => navigation.navigate('Wishlist')} />


      <Bottom_Navbar_Item
        title={t('account')}
        icon={<FontAwesome name="user-o" size={24} color="black" />}
        onPress={() => auth ? navigation.navigate('Account') : navigation.navigate("Login")} />

    </Div>
  )
}
