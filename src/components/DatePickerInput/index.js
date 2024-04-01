import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { appStyles } from '../../../src/services/utilities/appStyles';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { colors } from '../../services/utilities/color';

const MonthYearPicker = ({
  label,
  inputWidth,
  source,
  inputHeight,
  onChangeText,
  inputBackgroundColor,
  responsiveMarginTop = 1,
  customImageMarginRight,
  customWidth,
  custommarginleft,
  rowReverse,
  placeholderTextColor = colors.color29,
  borderRadius,
  error,
}) => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  const handleMonthChange = (monthIndex) => {
    setMonth(monthIndex);
    onChangeText(`${months[monthIndex]} ${year}`);
  };

  const handleYearChange = (selectedYear) => {
    setYear(selectedYear);
    onChangeText(`${months[month]} ${selectedYear}`);
  };

  return (
    <View
      style={[
        appStyles.inputmainview,
        {
          marginTop: responsiveHeight(responsiveMarginTop),
          width: customWidth,
          marginLeft: custommarginleft,
        },
      ]}
    >
      <Text style={appStyles.label}>{label}</Text>
      <View
        style={[
          appStyles.inputView,
          {
            width: inputWidth || responsiveWidth(90),
            height: inputHeight || responsiveHeight(7),
            backgroundColor: inputBackgroundColor || appStyles.inputView.backgroundColor,
            flexDirection: rowReverse ? 'row-reverse' : 'row',
            borderRadius: borderRadius || responsiveWidth(3.2),
          },
        ]}
      >
        {source ? (
          <Image
            source={source}
            style={[appStyles.Email, { marginRight: customImageMarginRight }]}
          />
        ) : (
          <View
            style={{
              marginLeft: responsiveWidth(3),
              marginRight: customImageMarginRight,
            }}
          />
        )}

        <Picker
          selectedValue={month}
          onValueChange={(itemValue) => handleMonthChange(itemValue)}
          style={{ flex: 0.55 }}
        >
          {month === '' ? <Picker.Item label={'Month'} value="" color={placeholderTextColor} /> : null}
          {months.map((month, index) => (
            <Picker.Item key={index} label={month} value={index} />
          ))}
        </Picker>
        <Picker
          selectedValue={year}
          onValueChange={(itemValue) => handleYearChange(itemValue)}
          style={{ flex: 0.45 }}
        >
          {year === '' ? <Picker.Item label={'Year'} value="" color={placeholderTextColor} />: null}
          {years.map((y) => (
            <Picker.Item key={y} label={y.toString()} value={y} color={colors.color35} />
          ))}
        </Picker>
      </View>
      {error && (
        <Text style={{ color: colors.color32 }}>{error}</Text>
      )}
    </View>
  );
};

export default MonthYearPicker;

