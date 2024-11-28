import React, { useContext, useEffect, useState } from 'react'
import { Div, ScrollDiv, Text, Button, Dropdown, Image, Icon } from 'react-native-magnus'
import CustomColors from '../../../Config/CustomColors'
import Bottom_Navbar from '../../../Components/Bottom_Navbar/Bottom_Navbar'
import { useTranslation } from 'react-i18next'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import Toast from 'react-native-toast-message';
import { AuthContext } from '../../../Context/AuthProvider'
import ConfigApi from '../../../Config/ConfigApi'
import CustomInput from '../../../CustomComponents/CustomInput'
import CustomTextArea from '../../../CustomComponents/CustomTextArea'
import CustomButton from '../../../CustomComponents/CustomButton'
import CustomLoading from '../../../CustomComponents/CustomLoading'
import CustomDropdownMenu from '../../../CustomComponents/CustomDropdownMenu/CustomDropdownMenu'
import { DataContext } from '../../../Context/DataProvider'
import CustomImagePicker from '../../../CustomComponents/CustomImagePicker'




export default function Post_Ad() {
    const { t, i18n } = useTranslation()
    const navigation = useNavigation()
    const [user_id, setUser] = useState(null);
    const [category_id, setCategoryID] = useState('');
    const [adtype_id, setAdtypeID] = useState('');
    const [country_id, setCountryID] = useState('');
    const [title, setTitle] = useState('')
    const [categoryName, setCategoryName] = useState('');
    const [adtypeName, setAdtypeName] = useState('');
    const [countryName, setCountryName] = useState('');

    const [categoryError, setCategoryError] = useState(false);
    const [images, setImages] = useState([]);
    const [imagePaths, setImagePaths] = useState([]);
    const [description, setDescription] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [whatsup, setwhatsup] = useState('')
    const [website, setwebsite] = useState('')
    const { auth } = useContext(AuthContext)

    const [loading, setLoading] = useState(false);


    const [categories, fetch_categories_data, adsData, fetch_ads_data,
        portfoliosData,
        fetch_users_portfolio,
        countries,
        fetch_contries_data,
        adTypes,
        fetch_adsTypes_data,
        articles,
        fetch_articles_data] = useContext(DataContext)




    // +++++++++++++++++++++++++++++++++++++
    const pickImages = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Permission to access media library is required!');
            return;
        }

        // Open the image picker to allow the user to select multiple images
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            allowsMultipleSelection: true,
            quality: 1,
            selectionLimit: 0, // 0 allows for multiple selections
        });

        if (!result.cancelled) {
            // Extract file names and URIs
            const fileNames = result.assets.map(asset => asset.fileName);
            const imagePaths = result.assets.map(asset => asset.uri);

            // Update the state with the file names and image URIs
            setImages(fileNames);
            setImagePaths(imagePaths);

            console.log('Selected image file names:', fileNames);
            console.log('Selected image URIs:', imagePaths);
        } else {
            console.log('Image selection cancelled');
        }
    };



    useEffect(() => {
        if (auth) {
            setUser(auth.user.id)
        } else {
            navigation.navigate('Login')
        }

    }, [])



    const Ad_New_Add = async () => {
        setLoading(true);
        setCategoryError(false);
        if (!category_id) {
            setCategoryError(true);
            setLoading(false);
            return;
        }
        
        try {
            const formData = new FormData();
            formData.append('user_id', user_id);
            formData.append('category_id', category_id);
            formData.append('type_id', adtype_id);
            formData.append('country_id', country_id);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('phone', phone);
            formData.append('website', website);
            formData.append('whatsup', whatsup);
            formData.append('email', email);


            if (imagePaths && images && imagePaths.length > 0) {

                imagePaths.forEach((uri, index) => {
                    const fileName = images[index];
                    const extension = uri.split('.').pop();
                    const fileType = `image/${extension}`;


                    formData.append('images[]', {
                        uri: uri,
                        type: fileType,
                        name: fileName,
                    });
                });
            }


            // Send data to the server
            await axios.post(`${ConfigApi.API_URL}/api/add/ads`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setLoading(false);
            setCategoryID('');
            setCategoryName('');
            setAdtypeID('')
            setAdtypeName('')
            setCountryID('')
            setCountryName('')
            setTitle('');
            setDescription('');
            setCategoryID('');
            setPhone('');
            setwebsite('');
            setwhatsup('');
            setEmail('');
            setImagePaths([]);
            setImages([]);
            fetch_ads_data();


            Toast.show({
                type: 'success',
                text1: `${t('added')}`,
                position: 'top',
                visibilityTime: 4000,
            });


        } catch (error) {
            setLoading(false);
            Toast.show({
                type: 'error',
                text1: `${t('error')}`,
                position: 'top',
                visibilityTime: 4000,
            });
            console.log(error);
        } finally {
            setLoading(false);
        }



    };
    // +++++++++++++++++++++++++++++++++++++






    return (
        <Div flex={1}>
            <ScrollDiv bg={CustomColors.screenColor}>
                <Div px={10}>

                    {/* ------------------------------------------- */}
                    <CustomDropdownMenu
                        items={categories}
                        selectedItem={categoryName}
                        displayKey={i18n.language == 'en' ? 'nameEn' : 'nameAr'}
                        selectoption={t('select-Category')}
                        onPress={(category) => {
                            setCategoryID(category.id);
                            setCategoryName(i18n.language == 'en' ? category.nameEn : category.nameAr);
                        }
                        }

                    />

                    {categoryError ? (
                        <Text color='red' fontSize={12} textAlign='center'>{t('Please-select-category')}</Text>
                    ) : null}


                    {/* ------------------------------------------------------- */}

                    <CustomDropdownMenu
                        items={adTypes}
                        selectedItem={adtypeName}
                        displayKey={i18n.language == 'en' ? 'type_en' : 'type_ar'}
                        selectoption={t('select-type')}
                        onPress={(type) => {
                            setAdtypeID(type.id);
                            setAdtypeName(i18n.language == 'en' ? type.type_en : type.type_ar);
                        }
                        }
                    />


                    {/* -------------------------------------------------------- */}
                    <CustomInput value={title} onChangeText={(text) => setTitle(text)} placeholder={t('ad-title')} />
                    {/* ---------------------------------------------------------- */}



                    <Div flexDir='row' justifyContent='flex-end'>
                        <CustomImagePicker onPress={pickImages} />
                    </Div>
                    <Div my={10} flexDir='row' flexWrap='wrap'>
                        {imagePaths && imagePaths.length > 0 && imagePaths.map((uri, index) => (
                            <Div key={index} m={4}>
                                <Image
                                    source={{ uri }}
                                    w={100}
                                    h={100}
                                    m='auto'

                                />
                            </Div>
                        ))}
                    </Div>

                    {/* ---------------------------------------------------------------------- */}

                    <CustomTextArea value={description} onChangeText={(text) => setDescription(text)} placeholder={t('ad-description')} />
                    <CustomInput value={phone} onChangeText={(text) => setPhone(text)} placeholder={t('phone')} />
                    <CustomInput value={email} onChangeText={(text) => setEmail(text)} placeholder={t('email')} />
                    <CustomInput value={whatsup} onChangeText={(text) => setwhatsup(text)} placeholder={t('whatsup')} />
                    <CustomInput value={website} onChangeText={(text) => setwebsite(text)} placeholder={t('website')} />


                    <CustomDropdownMenu
                        items={countries}
                        selectedItem={countryName}
                        displayKey={i18n.language == 'en' ? 'name_en' : 'name_ar'}
                        selectoption={t('select-city')}
                        onPress={(country) => {
                            setCountryID(country.id)
                            setCountryName(i18n.language == 'en' ? country.name_en : country.name_ar)

                        }
                        }
                    />

                    {loading ?
                        <CustomLoading />
                        :
                        <CustomButton title={t('publish-ad')} onPress={() => Ad_New_Add()} />}




                </Div>
            </ScrollDiv>
            <Bottom_Navbar />
        </Div>
    )
}
