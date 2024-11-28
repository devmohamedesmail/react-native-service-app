import React from 'react'
import { Div, Text } from 'react-native-magnus'
import Profile_Skeleton from './Profile_Skeleton'
import { useTranslation } from 'react-i18next'
import Profile_Portfolio_item from './items/Profile_Portfolio_item';

export default function Profile_Portfolio({ profileData }) {
    const { t } = useTranslation();
    return (
        <Div my={30}>
            {profileData ? (
                <Div>
                    <Text textAlign='center' fontWeight='bold' fontSize={14} mb={20}>{t('profile-portfolio')}</Text>
                    {profileData.portfolio.length > 0 ? (
                        <Div px={10} flexDir='row' justifyContent='space-between' flexWrap='wrap'>
                            {profileData.portfolio.map((item, index) => (
                                <Profile_Portfolio_item
                                    images={item.images}
                                    title={item.title}
                                    description={item.description}
                                    link={item.link}
                                    key={index}

                                />
                            ))}
                        </Div>
                    ) : (
                        <Text>{t('no-portfolio')}</Text>
                    )}
                </Div>
            )
                :
                (
                    <Div px={10}>
                        <Profile_Skeleton />
                        <Profile_Skeleton />
                        <Profile_Skeleton />
                        <Profile_Skeleton />
                        <Profile_Skeleton />
                        <Profile_Skeleton />
                        <Profile_Skeleton />
                    </Div>
                )}
        </Div>
    )
}
