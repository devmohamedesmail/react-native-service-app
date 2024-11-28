import React, { useContext } from 'react'
import { Div, ScrollDiv } from 'react-native-magnus'
import Header from '../../../Components/Header/Header'
import CustomColors from '../../../Config/CustomColors'
import Bottom_Navbar from '../../../Components/Bottom_Navbar/Bottom_Navbar'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { DataContext } from '../../../Context/DataProvider'
import Post_Skeleton from './Post_Skeleton'
import Post_Item from './Post_Item'
import ConfigApi from '../../../Config/ConfigApi'

export default function Posts() {
  const navigation = useNavigation()
  const { t, i18n } = useTranslation()
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
    fetch_articles_data] = useContext(DataContext);
  return (
    <Div flex={1}>
      <Header />
      <ScrollDiv bg={CustomColors.screenColor}>
        <Div pt={100}>
          {articles && articles.length > 0 ? (
            <Div>
              {articles.map((post,index)=>(
                <Post_Item 
                  key={post.id} 
                  avatar={post.user.image} 
                  author={post.user.name} 
                  images={post.images} 
                  body={post.body}
                  image={`${ConfigApi.API_URL}/public/uploads/users/${post.user.image}`}
                  onPress={()=>navigation.navigate('Profile',{id:post.user.id})} />
              ))}
            </Div>
          ) :
            (
              <Div px={10}>
                <Post_Skeleton />
                <Post_Skeleton />
                <Post_Skeleton />
                <Post_Skeleton />
                <Post_Skeleton />
                <Post_Skeleton />
                <Post_Skeleton />
                <Post_Skeleton />
                <Post_Skeleton />
                <Post_Skeleton />
                <Post_Skeleton />
                <Post_Skeleton />
              </Div>
            )}
        </Div>
      </ScrollDiv>
      <Bottom_Navbar />
    </Div>
  )
}
