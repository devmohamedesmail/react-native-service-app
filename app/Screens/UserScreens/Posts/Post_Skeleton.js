import React from 'react'
import { Skeleton, Div } from 'react-native-magnus'

export default function Post_Skeleton() {
    return (
        <Div flexDir="row" mt="md" my={5} bg="white">
            <Skeleton.Circle h={40} w={40} />
            <Div ml="md" flex={1}>
                <Skeleton.Box mt="sm" />
                <Skeleton.Box mt="sm" w="80%" />
                <Skeleton.Box mt="sm" />
            </Div>
        </Div>
    )
}
