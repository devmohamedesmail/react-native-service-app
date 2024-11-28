import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Context/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Div, Button, Drawer, Text } from 'react-native-magnus';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Drawer_Item from './Drawer_Item';
import CustomColors from '../../Config/CustomColors';
import Logo from '../Logo/Logo';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Octicons from '@expo/vector-icons/Octicons';
import { I18nManager } from 'react-native';




export default function Drawer_Component() {
  const drawerRef = React.createRef();
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const { auth ,setAuth} = useContext(AuthContext)


  const logout = async () => {
    try {

      await AsyncStorage.removeItem("userAuth");
      setAuth(null);
      Toast.show({
        type: 'success',
        text1: `${t('logout-successful')}`,
        text2: `${t('welocome')} 👋 ${auth.user.name}`,
        position: 'top',
        visibilityTime: 4000,
      });

      setTimeout(() => {
        navigation.navigate('Home');
      }, 42000);

    } catch (error) {
      console.error("Logout failed", error);
      Toast.show({
        type: 'error',
        text1: `${t('error')}`,
        position: 'top',
        visibilityTime: 4000,
      });
    }
  };


  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang)
      .then(() => {
        I18nManager.forceRTL(newLang === 'ar');

      })
      .catch(err => console.error('Failed to change language', err));
  };


  return (
    <Div>


      <Drawer ref={drawerRef} bg={CustomColors.screenColor}>
        <Div>
          <Logo w={100} h={100} />



          <Div my={10} bg="white">
            <Drawer_Item title={t('home')}
              icon={<AntDesign name="home" size={24} color="black" />}
              onPress={() => navigation.navigate('Home')} />

            <Drawer_Item title={t('wishlist')}
              icon={<AntDesign name="hearto" size={24} color="black" />}
              onPress={() => navigation.navigate('Wishlist')} />

            <Drawer_Item
              title={t('support')}
              icon={<FontAwesome5 name="headset" size={24} color="black" />}
              onPress={() => navigation.navigate('Support')} />

          </Div>
          <Div my={10} bg="white">

            {auth ?
              <Drawer_Item
                title={t('logout')}
                icon={<FontAwesome name="sign-out" size={24} color="black" />}
                onPress={() => logout()} /> :
              <Div>
                <Drawer_Item
                  title={t('login')}
                  icon={<Entypo name="login" size={24} color="black" />}
                  onPress={() => navigation.navigate('Login')} />
                <Drawer_Item
                  title={t('register')}
                  icon={<Feather name="at-sign" size={24} color="black" />}
                  onPress={() => navigation.navigate('Register')} />
              </Div>

            }
            {auth && auth.user.role === "admin" ? (
              <Drawer_Item
                title={t('dashboard')}
                icon={<MaterialIcons name="dashboard" size={24} color="black" />}
                onPress={() => navigation.navigate('Dashboard')} />
            ) : (<></>)}

          </Div>






          <Div my={10} bg="white">
            <Drawer_Item 
               title={t('add-article')}
               icon={<Entypo name="pencil" size={24} color="black" />} 
               onPress={() => auth? navigation.navigate('Add_Post') : navigation.navigate('Login')} />
            <Drawer_Item 
               title={t('articles')}
               icon={<MaterialIcons name="article" size={24} color="black" />} 
               onPress={() =>  navigation.navigate('Posts')} />

          </Div>



          <Div my={10} bg="white">
            <Drawer_Item title={i18n.language === "en" ? "عربي" : "English"}
              icon={<MaterialIcons name="language" size={24} color="black" />} onPress={() => toggleLanguage()} />

          </Div>

















        </Div>
      </Drawer>

      <Button
        bg='transparent'
        onPress={() => {
          if (drawerRef.current) {
            drawerRef.current.open();
          }
        }}
      >
        <FontAwesome6 name="bars-staggered" size={24} color="black" />
      </Button>






    </Div>
  )
}
