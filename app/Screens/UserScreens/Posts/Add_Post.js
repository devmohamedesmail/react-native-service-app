import React, { useContext, useState,useEffect } from 'react'
import { Div, ScrollDiv ,Image} from 'react-native-magnus'
import Header from '../../../Components/Header/Header'
import Bottom_Navbar from '../../../Components/Bottom_Navbar/Bottom_Navbar'
import CustomTextArea from '../../../CustomComponents/CustomTextArea'
import { useTranslation } from 'react-i18next'
import CustomImagePicker from '../../../CustomComponents/CustomImagePicker'
import CustomLoading from '../../../CustomComponents/CustomLoading'
import CustomButton from '../../../CustomComponents/CustomButton'
import Toast from 'react-native-toast-message'
import { DataContext } from '../../../Context/DataProvider'
import { AuthContext } from '../../../Context/AuthProvider'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';

export default function Add_Post() {
    const { t } = useTranslation()
    const [user_id, setuser_id] = useState()
    const [body, setBody] = useState()
    const [images, setImages] = useState([]);
    const [imagePaths, setImagePaths] = useState([]);
    const [loading, setLoading] = useState(false)
    const {auth}=useContext(AuthContext)
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
            setuser_id(auth.user.id)
        } else {
            navigation.navigate('Login')
        }

    }, [])


    const Add_Post = async () => {

setLoading(true)
        try {
            const formData = new FormData();
            formData.append('user_id', user_id);
            formData.append('body', body);

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
            await axios.post(`${ConfigApi.API_URL}/api/add/article`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setLoading(false);
            fetch_articles_data();
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




    return (
        <Div flex={1}>
            <Header />
            <ScrollDiv>
                <Div pt={100} px={10}>
                    <CustomTextArea
                        value={body}
                        placeholder={t('body')}
                        onChangeText={(text) => setBody(text)}
                    />

                  
                    <Div flexDir='row' justifyContent='flex-end' my={10}>
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

                    {loading ?
                        <CustomLoading />
                        :
                        <CustomButton title={t('add')} onPress={() => Add_Post()} />}

                </Div>
            </ScrollDiv>
            <Bottom_Navbar />
        </Div>
    )
}
