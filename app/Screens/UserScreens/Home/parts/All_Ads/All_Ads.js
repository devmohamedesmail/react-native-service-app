import React, { useContext } from 'react'
import { Div, Text } from 'react-native-magnus'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { DataContext } from '../../../../../Context/DataProvider'
import Ad_Item from './Ad_Item'
import Ad_Skeleton from './Ad_Skeleton'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { add_To_wishlist } from '../../../../../Redux/Reducers/wishlistSlice'
import Toast from 'react-native-toast-message'

export default function All_Ads() {
  const { t,i18n } = useTranslation()
  const [,, adsData] = useContext(DataContext)
  const navigation = useNavigation()
  const dispatch = useDispatch();

  const handleSave = (ad) => {
    try {
      dispatch(add_To_wishlist(ad));
      Toast.show({
        type: 'success',
        text1: t('added'),

      });
    } catch (error) {
      Toast.show({
        type: 'success',
        text1: t('already-added'),

      });
    }
  };

  return (
    <Div px={20} bg="white" py={10} my={10}>
      <Text fontWeight='bold'>{t('browse-ads')}</Text>



      {adsData && adsData.length > 0 ? (
        <Div flexDir='row' justifyContent='space-between' alignItems='center' flexWrap='wrap'>
          {adsData.map((ad, index) => (
            <Ad_Item
              key={index}

              images={ad.images}
              title={`${ad.title.split(' ').slice(0, 5).join(' ')}...`}
              author={ad.user.name}
              handleDetails={() =>
                navigation.navigate("Details", { adDetails: ad })
              }
              handleSave={() => handleSave(ad)}
              date={moment(ad.created_at).fromNow()}
              country={i18n.language == 'en' ? ad.country.name_en : ad.country.name_ar}
              type={i18n.language == 'en' ? ad.type.type_en : ad.type.type_ar}
            />
          ))}

        </Div>) :
        (
          <Div flexDir='row' justifyContent='space-between' alignItems='center' flexWrap='wrap'>
            <Ad_Skeleton />
            <Ad_Skeleton />
            <Ad_Skeleton />
            <Ad_Skeleton />
            <Ad_Skeleton />
            <Ad_Skeleton />
          </Div>
        )}



    </Div>
  )
}
