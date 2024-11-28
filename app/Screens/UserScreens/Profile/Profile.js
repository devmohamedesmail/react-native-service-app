import React, { useEffect } from 'react'
import { Div, ScrollDiv } from 'react-native-magnus'
import Header from '../../../Components/Header/Header'
import CustomColors from '../../../Config/CustomColors'
import Bottom_Navbar from '../../../Components/Bottom_Navbar/Bottom_Navbar'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'
import ConfigApi from '../../../Config/ConfigApi'
import Basic_Info from './Basic_Info'
import Profile_Portfolio from './Profile_Portfolio'
import Profile_Articles from './Profile_Articles'

export default function Profile() {
  const route = useRoute();
  const { id } = route.params;
  const [profileData, setProfileData] = React.useState()


  const fetch_user_profile = async () => {
    try {
      const response = await axios.get(`${ConfigApi.API_URL}/api/show/user/${id}`)
      setProfileData(response.data.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch_user_profile();
  }, [])

  return (
    <Div flex={1}>
      <Header />
      <ScrollDiv bg={CustomColors.screenColor}>
        <Div pt={100}>
          <Basic_Info profileData={profileData}  />
          <Profile_Portfolio profileData={profileData} />
          <Profile_Articles profileData={profileData} />
        </Div>
      </ScrollDiv>
      <Bottom_Navbar />
    </Div>
  )
}
