import React, { useContext, useState } from 'react'
import { Div, ScrollDiv, Text } from 'react-native-magnus'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import Toast from 'react-native-toast-message'
import { AuthContext } from '../../../Context/AuthProvider'
import Logo from '../../../Components/Logo/Logo'
import CustomColors from '../../../Config/CustomColors'
import CustomButton from '../../../CustomComponents/CustomButton'
import CustomInput from '../../../CustomComponents/CustomInput'
import CustomRedirectButton from '../../../CustomComponents/CustomRedirectButton'
import CustomLoading from '../../../CustomComponents/CustomLoading'
import ConfigApi from '../../../Config/ConfigApi'
import axios from 'axios'
import Header from '../../../Components/Header/Header'

export default function Login() {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const { auth, setAuth } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)





  // ---------------- login function ----------------
  // const handleLoginUser = async () => {
  //   if (!email || !password) {
  //     Toast.show({
  //       type: 'error',
  //       text1: `${t('check-input')}`,

  //       position: 'top',
  //       visibilityTime: 5000,
  //     });
  //     return;

  //   }
  //   setLoading(true);

  //   try {
  //     const response = await axios.post(`${ConfigApi.API_URL}/api/login`, { email, password });

  //     if (response.data.status === 'success') {
  //       await setAuth(response.data)
  //       Toast.show({
  //         type: 'success',
  //         text1: `${t('login-successful')}`,
  //         text2: `${t('welocome')} 👋 ${auth.user.name}`,
  //         position: 'top',
  //         visibilityTime: 4000,
  //       });




  //       if (auth && auth.user.role === 'admin') {
  //         navigation.navigate('Dashboard');
  //       } else {
  //         navigation.navigate('Home');
  //       }
  //     }

  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //     Toast.show({
  //       type: 'error',
  //       text1: `${t('login-unsuccessful')}`,
  //       text2: `${t('try-again')}`,
  //       position: 'top',
  //       visibilityTime: 4000,
  //     });

  //   } finally {
  //     setLoading(false);

  //   }
  // }

  const handleLoginUser = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: `${t('check-input')}`,
        position: 'top',
        visibilityTime: 5000,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${ConfigApi.API_URL}/api/login`, { email, password });

      if (response.data.status === 'success') {
        const userData = response.data; // Store the response data

        await setAuth(userData); // Set authentication data
        Toast.show({
          type: 'success',
          text1: `${t('login-successful')}`,
          text2: `${t('welocome')} 👋 ${userData.user.name}`, // Use userData directly
          position: 'top',
          visibilityTime: 4000,
        });

        // Navigate based on role
        if (userData.user.role === 'admin') {
          navigation.navigate('Dashboard');
        } else {
          navigation.navigate('Home');
        }
      }
    } catch (error) {
      console.log('Login Error:', error);
      Toast.show({
        type: 'error',
        text1: `${t('login-unsuccessful')}`,
        text2: `${t('try-again')}`,
        position: 'top',
        visibilityTime: 4000,
      });
    } finally {
      setLoading(false);
    }
  };






  return (
    <Div flex={1}>
      <Header />
      <ScrollDiv bg={CustomColors.screenColor}>
        <Div flexDir='column' justifyContent='center' h='100%' mt={150} flex={1} alignItems='center'>
          <Div w="100%" px={15} bg="white" pb={100}>
            <Div mb={30}>
              <Logo h={100} w={100} />
            </Div>
            <Text fontWeight='semibold' textAlign='center' fontSize={15} my={20}>{t('login-to-coumunity')}</Text>
            <CustomInput placeholder={t('email')} value={email} onChangeText={(text) => setEmail(text)} icon='mail' />
            <CustomInput placeholder={t('password')} value={password} onChangeText={(text) => setPassword(text)} password={true} icon='lock' />
            {loading ? <CustomLoading /> : <CustomButton title={t('login')} onPress={() => handleLoginUser()} />}

            <Div row m="xl" flexDir="row" alignItems='center'>
              <Text fontWeight='semibold'>{t('no-account')}</Text>
              <CustomRedirectButton title={t('register')} onPress={() => navigation.navigate('Register')} />
            </Div>
          </Div>
        </Div>
      </ScrollDiv>
    </Div>
  )
}
