import React, { useState, useEffect, useContext } from 'react'
import { Drawer, Button, Div, Radio, Text } from 'react-native-magnus'
import Octicons from '@expo/vector-icons/Octicons';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { DataContext } from '../../../Context/DataProvider';
import CustomColors from '../../../Config/CustomColors';
import Ad_Item from '../Home/parts/All_Ads/Ad_Item';

export default function AdsFilter({ ads }) {
    const drawerRef = React.createRef();
    const { t, i18n } = useTranslation();
    const [country, setCountry] = useState('');
    const [type, setType] = useState();
    const [filteredAds, setFilteredAds] = useState(ads);
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


    useEffect(() => {
        let filtered = ads;

        if (type) {
            filtered = filtered.filter(ad => ad.type.type_en ||ad.type.type_ar  === type);
        }

        if (country) {
            filtered = filtered.filter(ad => ad.country.name_en || ad.country.name_ar  === country);
        }

        setFilteredAds(filtered);
    }, [ads, type, country]);
    return (
        <Div>
            <Drawer ref={drawerRef} bg={CustomColors.screenColor}>
                <Div p={10} mt={40}>



                    <Div flexDir='column' my={20}>
                        <Text textAlign='center' py={10} fontWeight='bold' bg="white" mb={30}>{t('select-ad-type')}</Text>
                        <Radio.Group onChange={(newValue) => setType(newValue)}>
                            {adTypes.map((item, index) => (
                                <Radio
                                    key={index}
                                    value={i18n.language == 'ar' ? item.type_ar : item.type_en}
                                    activeColor={CustomColors.secondary}
                                    prefix={<Text fontWeight='bold' flex={1}>{i18n.language == 'ar' ? item.type_ar : item.type_en}</Text>}
                                />
                            ))}
                        </Radio.Group>

                    </Div>






                    <Div flexDir='column' my={20}>
                        <Text textAlign='center' py={10} fontWeight='bold' bg="white" mb={30}>{t('select-city')}</Text>
                        <Radio.Group onChange={(newValue) => setCountry(newValue)}>
                            {countries.map((item, index) => (
                                <Radio
                                    key={index}
                                    value={i18n.language == 'ar' ? item.name_ar : item.name_en}
                                    activeColor={CustomColors.secondary}
                                    prefix={<Text fontWeight='bold' flex={1}>{i18n.language == 'ar' ? item.name_ar : item.name_en}</Text>}
                                />
                            ))}
                        </Radio.Group>

                    </Div>



                </Div>
            </Drawer>


            <Div flexDir='row' justifyContent='flex-end' px={10} my={5}>
                <Button
                    onPress={() => {
                        if (drawerRef.current) {
                            drawerRef.current.open();
                        }
                    }}
                    bg='white'
                >
                    <Octicons name="filter" size={20} color="black" />
                </Button>
            </Div>

            <Div px={10}>
                {filteredAds.length > 0 ? (
                    <Div flexDir='row' justifyContent='space-between' flexWrap='wrap'>
                        {filteredAds.map((ad, index) => (
                            <Ad_Item
                                key={index}
                                images={ad.images}
                                title={ad.title}
                                author={ad.user.name}
                                handleDetails={() => navigation.navigate('Details', { adDetails: ad })}
                                date={moment(ad.created_at).fromNow()}
                            />
                        ))}
                    </Div>
                ) : (
                    <Text py={20} bg='gray200' textAlign='center'>{t('no-data-found')}</Text>
                )}
            </Div>



        </Div>
    )
}
