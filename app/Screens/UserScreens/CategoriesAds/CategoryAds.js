import React,{useState} from 'react'
import { Div, ScrollDiv } from 'react-native-magnus'
import Header from '../../../Components/Header/Header'
import Bottom_Navbar from '../../../Components/Bottom_Navbar/Bottom_Navbar'
import CustomColors from '../../../Config/CustomColors'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import AdsFilter from './AdsFilter'

export default function CategoryAds() {
  const route = useRoute()
  const {category} = route.params;
  const [ads] = useState(category.ads)

  return (
    <Div flex={1}>
      <Header />
      <ScrollDiv bg={CustomColors.screenColor}>
        <Div pt={100} px={10}>
           <AdsFilter ads={ads} />
        </Div>
      </ScrollDiv>
      <Bottom_Navbar />
    </Div>
  )
}
