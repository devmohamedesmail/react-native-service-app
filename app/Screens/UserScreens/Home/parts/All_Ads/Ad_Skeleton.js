import React from 'react'
import { Text, Skeleton, Div } from 'react-native-magnus'

export default function Ad_Skeleton() {
    return (
        <Div flexDir="row" mt="md" w='50%'>
            <Div ml="md" flex={1}>
                <Skeleton.Box mt="sm" h={100} />
                <Skeleton.Box mt="sm" w="80%" />
                <Skeleton.Box mt="sm" />
            </Div>
        </Div>
    )
}
