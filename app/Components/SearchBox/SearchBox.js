import React,{useState} from 'react'
import { Input, Icon } from 'react-native-magnus'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import CustomColors from '../../Config/CustomColors';


export default function SearchBox() {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const navigation = useNavigation();
    const handleSearchSubmit = () => {
        navigation.navigate('Search', { query });
    };
    return (
        <Input
            placeholder={t('search-placeholder')}
            p={10}
            h={50}
            bg={CustomColors.white}
            w="100%"
            mt={20}
            value={query}
            onChangeText={(text) => setQuery(text)}
            focusBorderColor={CustomColors.secondary}
            suffix={<Icon name="search" color="gray900" fontFamily="Feather" />}
            onSubmitEditing={handleSearchSubmit} // Trigger search on Enter
            returnKeyType="search"
        />
    )
}
