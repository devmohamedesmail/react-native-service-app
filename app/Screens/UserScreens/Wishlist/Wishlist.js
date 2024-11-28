import React from 'react'
import { Div, ScrollDiv } from 'react-native-magnus'
import Header from '../../../Components/Header/Header'
import CustomColors from '../../../Config/CustomColors'
import Bottom_Navbar from '../../../Components/Bottom_Navbar/Bottom_Navbar'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import Wishlist_Item from './Wishlist_Item'

export default function Wishlist() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlistItems)


  const handle_delete_item =(item)=>{
    dispatch(remove_From_wishlist(item))
    Toast.show({
        type: 'success',
        text1: t('removed'),

     });
  
   }


  return (
    <Div flex={1}>
      <Header />
      <ScrollDiv bg={CustomColors.screenColor}>
        <Div pt={50}>

          <Div my={30} px={10}>

            {wishlistItems ? (
              <Div>
                {wishlistItems.length > 0 ? (
                  <Div>
                    {wishlistItems.map((item, index) => (
                      <Wishlist_Item
                        key={index}
                        title={item.title}
                        images={item.images}
                        description={item.description}
                        Deleteitem={() => handle_delete_item(item)} />
                    ))}
                  </Div>) :
                  (<Div bg="white">
                    <Text textAlign='center' py={20}>{t('wishlistEmpty')}</Text>
                  </Div>
                  )}
              </Div>) : (<Div>
                <Text>loading</Text>
              </Div>)}
          </Div>

        </Div>
      </ScrollDiv>
      <Bottom_Navbar />
    </Div>
  )
}