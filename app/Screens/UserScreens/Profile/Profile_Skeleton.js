import React from 'react'
import { Skeleton, Div } from 'react-native-magnus'

export default function Profile_Skeleton() {
  return (

    <Div flexDir="row" my={10} mt="md">
      <Skeleton.Circle h={40} w={40} />
      <Div ml="md" flex={1}>
        <Skeleton.Box mt="sm" />
        <Skeleton.Box mt="sm" w="80%" />
        <Skeleton.Box mt="sm" />
      </Div>
    </Div>
  )
}
