
import React from "react";
import { Div, Image, Text, Button, Icon } from "react-native-magnus";
import Entypo from '@expo/vector-icons/Entypo';
import Swiper from 'react-native-swiper'
import ConfigApi from "../../../../../Config/ConfigApi";
import CustomColors from "../../../../../Config/CustomColors";

export default function Ad_Item({
    image,
    images,
    title,
    author,
    handleSave,
    handleDetails,
    date,
    country,
    type,
  }) {
  return (
    <Div w="49%" bg="white" position="relative" rounded="lg" my={5}>
    <Button onPress={handleDetails} bg="white" p={0}>
      <Swiper showsButtons={false} style={{ height: 150 }} dotColor={CustomColors.secondary} activeDotColor={CustomColors.primary}>
        {images && images.length > 0 ? (
          images.map((item, index) => (
            <Image
              key={index}
              w="100%"
              h={150}
              source={{ uri: `${ConfigApi.API_URL}/public/uploads/ads/${item}` }}  
            />
          ))
        ) : (
          <Image w="100%" h={150} source={{ uri: `${image}` }} />
        )}
      </Swiper>
    </Button>
    <Text position="absolute" px={10} py={3} rounded={10} shadow='lg' bg={CustomColors.secondary} color="white" top={10} left={10}>{type}</Text>
    <Button
      bg="white"
      shadow="md"
      h={35}
      w={35}
      rounded="circle"
      p={0}
      onPress={handleSave}
      position="absolute"
      top={5}
      right={5}
    >
      <Icon name="heart" color="red500" fontSize={10} />
    </Button>
    <Div p={10}>
      <Text fontWeight="bold"> {title} </Text>
      <Text my={5} h={30}> {author}</Text>

      <Div flexDir="row" justifyContent="space-between" alignItems="center">
        <Text fontSize={10}>{date}</Text>
        <Text> {country} <Entypo name="location-pin" size={16} color="black" /> </Text>
      </Div>
    </Div>
  </Div>
  )
}
