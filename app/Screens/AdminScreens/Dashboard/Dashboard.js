import React from 'react'
import { Div, ScrollDiv } from 'react-native-magnus'
import Bottom_Navbar from '../../../Components/Bottom_Navbar/Bottom_Navbar'
import CustomColors from '../../../Config/CustomColors'
import DashboardItem from './DashboardItem'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Header from '../../../Components/Header/Header'

export default function Dashboard() {
  const { t } = useTranslation()
  const navigation = useNavigation()
  return (
    <Div flex={1}>
      <Header />
      <ScrollDiv bg={CustomColors.screenColor}>
        <Div px={10}  mt={150} flexDir='row' justifyContent='space-between' alignItems='center' flexWrap='wrap'>
          <DashboardItem
            icon={<AntDesign name="plus" size={24} color="black" />}
            title={t('add-category')}
            onPress={() => navigation.navigate('Add_Category')}
          />

          <DashboardItem
            icon={<MaterialIcons name="category" size={24} color="black" />}
            title={t('categories')}
            onPress={() => navigation.navigate('Categories')}
          />

        </Div>
      </ScrollDiv>
      <Bottom_Navbar />
    </Div>
  )
}
