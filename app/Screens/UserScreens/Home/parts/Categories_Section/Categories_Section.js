import React, { useContext } from 'react'
import { Div, Text } from 'react-native-magnus'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { DataContext } from '../../../../../Context/DataProvider'
import CategoryItem from './CategoryItem'
import ConfigApi from '../../../../../Config/ConfigApi'
import Category_Skeleton from './Category_Skeleton'

export default function Categories_Section() {
  const { t, i18n } = useTranslation()
  const navigation = useNavigation()
  const [ categories] = useContext(DataContext)
  return (
    <Div px={20} bg="white" py={10} my={10}>
      <Text fontWeight='bold'>{t('browse-services')}</Text>

       {categories && categories.length > 0 ? (
        <Div flexDir='row' justifyContent='space-between' alignItems='center' flexWrap='wrap'>
          {categories.map((category, index) => (
            <CategoryItem
              title={i18n.language === "ar" ? category.nameAr : category.nameEn}
              key={index}
              image={`${ConfigApi.API_URL}/public/uploads/category/${category.image}`}
              counter={category.ads.length}
              onPress={() => navigation.navigate("CategoryAds", {category: category})
              }
            />
          ))}

        </Div>) :
        (
          <Div flexDir='row' mt={20} justifyContent='space-between' alignItems='center' flexWrap='wrap'>
            <Category_Skeleton />
            <Category_Skeleton />
            <Category_Skeleton />
            <Category_Skeleton />
            <Category_Skeleton />
            <Category_Skeleton />
            <Category_Skeleton />
            <Category_Skeleton />
            <Category_Skeleton />
          </Div>
        )} 

    </Div>
  )
}
