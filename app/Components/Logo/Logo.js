import React from 'react'
import { Image, Div } from "react-native-magnus";
import { useTranslation } from 'react-i18next';

export default function Logo({h,w}) {
  const { t,i18n } = useTranslation();
  return (
    <Div>
    <Image
        h={h}
        w={w}
        m='auto'
        bg="transparent"
        source={i18n.language === 'ar' ? require('./logo-ar.png') : require('./logo-en.png')}
    />
</Div>
  )
}
