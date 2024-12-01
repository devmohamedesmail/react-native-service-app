import React, { useContext, useState } from 'react'
import { Div, ScrollDiv, Text } from 'react-native-magnus'
import { AuthContext } from '../../../Context/AuthProvider'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import CustomButton from '../../../CustomComponents/CustomButton'
import CustomLoading from '../../../CustomComponents/CustomLoading'
import CustomRedirectButton from '../../../CustomComponents/CustomRedirectButton'
import CustomColors from '../../../Config/CustomColors'
import Header from '../../../Components/Header/Header'
import Logo from '../../../Components/Logo/Logo'
import CustomInput from '../../../CustomComponents/CustomInput'
import ConfigApi from '../../../Config/ConfigApi'
import axios from 'axios'
import Toast from 'react-native-toast-message'

export default function Register() {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { auth, setAuth } = useContext(AuthContext)


  // const handleRegisterUser = async () => {
    
  //   if (!email || !password || !name) {

  //     Toast.show({
  //       type: 'error',
  //       text1: `${t('check-input')}`,

  //       position: 'top',
  //       visibilityTime: 5000,
  //     });
  //     return;
  //   }

  //   setLoading(true)
  //   try {
  //     const response = await axios.post(`${ConfigApi.API_URL}/api/register`, {
  //       email, name, password
  //     })

  //     if (response.data.status === 'success') {
  //       await setAuth(response.data)
  //       Toast.show({
  //         type: 'success',
  //         text1: `${t('register-successful')}`,
  //         text2: `${t('welocome')} 👋 ${auth.user.name}`,
  //         position: 'top',
  //         visibilityTime: 4000,
  //       });
  //       setEmail("")
  //       setPassword("")
  //       setName("")

  //       setTimeout(() => {

  //         if (auth.user.role === 'admin') {
  //           navigation.navigate('Dashboard');
  //         } else {
  //           navigation.navigate('Home');
  //         }
  //       }, 2000);
  //     }
  //     setLoading(false)
  //     console.log(response.data)
  //   } catch (error) {

  //     setLoading(false)
  //     Toast.show({
  //       type: 'error',
  //       text1: `${t('register-unsuccessful')}`,
  //       text2: `${t('try-again')}`,
  //       position: 'top',
  //       visibilityTime: 4000,
  //     });
  //     console.log(error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const handleRegisterUser = async () => {
    if (!email || !password || !name) {
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
      const response = await axios.post(`${ConfigApi.API_URL}/api/register`, {
        email,
        name,
        password,
      });
  
      if (response.data.status === 'success') {
        const userData = response.data; // Store the response data
  
        await setAuth(userData); // Set authentication data
        Toast.show({
          type: 'success',
          text1: `${t('register-successful')}`,
          text2: `${t('welocome')} 👋 ${userData.user.name}`, // Use userData directly
          position: 'top',
          visibilityTime: 4000,
        });
  
        // Clear input fields
        setEmail('');
        setPassword('');
        setName('');
  
        setTimeout(() => {
          if (userData.user.role === 'admin') {
            navigation.navigate('Dashboard');
          } else {
            navigation.navigate('Home');
          }
        }, 2000);
      }
    } catch (error) {
      console.log('Register Error:', error);
      Toast.show({
        type: 'error',
        text1: `${t('register-unsuccessful')}`,
        text2: `${t('try-again')}`,
        position: 'top',
        visibilityTime: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Div>
      <Header />
      <ScrollDiv bg={CustomColors.screenColor}>
        <Div flexDir='column' justifyContent='center' h='100%' mt={150} flex={1} alignItems='center'>
          <Div w="100%" px={15} bg="white" pb={100}>

            <Div mb={30}>
              <Logo h={100} w={100} />
            </Div>
            <Text fontWeight='semibold' textAlign='center' fontSize={15} my={20}>{t('join-to-coumunity')}</Text>
            <CustomInput placeholder={t('name')} value={name} onChangeText={(text) => setName(text)} icon='user' />
            <CustomInput placeholder={t('email')} value={email} onChangeText={(text) => setEmail(text)} icon='mail' />
            <CustomInput placeholder={t('password')} value={password} onChangeText={(text) => setPassword(text)} password={true} icon='lock' />

            {loading ? <CustomLoading /> : <CustomButton title={t('register')} onPress={() => handleRegisterUser()} />}

            <Div row m="xl" flexDir="row" alignItems='center'>
              <Text >{t('have-account')}</Text>
              <CustomRedirectButton title={t('login')} onPress={() => navigation.navigate('Login')} />
            </Div>
          </Div>
        </Div>
      </ScrollDiv>
    </Div>
  )
}
