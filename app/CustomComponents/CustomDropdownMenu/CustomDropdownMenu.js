import React from 'react'
import { useTranslation } from 'react-i18next';
import CustomDropdownItem from './CustomDropdownItem';
import { Div,Button,Dropdown } from 'react-native-magnus';
import CustomColors from '../../Config/CustomColors';

export default function CustomDropdownMenu({items,displayKey,selectedItem,onPress = () => { },selectoption}) {

  const { t } = useTranslation();
  const dropdownRef = React.createRef();
  const handleSelect = (item) => {
      dropdownRef.current.close();
      onPress(item);
  };
  return (
    <Div my={5}>
    <Button
        block
        bg={CustomColors.primary}
        mt="sm"
        p="sm"
        h={45}
        color="white"
        fontWeight="semibold"
        onPress={() => dropdownRef.current.open()}
    >
        {selectedItem ? selectedItem : selectoption}
    </Button>

    <Dropdown
        ref={dropdownRef}
        mt="md"
        pb="2xl"
        w='96%'
        showSwipeIndicator={true}
        roundedTop="xl"
    >

        {items.map((item) => (
            <CustomDropdownItem title={item[displayKey]} onPress={() => handleSelect(item)} key={item.id} />
        ))}

    </Dropdown>
</Div>
  )
}
