import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  ScrollView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from '../../services/utilities/color';

const SelectOptionPicker = ({
  value,
  toggleModel,
  label,
  data,
  activeItem,
  Selected,
}) => {
  const [on, setOn] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [selctorFlag, setSelctorFlag] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (value) {
      handleItemClick();
    }
  }, [value]);

  const handleItemClick = () => {
    if (activeItem) {
      let index = dataList.findIndex(d => d.label === activeItem);
      console.log(index, activeItem);
      setSelctorFlag(index);
    } else {
      setSelctorFlag(0);
    }
  };

  const Dummydata = [
    {
      label: 'Emotional',
    },
    {
      label: 'Financial',
    },
    {
      label: 'Intellectual',
    },
    {
      label: 'Physical',
    },
    {
      label: 'Professional',
    },
    {
      label: 'Relational',
    },
    {
      label: 'other',
    },
  ];

  const dataList = data ? data : Dummydata;

  return (
    <Modal
      animationType="fade"
      onRequestClose={() => {
        Keyboard.dismiss(), toggleModel();
      }}
      transparent={true}
      visible={value}>
      <Pressable
        onPress={() => {
          toggleModel(), Keyboard.dismiss();
        }}
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        ]}>
        <View style={[styles.modalView]}>
          <Text
            style={{
              fontSize: responsiveHeight(2.5),
              fontWeight: '700',
              color: 'black',
              // height: 20,
              textAlign: 'center',
              paddingVertical: 5,
            }}>
            {label ? label : 'Select'}
          </Text>

          <ScrollView style={{}}>
            {dataList.map((item, index) => {
              return (
                <TouchableOpacity
                  style={{
                    paddingVertical: responsiveWidth(2),
                    marginHorizontal: responsiveWidth(4),
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor:
                      selctorFlag == index ? colors.color18 : colors.color7,
                    borderRadius: responsiveWidth(3),
                    // borderBottomWidth: 0.4,
                    // borderBottomColor: "grey",
                  }}
                  key={index}
                  onPress={() => {
                    setSelect(item.label);
                    setSelctorFlag(index);
                    // Done
                    Selected(item.label);
                    toggleModel();
                  }}>
                  {/* <Icon
                    style={{
                      marginHorizontal: responsiveWidth(4),
                    }}
                    name={
                      selctorFlag == index
                        ? 'radio-button-on'
                        : 'radio-button-off'
                    }
                    type={'material'}
                    size={responsiveWidth(8)}
                    color={selctorFlag == index ? 'white' : colors.color17}
                  /> */}
                  <Text
                    style={{
                      color:
                        selctorFlag == index ? colors.color7 : colors.color17,
                      fontSize: 16,
                      fontWeight: '600',
                      marginHorizontal: responsiveWidth(2),
                    }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    // flex: 1,
    overflow: 'hidden',
    alignSelf: 'center',
    // alignItems: "center",
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 10,
    // paddingTop: 10,
    // maxHeight: hp(70),
    width: responsiveWidth(90),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  labelStyle: {
    fontSize: 13,
    paddingRight: 20,
    zIndex: 0,
    // marginTop: 5,
  },
  txt: {
    fontSize: 17,
    fontWeight: '500',
  },
  txt1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.blueText,
  },
});

export default SelectOptionPicker;
