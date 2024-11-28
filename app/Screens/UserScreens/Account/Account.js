import React, { useContext } from 'react'
import { Div, ScrollDiv } from 'react-native-magnus'
import Header from '../../../Components/Header/Header'
import Bottom_Navbar from '../../../Components/Bottom_Navbar/Bottom_Navbar'
import CustomColors from '../../../Config/CustomColors'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../../../Context/AuthProvider'
import Basic_Info from './parts/Basic_Info'
import Account_Portfolio_Section from './parts/Account_Portfolio_Section'
import Account_Ads_Section from './parts/Account_Ads_Section'

export default function Account() {
  const { t } = useTranslation()
  const { auth } = useContext(AuthContext)
  return (
    <Div flex={1}>
      <Header title={t('account')} />
      <ScrollDiv bg={CustomColors.screenColor}>
        <Div px={10} pt={100}>
          <Basic_Info auth={auth} />
          <Account_Portfolio_Section />
          <Account_Ads_Section />
        </Div>
      </ScrollDiv>
      <Bottom_Navbar />
    </Div>
  )
}
