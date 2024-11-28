import React, { useContext, useState, useEffect } from 'react'
import { Div, ScrollDiv, Text } from 'react-native-magnus'
import Header from '../../../Components/Header/Header'
import Bottom_Navbar from '../../../Components/Bottom_Navbar/Bottom_Navbar'
import { useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import { DataContext } from '../../../Context/DataProvider'
import CustomColors from '../../../Config/CustomColors'
import Search_Item from './Search_Item'


export default function Search() {
  const route = useRoute();
  const { query } = route.params;
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
  const [filteredData, setFilteredData] = useState([]);
  const { t } = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    if (query) {
      const results = adsData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(results);
    } else {
      setFilteredData([]);
    }
  }, [query]);


  return (
    <Div flex={1}>
      <Header />
      <ScrollDiv bg={CustomColors.screenColor}>
        <Div px={10} mt={100}>
          {filteredData && filteredData.length > 0 ? (
            <Div flexDir='row' justifyContent='space-between' alignItems='center' flexWrap='wrap'>
              {filteredData.map((ad, index) => (
            
                <Search_Item 
                  key={index}
                  images={ad.images}
                  title={`${ad.title.split(' ').slice(0, 8).join(' ')}...`}
                  description={`${ad.description.split(' ').slice(0, 8).join(' ')}...`}
                  onPress={()=>navigation.navigate("Details", { adDetails: ad })}
                  date={moment(ad.created_at).fromNow()}
                
                />
              ))}
            </Div>
          ) : (<Text textAlign='center' bg='gray300' py={20} mt={40}>{t('no-data-found')}</Text>)}
        </Div>

      </ScrollDiv>
      <Bottom_Navbar />
    </Div>
  )
}
