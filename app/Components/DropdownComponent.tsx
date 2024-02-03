

import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useState } from 'react'

import { Dropdown } from 'react-native-element-dropdown'

import * as Icon from "react-native-feather"
import { COLORS } from '../Constants/Colors'
import { FONTS } from '../Constants/Font'

type ItemType = {
  label: string;
  value: string;
}

type PropsType = {
  data: ItemType[];
  label: string;
  onChangeValue: (value: string | null) => void;
  placeholder: string
}


const DropdownComponent: FC<PropsType> = ({ data, label, onChangeValue, placeholder }) => {

  const [value, setValue] = useState<String | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          className="absolute left-[22] top-[4] z-[999] px-[7] bg-white"
          style={{ color: isFocus ? COLORS.primary : COLORS.black, fontFamily: FONTS.Regular, fontSize: 12 }}>
          {label}
        </Text>
      );
    }
    return null;
  };

  return (
    <View className="bg-white py-3">
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: COLORS.secondary }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder="Search..."
        value={`${value}`}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          onChangeValue(item.value);
        }}
        renderLeftIcon={() => (
          <View className="h-5 mr-2">
            {
              value ?
                <Icon.Check color={COLORS.secondary} strokeWidth={3} width={20} height={20} /> :
                <Icon.XCircle color='gray' strokeWidth={3} width={20} height={20} />
            }

          </View>
        )}
      />
    </View>
  );
}

export default DropdownComponent


const styles = StyleSheet.create({

  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },

  placeholderStyle: {
    fontSize: 14,
    fontFamily: FONTS.Regular,
    color: COLORS.black,
    opacity: 0.5
  },

  selectedTextStyle: {
    fontSize: 16,
    fontFamily: FONTS.Regular
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: FONTS.Regular
  },
});