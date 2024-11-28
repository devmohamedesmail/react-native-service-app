import React from 'react'
import { Div, ScrollDiv, Text, Image } from 'react-native-magnus'
import Bottom_Navbar from '../../../Components/Bottom_Navbar/Bottom_Navbar'
import SearchBox from '../../../Components/SearchBox/SearchBox'
import Categories_Section from './parts/Categories_Section/Categories_Section'
import All_Ads from './parts/All_Ads/All_Ads'
import Header from '../../../Components/Header/Header'



export default function Home() {
  return (
    <Div flex={1}>
      <Header title='Home' />
      <ScrollDiv>

        <Div position='relative'>
         
          <Image
            h={300}
            w='100%'
            source={require('../../../../assets/images/header.jpg')} />
          <Div position='absolute' w="98%" bottom={10} mx={5}>
            <SearchBox />
          </Div>
        </Div>

        <Categories_Section />
        <All_Ads />

      </ScrollDiv>
      <Bottom_Navbar />
    </Div>
  )
}
