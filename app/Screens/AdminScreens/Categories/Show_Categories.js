import React, { useContext } from 'react'
import { Div, ScrollDiv, Text } from 'react-native-magnus'
import CustomColors from '../../../Config/CustomColors'
import Header from '../../../Components/Header/Header'
import Bottom_Navbar from '../../../Components/Bottom_Navbar/Bottom_Navbar'
import { DataContext } from '../../../Context/DataProvider'
import Category_Item from './items/Category_Item'
import ConfigApi from '../../../Config/ConfigApi'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

export default function Show_Categories() {
  const [
    categories,
    fetch_categories_data,
    adsData,
    fetch_ads_data,
    portfoliosData,
    fetch_users_portfolio,
    countries,
    fetch_contries_data,
    adTypes,
    fetch_adsTypes_data,
    articles,
    fetch_articles_data] = useContext(DataContext)
  const { t } = useTranslation();
  const navigation = useNavigation()




  const handle_edit_category = async (id) => {
    const res = await ConfigApi.get(`categories/${id}`)
    console.log(res.data)
  }

  const handle_delete_category = async (id) => {
    try {
      await axios.get(`${ConfigApi.API_URL}/delete/category/${id}`).then(() => {
        Toast.show({
          type: 'success',
          text1: t('deleted'),

        });
      })
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <Div flex={1}>
      <Header />
      <ScrollDiv bg={CustomColors.screenColor}>
        <Div px={10} pt={100}>

          <Div flexDir='row' justifyContent='space-between' alignItems='center' flexWrap='wrap'>
            {categories && categories.map((item, index) => (
              <Category_Item
                key={index}
                image={`${ConfigApi.API_URL}/public/uploads/category/${item.image}`}
                title={item.nameAr}
                description={item.description}
                handleDelete={() => handle_delete_category(item.id)}
                handleEdit={() => navigation.navigate('Edit_Category', { category: item })}


              />
            ))}
          </Div>
        </Div>

      </ScrollDiv>
      <Bottom_Navbar />
    </Div>
  )
}
