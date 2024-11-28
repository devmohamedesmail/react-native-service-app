import React from 'react'
import { Div, Text } from 'react-native-magnus'
import Profile_Article_Item from './items/Profile_Article_Item'
import { useTranslation } from 'react-i18next'
import Profile_Skeleton from './Profile_Skeleton'

export default function Profile_Articles({ profileData }) {
    const { t } = useTranslation()

    
    return (
        <Div my={30}>
            {profileData ? (
                <Div>
                    <Text textAlign='center' fontWeight='bold' fontSize={14} mb={20}>{t('articles')}</Text>



                    {profileData && profileData.articles.length > 0 ? (
                        <Div>
                            {profileData.articles.map((item, index) => (
                                <Profile_Article_Item
                                    key={index}
                                    images={item.images}
                                    body={item.body}
                                />
                            ))}


                        </Div>)
                        :
                        (<Div><Text>{t('no-articles')}</Text></Div>)}










                </Div>
            )
                :
                (
                    <Div px={10}>
                        <Profile_Skeleton />
                    </Div>
                )}



        </Div>
    )
}
