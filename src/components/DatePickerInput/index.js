import React, {useState} from 'react';
import {View, TextInput, Text, Image, Modal} from 'react-native';
import {appStyles} from '../../services/utilities/appStyles';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import DatePicker from '@react-native-community/datetimepicker';
import {colors} from '../../services/utilities/color';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {fontFamily, fontSize} from '../../services/utilities/fonts';
import moment from 'moment';

const DatePickerInput = ({
  label,
  inputWidth,
  source,
  inputHeight,
  inputBackgroundColor,
  responsiveMarginTop = 1,
  customWidth,
  custommarginleft,
  rowReverse,
  showImage,
  source1,
  onpress,
  onImgPress,
  customTextInputMarginRight,
  borderRadius,

  error,
  selectedDate,
  onDateChange,
}) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleDateChange = (event, selectedPickedDate) => {
    if (selectedPickedDate) {
      onDateChange(selectedPickedDate);
      setDatePickerVisible(false);
    }
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
      ]}>
      <Text style={appStyles.label}>{label}</Text>
      <TouchableOpacity
        onPress={() => setDatePickerVisible(true)}
        style={[
          appStyles.inputView,
          {
            width: inputWidth || responsiveWidth(90),
            height: inputHeight || responsiveHeight(7),
            backgroundColor:
              inputBackgroundColor || appStyles.inputView.backgroundColor,
            flexDirection: rowReverse ? 'row-reverse' : 'row',
            borderRadius: borderRadius || responsiveWidth(3.2), // Apply the custom border radius
          },
        ]}>
     

        {selectedDate ? (
          <Text style={{color: colors.color18}}>
             {' ' + moment(selectedDate).format('YYYY/MM/DD')}
          </Text>
        ) : (
          <Text style={{color: colors.color29,marginLeft:responsiveWidth(2.5)}}>Select a date--</Text>
        )}
        {showImage && (
          <TouchableOpacity  onPress={() => setDatePickerVisible(true)}>
            <Image source={source1} style={[appStyles.uploadimage,{marginLeft:responsiveWidth(59)}]} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {error && <Text style={{color: colors.color32}}>{error}</Text>}
      {/* Date Picker Modal */}
      {isDatePickerVisible && (
        <DatePicker
          value={selectedDate || new Date()} // Set an initial date value
          mode="date"
          display="calendar"
          maximumDate={new Date()}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default DatePickerInput;
