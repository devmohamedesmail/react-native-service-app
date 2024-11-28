import React from 'react'
import { Skeleton, Div } from 'react-native-magnus'

export default function Category_Skeleton() {
  return (
    <Div flexDir="row" mt="md" my={20} w='30%'>
      <Div ml="md" flex={1}>
        <Skeleton.Box mt="sm" h={40} />
        <Skeleton.Box mt="md" w="80%" />  
      </Div>
    </Div>
  )
}
