import React, { useContext, useState } from 'react'
import { Avatar, Icon, Div, Text, Image, Button } from 'react-native-magnus';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useTranslation } from 'react-i18next';
import Modal from "react-native-modal";
import CustomButton from '../../../../CustomComponents/CustomButton';
import CustomImagePicker from '../../../../CustomComponents/CustomImagePicker';
import CustomInput from '../../../../CustomComponents/CustomInput';
import CustomLoading from '../../../../CustomComponents/CustomLoading';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import ConfigApi from '../../../../Config/ConfigApi';
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomColors from '../../../../Config/CustomColors';
import { AuthContext } from '../../../../Context/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Basic_Info({auth}) {

    const { t } = useTranslation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [imagePath, setImagePath] = useState(null);
    const [name, setName] = useState(auth.user.name);
    const [phone, setPhone] = useState(auth.user.phone);
    const [address, setAddress] = useState(auth.user.address);
   




    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };




    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Permission to access media library is required!');
            return;
        }

        // Open the image picker for a single image
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            const imageName = imageUri.split('/').pop(); // Extract the image name

            setImage(imageName); // Store the image name
            setImagePath(imageUri); // Store the image URI
        } else {
            console.log('Image selection cancelled');
        }
    };





    const update_info = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('phone', phone);
            formData.append('address', address);

            // Check if an image is selected and append it to formData
            if (image && imagePath) {
                const extension = imagePath.split('.').pop();
                const fileType = `image/${extension}`;

                formData.append('image', {
                    uri: imagePath,
                    type: fileType,
                    name: image,
                });
            }

            // Send data to the server using Axios
            const response = await axios.post(`${ConfigApi.API_URL}/api/update/user/${auth.user.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });


            setLoading(false);
            setModalVisible(false);
            Toast.show({
                type: 'success',
                text1: `${t('updated')}`,
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
        }finally {
            setLoading(false);
        }
    };


    return (
        <Div>
            <Div>
                {auth && auth.user.image ? (
                    <Image
                        h={100}
                        w={100}
                        m='auto'
                        rounded="circle"
                        source={{
                            uri:
                                `${ConfigApi.API_URL}/public/uploads/users/${auth.user.image}`,
                        }}
                    />
                ) : (
                    <Image
                        h={100}
                        w={100}
                        m='auto'
                        rounded="circle"
                        source={require('./user.png')}
                    />
                )}


            </Div>

            <Text fontWeight='bold' textAlign='center' mt={10} mb={30}>{auth.user.name}</Text>

            <Div flexDir='row' justifyContent='flex-start' mb={10}>
                <Text w={30} >
                    <FontAwesome name="envelope-o" size={20} color="black" />
                </Text>
                <Text mx={10} fontWeight='semibold'>{auth.user.email}</Text>
            </Div>

            <Div flexDir='row' justifyContent='flex-start' mb={10}>
                <Text w={30} >
                    <Feather name="phone" size={20} color="black" />
                </Text>
                <Text mx={10} fontWeight='semibold'>{auth.user.phone ? auth.user.phone : t('no-phone')}</Text>
            </Div>

            <Div flexDir='row' justifyContent='flex-start' mb={10}>
                <Text w={30} >
                    <EvilIcons name="location" size={20} color="black" />
                </Text>
                <Text mx={10} fontWeight='semibold'>{auth.user.address ? auth.user.address : t('no-address')}</Text>
            </Div>


            
            <Div flexDir='row' justifyContent='flex-end'>
               <Button onPress={toggleModal} bg={CustomColors.secondary}>
                  <AntDesign name="edit" size={24} color="white" />
               </Button>
            </Div>







            <Div >
                <Modal isVisible={isModalVisible} animationIn="zoomIn" animationInTiming={700} animationOut="zoomOut">
                    <Div bg='white' py={10} px={10}>
                        <Div row justifyContent='flex-end'>
                            <Button bg="red700" h={40} w={40} rounded="circle" onPress={toggleModal}>
                                <Feather name="x" size={12} color="white" />
                            </Button>
                        </Div>

                        <CustomInput value={name} placeholder={t('name')} onChangeText={(text) => setName(text)} />
                        <CustomInput value={phone} placeholder={t('phone')} onChangeText={(text) => setPhone(text)} />
                        <CustomInput value={address} placeholder={t('address')} onChangeText={(text) => setAddress(text)} />

                        <Div>
                            <CustomImagePicker onPress={pickImage} />
                        </Div>

                        {imagePath && (
                            <Div m={4} alignItems="center">
                                <Image
                                    source={{ uri: imagePath }}
                                    style={{ width: 150, height: 150, borderRadius: 10 }}
                                />
                            </Div>
                        )}


                        {loading ? <CustomLoading /> : <CustomButton title={t('update')} onPress={() => update_info()} />}
                    </Div>
                </Modal>
            </Div>















        </Div>
    )
}
