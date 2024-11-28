import react, { useState, useContext } from 'react'
import { Div, ScrollDiv, Text, Image } from 'react-native-magnus'
import Header from '../../../Components/Header/Header'
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import CustomButton from '../../../CustomComponents/CustomButton';
import CustomColors from '../../../Config/CustomColors';
import CustomDropdownMenu from '../../../CustomComponents/CustomDropdownMenu/CustomDropdownMenu';
import CustomImagePicker from '../../../CustomComponents/CustomImagePicker';
import CustomLoading from '../../../CustomComponents/CustomLoading';
import CustomInput from '../../../CustomComponents/CustomInput';
import ConfigApi from '../../../Config/ConfigApi';
import Bottom_Navbar from '../../../Components/Bottom_Navbar/Bottom_Navbar';
import { DataContext } from '../../../Context/DataProvider';
import CustomTextArea from '../../../CustomComponents/CustomTextArea';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export default function Edit_Ad() {


    const route = useRoute();
    const { adItem } = route.params;
    const { t, i18n } = useTranslation()
    const [categories, fetch_categories_data, adsData, fetch_ads_data,
        portfoliosData,
        fetch_users_portfolio,
        countries,
        fetch_contries_data,
        adTypes,
        fetch_adsTypes_data,
        articles,
        fetch_articles_data] = useContext(DataContext)
   
    const [category_id, setCategoryID] = useState(adItem.category_id);
    const [adtype_id, setAdtypeID] = useState(adItem.adtype_id);
    const [country_id, setCountryID] = useState(adItem.country_id);
    const [title, setTitle] = useState(adItem.title)
    const [categoryName, setCategoryName] = useState('');
    const [adtypeName, setAdtypeName] = useState('');
    const [countryName, setCountryName] = useState('');

    const [categoryError, setCategoryError] = useState(false);
    const [oldImages,setOldImages] = useState(adItem.images)
    const [images, setImages] = useState([]);
    const [imagePaths, setImagePaths] = useState([]);
    const [description, setDescription] = useState(adItem.description)

    const [phone, setPhone] = useState(adItem.phone)
    const [email, setEmail] = useState(adItem.email)
    const [whatsup, setwhatsup] = useState(adItem.whatsup)
    const [website, setwebsite] = useState(adItem.website)
    const [user_id, setUser] = useState(null)
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false);






    // ====================================================================================================================================================
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

            const fileNames = result.assets.map(asset => asset.fileName);
            const imagePaths = result.assets.map(asset => asset.uri);

            // Update the state with the file names and image URIs
            setImages(fileNames);
            setImagePaths(imagePaths);
        } else {
            console.log('Image selection cancelled');
        }
    };


    const update_ad = async () => {
        setLoading(true)
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
            await axios.post(`${ConfigApi.API_URL}/api/update/ad/${adItem.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // console.log(image,imagePath)
            setLoading(false);
            fetch_ads_data();
            Toast.show({
                type: 'success',
                text1: `${t('added-successful')}`,
                position: 'top',
                visibilityTime: 4000,
            });
            setTimeout(() => {
                navigation.navigate('Account');
            }, 2000);
           
        } catch (error) {
              console.log(error)
            setLoading(false);
            Toast.show({
                type: 'error',
                text1: `${t('added-unsuccessful')}`,
                position: 'top',
                visibilityTime: 4000,
            });

        } finally {
            setLoading(false);
        }
    }





    return (
        <Div flex={1}>
            <Header title={t('edit-ad')} />
            <ScrollDiv bg={CustomColors.screenColor}>
                <Div pt={100} px={10}>

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



                    <Div flexDir='row' my={10} justifyContent='space-between' alignItems='center' flexWrap='wrap'>
                            {adItem.images.map((image, index) => (<Div>
                                <Image
                                    key={index}
                                    h={100}
                                    w={100}
                                    m={1}
                                    rounded="md"
                                    source={{
                                        uri:
                                            `${ConfigApi.API_URL}/public/uploads/ads/${image}`,
                                    }}
                                />
                            </Div>))}
                        </Div>






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
                        <CustomButton title={t('update')} onPress={() => update_ad()} />}


                </Div>

            </ScrollDiv>
            <Bottom_Navbar />
        </Div>
    )
}
