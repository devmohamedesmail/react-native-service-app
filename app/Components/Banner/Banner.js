import React, { Component } from "react";
import { Div, Image } from "react-native-magnus";

import Swiper from "react-native-swiper";
import CustomColors from "../../Config/CustomColors";

export default function Banner() {
  return (
    <Div overflow="hidden" my={10}>
      <Swiper style={{ height: 200 }} autoplayTimeout={4000} autoplay dotColor={CustomColors.primary} activeDotColor={CustomColors.secondary} showsButtons={false}>
        <Div w="100%" h={200} bg="red">
          <Image w='100%' h='100%' source={require("./banner1.jpg")} />
        </Div>
        <Div w="100%" h={200}>
          <Image w='100%' h='100%' source={require("./banner2.jpg")} />
        </Div>
      </Swiper>
    </Div>
  )
}
