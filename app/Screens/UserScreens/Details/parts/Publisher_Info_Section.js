import React from 'react'
import { Button, Div, Image, Text } from 'react-native-magnus'
import ConfigApi from '../../../../Config/ConfigApi'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import CustomColors from '../../../../Config/CustomColors'

export default function Publisher_Info_Section({ adDetails }) {
    const { t } = useTranslation();
    const navigation = useNavigation();
    return (
        <Div>
            <Div flexDir='row' alignItems='center'>
                <Div>

                    {adDetails.user.image ? (
                        <Image
                            h={50}
                            w={50}
                            m={10}
                            borderColor='red'
                            rounded="circle"
                            source={{
                                uri: `${ConfigApi.API_URL}/public/uploads/users/${adDetails.user.image}`
                            }}
                        />
                    ) : (
                        <Image
                            h={50}
                            w={50}
                            m={10}
                            bg='gray300'
                            borderColor='red'
                            rounded="circle"
                            source={require('../user.png')}
                        />
                    )}
                </Div>
                <Div flexDir='row' alignItems='center' justifyContent='space-between'>
                    <Div >
                        <Text fontWeight='bold'>{adDetails.user.name}</Text>
                        <Text fontSize={10}>{moment(adDetails.user.created_at).fromNow()}</Text>
                    </Div>
                    <Button 
                       onPress={()=>navigation.navigate('Profile', {id: adDetails.user.id})}
                       bg={CustomColors.secondary} 
                       my={10} mx={20}>{t('visit-profile')}</Button>
                </Div>
            </Div>
        </Div>
    )
}
