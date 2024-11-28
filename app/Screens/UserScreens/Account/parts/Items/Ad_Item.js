import React from 'react'
import { Div, Text, Image, Dropdown, Button } from 'react-native-magnus'
import Entypo from '@expo/vector-icons/Entypo';
import { useTranslation } from 'react-i18next';
import Swiper from 'react-native-swiper';
import CustomColors from '../../../../../Config/CustomColors';
import CustomDropdownItem from '../../../../../CustomComponents/CustomDropdownMenu/CustomDropdownItem';
import ConfigApi from '../../../../../Config/ConfigApi';

export default function Ad_Item({ id, image, title, description, handleDelete, handleEdit, images }) {
    const dropdownRef = React.createRef();
    const { t } = useTranslation();
    return (
        <Div bg='white' my={5} p={5}>
            <Swiper showsButtons={false} style={{ height: 200 }} dotColor={CustomColors.secondary} activeDotColor={CustomColors.primary}>
                {images && images.length > 0 ? (
                    images.map((item, index) => (
                        <Image
                            key={index}
                            w="100%"
                            h={200}
                            source={{ uri: `${ConfigApi.API_URL}/public/uploads/ads/${item}` }}  // Assuming the item is a URL
                        />
                    ))
                ) : (
                    <Image w="100%" h={150} source={{ uri: `${image}` }} />
                )}
            </Swiper>
            <Div mx={5}>
                <Text flex={1} fontWeight='bold' >{title} </Text>
                <Text flex={1} fontWeight='semibold' >{description} </Text>
            </Div>

            <Div flexDir='row' justifyContent='flex-end'>

                <Button
                    block
                    bg="gray400"
                    w={35}
                    h={35}
                    mt="sm"
                    p="md"
                    m={10}
                    color="white"
                    onPress={() => dropdownRef.current.open()}>
                    <Entypo name="dots-three-horizontal" size={14} color="black" />
                </Button>

                <Dropdown
                    ref={dropdownRef}
                    mt="md"
                    pb="2xl"
                    showSwipeIndicator={true}
                    roundedTop="xl">
                    <Dropdown.Option py="md" px="xl" block>
                        <CustomDropdownItem title={t('edit')} onPress={() => handleEdit(id)} />
                    </Dropdown.Option>

                    <Dropdown.Option py="md" px="xl" block>
                        <CustomDropdownItem title={t('delete')} bg='red500' onPress={() => handleDelete(id)} />
                    </Dropdown.Option>


                </Dropdown>
            </Div>
        </Div>
    )
}
