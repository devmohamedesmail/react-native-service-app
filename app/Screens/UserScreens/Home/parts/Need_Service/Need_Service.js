import React, { useContext, useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { Text, Div, Image, ScrollDiv } from 'react-native-magnus';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { DataContext } from '../../../../../Context/DataProvider';
import { add_To_wishlist } from '../../../../../Redux/Reducers/wishlistSlice';
import ServiceTypeAdItem from './ServiceTypeAdItem';
import Entypo from '@expo/vector-icons/Entypo';







export default function Need_Service() {
    const [neededServices, setNeededServices] = useState([])
    const [, , adsData, , , , , , adTypes, , ,] = useContext(DataContext)
    const navigation = useNavigation();
    const { t ,i18n} = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        const filtered_needed_services = adsData.filter((item) =>
            item.adtype_id ===  2
        );
        setNeededServices(filtered_needed_services);
    }, [adsData]);


    const handleSave = (ad) => {
        try {
            dispatch(add_To_wishlist(ad));
            Toast.show({
                type: 'success',
                text1: t('added'),

            });
        } catch (error) {
            Toast.show({
                type: 'success',
                text1: t('already-added'),

            });
        }
    };




    return (
        <Div bg="white" my={5}>
           
            <Div flexDir='row' justifyContent='space-between' alignItems='center' mt={15}>
              
              <Div flex={1}>
                <Text fontWeight='bold' mx={10}>{t('needed-services')}</Text>
              </Div>
              <Div  flexDir='row' px={10}>
                 <Entypo name="chevron-left" size={24} color="black" />
                 <Entypo name="chevron-right" size={24} color="black" />
              </Div>
            </Div>
            {neededServices && neededServices.length > 0 ? (
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingVertical: 0 }}>

                    {neededServices.map((item, index) => (

                        <ServiceTypeAdItem
                            key={index}
                            images={item.images}
                            title={item.title}
                            country={i18n.language == 'en' ? item.country.name_en : item.country.name_ar}
                            author={item.user.name}
                            onPress={() => navigation.navigate('Details', { adDetails: item })}
                            handleSave={() => handleSave(item)}

                        />
                    ))}
                </ScrollView>
            ) : (
                <Text textAlign='center' bg='gray100' py={10}>{t('no-data-found')}</Text>
            )}

        </Div>
    )
}
