import React from 'react'
import { Skeleton, Div } from 'react-native-magnus'

export default function Wishlist_Skeleton() {
    return (
        <Div flexDir="row" mt="md">
            <Skeleton.Circle h={40} w={40} />
            <Div ml="md" flex={1}>
                <Skeleton.Box mt="sm" />
                <Skeleton.Box mt="sm" w="80%" />
                <Skeleton.Box mt="sm" />
            </Div>
        </Div>
    )
}
