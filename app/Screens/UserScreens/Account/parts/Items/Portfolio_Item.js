import React from 'react'
import { Button, Dropdown, Div, Image, Text, Icon } from 'react-native-magnus'
import Entypo from '@expo/vector-icons/Entypo';
import CustomDropdownItem from '../../../../../CustomComponents/CustomDropdownMenu/CustomDropdownItem';
import { useTranslation } from 'react-i18next';
import Swiper from 'react-native-swiper';
import CustomColors from '../../../../../Config/CustomColors';
import ConfigApi from '../../../../../Config/ConfigApi';
import { Linking } from 'react-native';

export default function Portfolio_Item({ image, title, editItem, deleteItem, link, images }) {
    const dropdownRef = React.createRef();
    const { t } = useTranslation();
    const handleDropdownCloseAndExecute = (func) => {
        dropdownRef.current.close();
        func();
    };



    const handleOpenURL = () => {
        if (link) {
          Linking.openURL(link).catch((err) => console.error("Failed to open URL:", err));
        }
      };



    return (
        <Div w='49%' mb={1}  bg="white"  rounded='md'>

            <Swiper style={{ height: 150 }} showsButtons={false} dotColor={CustomColors.primary} activeDotColor={CustomColors.secondary}>
                {images.map((image, index) => (

                    <Image
                        key={index}
                        h={150}
                        w='100%'
                        m={0}
                        rounded="md"
                        source={{
                            uri: `${ConfigApi.API_URL}/public/uploads/portfolio/${image}`,
                        }}
                    />

                ))}
            </Swiper>


            <Text fontSize={14} px={5}  py={7}>
                {title}
            </Text>




            <Div mb={10} px={10}>

                {link ?
                    <Button
                        onPress={handleOpenURL}
                        block
                        suffix={
                            <Icon
                                position="absolute"
                                right={8}
                                name="arrowright"
                                color="white"
                            />
                        }
                        bg={CustomColors.secondary}
                        py={7}
                        color="white"
                        rounded="circle"
                        fontSize={13}
                        mt="lg">
                        {t('show')}
                    </Button>
                    :
                    <Button
                        block
                        suffix={
                            <Icon
                                position="absolute"
                                right={8}
                                name="arrowright"
                                color="white"
                            />
                        }
                        bg="gray600"
                        py={7}
                        color="white"
                        rounded="circle"
                        fontSize={13}
                        mt="lg">

                        {t('show')}
                    </Button>}
            </Div>


            <Div flexDir='row' justifyContent='flex-end' m={5}>
                <Button
                    block
                    w={30}
                    h={30}
                    bg="gray400"
                    mt="sm"
                    p="md"
                    color="white"
                    onPress={() => dropdownRef.current.open()}>
                    <Entypo name="dots-three-vertical" size={13} color="black" />
                </Button>
                <Dropdown
                    ref={dropdownRef}
                    mt="md"
                    pb="2xl"
                    showSwipeIndicator={true}
                    roundedTop="xl">
                    <Dropdown.Option py="md" px="xl" block>
                        <CustomDropdownItem
                            title={t('edit')}
                            bg="green500"
                            onPress={() => handleDropdownCloseAndExecute(editItem)} />
                    </Dropdown.Option>
                    <Dropdown.Option py="md" px="xl" block>
                        <CustomDropdownItem
                            title={t('delete')}
                            bg="red500"
                            onPress={() => handleDropdownCloseAndExecute(deleteItem)}
                        />
                    </Dropdown.Option>


                </Dropdown>
            </Div>
        </Div>
    )
}
