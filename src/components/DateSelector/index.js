// Import necessary modules
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { calendar } from '../../services/utilities/assets';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateSelector = ({ isVisible, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event, date) => {
    if (date !== undefined) {
      // Do something with the selected date if needed
      setSelectedDate(date);
    }
  };

  return (
    <View
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
          />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black background
  },
  contentContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5, // for Android shadow
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 15,
    color: 'blue', // customize the color as needed
  },
});

export default DateSelector;
