import React, { useContext, useState } from 'react'
import { Div, ScrollDiv } from 'react-native-magnus'
import Header from '../../../Components/Header/Header'
import CustomColors from '../../../Config/CustomColors'
import Bottom_Navbar from '../../../Components/Bottom_Navbar/Bottom_Navbar'
import { useRoute } from '@react-navigation/native'
import CustomButton from '../../../CustomComponents/CustomButton'
import CustomImagePicker from '../../../CustomComponents/CustomImagePicker'
import CustomLoading from '../../../CustomComponents/CustomLoading'
import CustomInput from '../../../CustomComponents/CustomInput'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import axios from 'axios'
import { DataContext } from '../../../Context/DataProvider'

export default function Edit_Category() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const route = useRoute();
    const { category } = route.params;
  
    const [nameEn, setNameEn] = useState(category.nameEn);
    const [nameAr, setNameAr] = useState(category.nameAr);
    const [slug, setSlug] = useState(category.slug);
    const [description, setDescription] = useState(category.description);
    const [image, setImage] = useState(null);
    const [imagePath, setImagePath] = useState(null);
    const [loading, setLoading] = useState(false);
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



    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Permission to access media library is required!');
            return;
        }

        // Open the image picker and allow the user to choose an image
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });


        if (!result.cancelled) {
            setImage(result.assets[0].fileName);
            setImagePath(result.assets[0].uri);
        }
    };


    // Function to add category (with image upload)
    const handle_edit_category = async (id) => {
        
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('nameEn', nameEn);
            formData.append('nameAr', nameAr);
            formData.append('slug', slug);
            formData.append('description', description);

            if (imagePath) {
                const extension = imagePath.split('.').pop();
                const fileType = `image/${extension}`;

                formData.append('image', {
                    uri: imagePath,
                    type: fileType,
                    name: image,
                });
            }

            // Send data to the server
            await axios.post(`${ConfigApi.API_URL}/api/update/categories/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });


            setImage('');
            setImagePath('');
            setLoading(false);
            fetch_categories_data();
            Toast.show({
                type: 'success',
                text1: t('updated'),
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: t('error'),
            });
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Div flex={1}>
            <Header />
            <ScrollDiv bg={CustomColors.screenColor}>
                <Div py={30} px={10}>

                    <CustomInput placeholder={t('nameEn')} value={nameEn} onChangeText={(text) => setNameEn(text)} />
                    <CustomInput placeholder={t('nameAr')} value={nameAr} onChangeText={(text) => setNameAr(text)} />
                    <CustomInput placeholder={t('slug')} value={slug} onChangeText={(text) => setSlug(text)} />
                    <CustomInput placeholder={t('description')} value={description} onChangeText={(text) => setDescription(text)} />

                    <Div flexDir='row' justifyContent='space-between' alignItems='center' my={20}>

                        <Div>
                            {imagePath && <Image source={{ uri: imagePath }} w={100} h={100} m='auto' />}
                        </Div>

                        <CustomImagePicker onPress={pickImage} />
                    </Div>
                    {loading ? <CustomLoading /> : <CustomButton title={t('update')} onPress={() => handle_edit_category(category.id)} />}
                </Div>
            </ScrollDiv>
            <Bottom_Navbar />
        </Div>
    )
}
