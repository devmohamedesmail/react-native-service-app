import React, { useState, useEffect, useContext } from 'react'
import { Div, Button, Text, Icon, Image } from 'react-native-magnus'
import Feather from '@expo/vector-icons/Feather';
import Toast from 'react-native-toast-message';
import axios from 'axios'
import Modal from "react-native-modal";
import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../../../../Context/AuthProvider';
import CustomButton from '../../../../CustomComponents/CustomButton';
import CustomColors from '../../../../Config/CustomColors';
import ConfigApi from '../../../../Config/ConfigApi';
import CustomInput from '../../../../CustomComponents/CustomInput';
import CustomTextArea from '../../../../CustomComponents/CustomTextArea';
import CustomImagePicker from '../../../../CustomComponents/CustomImagePicker';
import CustomLoading from '../../../../CustomComponents/CustomLoading';
import Portfolio_Item from './Items/Portfolio_Item';
import { Linking } from 'react-native';

export default function Account_Portfolio_Section() {
    const { t } = useTranslation();
    const [userPortfolio, setUserPortfolio] = useState([])
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalEditVisible, setModalEditVisible] = useState(false);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState([]);
    const [imagePaths, setImagePaths] = useState([]);
    const [oldimages, setOldImages] = useState('');

    const [link, setLink] = useState('')
    const [loading, setLoading] = useState(false)
    const { auth } = useContext(AuthContext);
    const [currentItem, setCurrentItem] = useState(null);
    const [portfolioId, setPortfolioId] = useState(null);


    // ===========================================================================================

    // -------------------------- Fetch User Portfolio ----------------------------------------------
    const fetch_user_portfolio = async () => {
        try {
            const response = await axios.get(`${ConfigApi.API_URL}/api/show/portfolio/${auth.user.id}}`)
            setUserPortfolio(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetch_user_portfolio()
    }, [])

    // ---------------------------- Model ------------------------------------------------------------
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleEditModel = (item) => {
        if (item) {
            setPortfolioId(item.id)
            setTitle(item.title || '');
            setDescription(item.description || '');
            setLink(item.link || '');
            setOldImages(item.images || '');

        }
        setModalEditVisible(!isModalEditVisible);
    };



    // ------------------------------------ Images Picker ----------------------------------------------
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
        } else {
            console.log('Image selection cancelled');
        }
    };


    // ---------------------------- Add Portfolio ----------------------------
    const addPortfolio = async () => {
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('user_id', auth.user.id);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('link', link);

            if (imagePaths && images && imagePaths.length > 0) {

                imagePaths.forEach((uri, index) => {
                    const fileName = images[index];
                    const extension = uri.split('.').pop(); // Get the extension
                    const fileType = `image/${extension}`; // Define the file type


                    formData.append('images[]', {
                        uri: uri,
                        type: fileType,
                        name: fileName,
                    });
                });
            }
            // Send data to the server
            await axios.post(`${ConfigApi.API_URL}/api/add/portfolio`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLoading(false);
            setTitle('')
            setDescription('')
            setLink('')
            setImages('')
            setImagePaths('')
            fetch_user_portfolio()

            Toast.show({
                type: 'success',
                text1: `${t('added-successful')}`,
                position: 'top',
                visibilityTime: 4000,
            });

            toggleModal();
            setModalVisible(false)
        } catch (error) {

            setLoading(false);
            Toast.show({
                type: 'error',
                text1: `${t('added-unsuccessful')}`,
                position: 'top',
                visibilityTime: 4000,
            });
            console.log(error)

        } finally {
            setLoading(false);
        }
    }


    // ---------------------------- updatePortfolio  ----------------------------
    const updatePortfolio = async (id) => {
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('link', link);

            if (imagePaths && images && imagePaths.length > 0) {

                imagePaths.forEach((uri, index) => {
                    const fileName = images[index];
                    const extension = uri.split('.').pop(); // Get the extension
                    const fileType = `image/${extension}`; // Define the file type


                    formData.append('images[]', {
                        uri: uri,
                        type: fileType,
                        name: fileName,
                    });
                });
            }

            await axios.post(`${ConfigApi.API_URL}/api/update/portfolio/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLoading(false);
            setTitle('')
            setDescription('')
            setLink('')

            fetch_user_portfolio()
            toggleEditModel();
            setModalEditVisible(false)
            Toast.show({
                type: 'success',
                text1: `${t('updated-successful')}`,
                position: 'top',
                visibilityTime: 4000,
            });


        } catch (error) {

            setLoading(false);
            Toast.show({
                type: 'error',
                text1: `${t('updated-unsuccessful')}`,
                position: 'top',
                visibilityTime: 4000,
            });
            console.log(error)

        } finally {
            setLoading(false);
        }
    }

    // ---------------------------- Delete portfolio  ----------------------------
    const handl_delete_portfolio = async (item) => {
        try {
            await axios.get(`${ConfigApi.API_URL}/api/delete/portfolio/${item.id}`).then(() => (
                Toast.show({
                    type: 'success',
                    text1: `${t('deleted')}`,
                    position: 'top',
                    visibilityTime: 4000,
                })

            ))

            fetch_user_portfolio()
        } catch (error) {
            console.log(error)
            Toast.show({
                type: 'error',
                text1: `${t('undeleted')}`,
                position: 'top',
                visibilityTime: 4000,
            })
        }
    }


    // ===========================================================================================

    return (
        <Div>

            <Div flexDir='row' justifyContent='space-between' alignItems='center' my={20}>
                <Text fontWeight='bold' textAlign='center' fontSize={15} my={10}>{t('my-work')}</Text>

                <Button onPress={toggleModal} bg={CustomColors.primary} h={40} w={40} rounded="circle">
                    <Icon name="plus" color="white" />
                </Button>
            </Div>


            {/* ----------------------------- Add Model Start --------------------------------- */}
            <Div >
                <Modal isVisible={isModalVisible} animationIn="zoomIn" animationInTiming={700} animationOut="zoomOut">
                    <Div bg='white' py={10} px={10}>
                        <Div row justifyContent='flex-end'>
                            <Button bg="red700" h={40} w={40} rounded="circle" onPress={toggleModal}>
                                <Feather name="x" size={12} color="white" />
                            </Button>
                        </Div>
                        <Text textAlign='center' fontWeight='bold' fontSize={17} my={20}>{t('add-new-work')}</Text>
                        <CustomInput value={title} onChangeText={(text) => setTitle(text)} placeholder={t('title')} />
                        <CustomTextArea value={description} onChangeText={(text) => setDescription(text)} placeholder={t('description')} />
                        <CustomInput value={link} onChangeText={(text) => setLink(text)} placeholder={t('link')} />


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
                                        bg='red'
                                    />
                                </Div>
                            ))}
                        </Div>



                        {loading ? <CustomLoading /> : <CustomButton title={t('add')} onPress={() => addPortfolio()} />}
                    </Div>
                </Modal>
            </Div>
            {/* ----------------------------- Add Model End --------------------------------- */}


            {/* ----------------------------- update Model Start -------------------------------- */}
            <Div>
                <Modal isVisible={isModalEditVisible} animationIn="zoomIn" animationInTiming={700} animationOut="zoomOut">
                    <Div bg='white' py={10} px={10}>
                        <Div row justifyContent='flex-end'>
                            <Button bg="red700" h={40} w={40} rounded="circle" onPress={() => toggleEditModel(null)}>
                                <Feather name="x" size={12} color="white" />
                            </Button>
                        </Div>
                        <Text textAlign='center' fontWeight='bold' fontSize={17} my={20}>{t('update')}</Text>

                        {/* Use the current item data for pre-filling the modal fields */}
                        <CustomInput
                            value={currentItem ? currentItem.title : title} // Use title from currentItem or the state
                            onChangeText={(text) => setTitle(text)} // Update title state
                            placeholder={t('title')}
                        />

                        <CustomTextArea
                            value={currentItem ? currentItem.description : description} // Use description from currentItem or state
                            onChangeText={(text) => setDescription(text)} // Update description state
                            placeholder={t('description')}
                        />

                        <CustomInput
                            value={currentItem ? currentItem.link : link} // Use link from currentItem or state
                            onChangeText={(text) => setLink(text)} // Update link state
                            placeholder={t('link')}
                        />


                        {oldimages && oldimages.length > 0 ? (<Div flexDir='row' justifyContent='space-between' alignItems='center'>
                            {oldimages.map((image, index) => (
                                <Div key={index}>
                                    <Image
                                        h={100}
                                        w={100}
                                        m={10}

                                        source={{
                                            uri: `${ConfigApi.API_URL}/public/uploads/portfolio/${image}`,
                                        }}
                                    />
                                </Div>
                            ))}
                        </Div>) : (<></>)}

                        <Div flexDir='row' justifyContent='flex-end'>
                            <CustomImagePicker title={t('choose-images')} onPress={pickImages} />
                        </Div>
                        <Div my={10} flexDir='row' flexWrap='wrap'>
                            {imagePaths && imagePaths.length > 0 && imagePaths.map((uri, index) => (
                                <Div key={index} m={4}>
                                    <Image
                                        source={{ uri }}
                                        w={100}
                                        h={100}
                                        m='auto'
                                        bg='red'
                                    />
                                </Div>
                            ))}
                        </Div>

                        {loading ? <CustomLoading /> : <CustomButton title={t('update')} onPress={() => updatePortfolio(portfolioId)} />}
                    </Div>
                </Modal>
            </Div>
            {/* ----------------------------- update Model End -------------------------------- */}








            {/* ------------------------------ portfolio Show Start------------------------------ */}
            {userPortfolio ?
                (
                    < >
                        {userPortfolio.length > 0 ? (
                            <Div row justifyContent='space-between' flexWrap='wrap'>

                                {userPortfolio.map((item, index) => (
                                    <Portfolio_Item
                                        key={index}
                                        images={item.images}
                                        title={item.title}
                                        link={item.link}
                                        editItem={() => toggleEditModel(item)}
                                        deleteItem={() => handl_delete_portfolio(item)}
                                    />
                                ))}
                            </Div>) : (<Text textAlign='center' py={10} bg='gray200'>{t('no-data-found')}</Text>)}
                    </>
                )
                :
                (
                    <CustomLoading />
                )
            }
            {/* ------------------------------ portfolio Show End------------------------------ */}









        </Div>
    )
}
