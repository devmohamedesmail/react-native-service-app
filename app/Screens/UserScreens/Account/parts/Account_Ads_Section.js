import React, { useContext, useEffect, useState } from 'react'
import { Div, Text } from 'react-native-magnus'
import { useTranslation } from 'react-i18next';
import ConfigApi from '../../../../Config/ConfigApi';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../../Context/AuthProvider';
import { DataContext } from '../../../../Context/DataProvider';
import Ad_Item from './Items/Ad_Item';

export default function Account_Ads_Section() {
    const [userAds, setUserAds] = useState();
    const { auth } = useContext(AuthContext)
    const { t } = useTranslation()
    const navigation = useNavigation();
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
        fetch_articles_data] = useContext(DataContext)




    const filter_user_ads = () => {
        const filteredAds = adsData?.filter(ad => ad.user_id === auth.user.id) || [];
        setUserAds(filteredAds)
    }

    useEffect(() => {
        filter_user_ads()
    }, [auth.user.id, adsData])

    // --------------- handle delete -----------------
    const handleDeleteUserAd = async (id) => {
        try {
            await axios.get(`${ConfigApi.API_URL}/api/delete/ad/${id}`)
                .then(res => {
                    Toast.show({
                        type: 'success',
                        text1: `${t('deleted')}`,

                        position: 'top',
                        visibilityTime: 4000,
                    });
                })
            filter_user_ads()
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: `${t('error-deleted')}`,

                position: 'top',
                visibilityTime: 4000,
            });
        }
    }

    return (
        <Div>
            <Text fontWeight='bold' textAlign='center' fontSize={15} my={10}>{t('my-ads')}</Text>
            <Div>

                {userAds && userAds.length > 0 ? (
                    userAds.map((ad, index) => (
                        <Ad_Item
                            key={index}
                            images={ad.images}
                            title={`${ad.title.split(' ').slice(0, 5).join(' ')}...`}
                            description={`${ad.description.split(' ').slice(0, 10).join(' ')}...`}
                            handleDelete={() => handleDeleteUserAd(ad.id)}
                            handleEdit={() => navigation.navigate('Edit_Ad', { adItem: ad })}
                        />
                    ))
                ) : (
                    <Text textAlign="center" fontSize={12} color="gray">
                        {t('no-data-found')}
                    </Text>
                )}

            </Div>



        </Div>

    )
}
