import React from 'react'
import { Div, ScrollDiv } from 'react-native-magnus'
import Bottom_Navbar from '../../../Components/Bottom_Navbar/Bottom_Navbar'
import CustomColors from '../../../Config/CustomColors'
import DashboardItem from './DashboardItem'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

export default function Dashboard() {
  const { t } = useTranslation()
  const navigation = useNavigation()
  return (
    <Div flex={1}>
      <ScrollDiv bg={CustomColors.screenColor}>
        <Div px={10} py={20}>
          <DashboardItem
            icon={<AntDesign name="plus" size={24} color="black" />}
            title={t('add-category')}
            onPress={() => navigation.navigate('Add_Category')}
          />
        </Div>
      </ScrollDiv>
      <Bottom_Navbar />
    </Div>
  )
}
