import React,{useState} from 'react'
import { Div, ScrollDiv,Image } from 'react-native-magnus'
import Bottom_Navbar from '../../../Components/Bottom_Navbar/Bottom_Navbar'
import CustomColors from '../../../Config/CustomColors'
import CustomInput from '../../../CustomComponents/CustomInput'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import CustomImagePicker from '../../../CustomComponents/CustomImagePicker'
import CustomButton from '../../../CustomComponents/CustomButton'
import CustomLoading from '../../../CustomComponents/CustomLoading'
import * as ImagePicker from 'expo-image-picker';
import ConfigApi from '../../../Config/ConfigApi'


export default function Add_Category() {
    const { t } = useTranslation()
    const [nameEn, setNameEn] = useState('');
    const [nameAr, setNameAr] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imagePath, setImagePath] = useState(null);
    const [loading, setLoading] = useState(false);



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
    const addCategory = async () => {
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
            await axios.post(`${ConfigApi.API_URL}/api/add/categories`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setNameEn('');
            setNameAr('');
            setSlug('');
            setDescription('');
            setImage('');
            setImagePath('');
            setLoading(false);
            Toast.show({
                type: 'success',
                text1: t('added'),
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: t('error'),       
              });
            console.log(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };




    return (
        <Div flex={1}>
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
                    {loading ? <CustomLoading /> : <CustomButton title={t('add')} onPress={() => addCategory()} />}
                </Div>
            </ScrollDiv>
            <Bottom_Navbar />
        </Div>
    )
}
