// import React, { useState } from 'react';
// import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import { checkmark } from '../../services/utilities/assets';
// import { appStyles } from '../../services/utilities/appStyles';
// import LinearGradient from 'react-native-linear-gradient'; 
// import { colors } from '../../services/utilities/color';
// const CustomCheckbox = () => {
//   const [isChecked, setIsChecked] = useState(false);
//   const toggleCheckbox = () => {
//     setIsChecked(!isChecked);
//   };
//   const checkboxStyle = {
//     borderColor: isChecked ? 'transparent' : colors.color15,
//   };
//   return (
//     <TouchableOpacity onPress={toggleCheckbox}>
//       <View>
//         <View style={appStyles.checkboxContainer}>
//           {isChecked && (
//             <LinearGradient
//               colors={[colors.color33]} 
//               style={[appStyles.overlay, { borderColor: colors.color33 }]}
        
//               />
//           )}
//           <View style={[appStyles.checkbox, checkboxStyle]}>
//             {isChecked && (
//               <Image
//                 source={checkmark}
//                 style={appStyles.imagetick}
//               />
//             )}
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };
// export default CustomCheckbox;
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { checkmark } from '../../services/utilities/assets';
import { appStyles } from '../../services/utilities/appStyles';
import LinearGradient from 'react-native-linear-gradient'; 
import { colors } from '../../services/utilities/color';

const CustomCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const checkboxStyle = {
    borderColor: isChecked ? 'transparent' : colors.color33,
    backgroundColor: isChecked ? 'green' : 'transparent',
  };

  return (
    <TouchableOpacity onPress={toggleCheckbox}>
      <View>
        <View style={appStyles.checkboxContainer}>
          <View style={[appStyles.checkbox, checkboxStyle]}>
            {isChecked && (
              <Image
                source={checkmark}
                style={appStyles.imagetick}
              />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default CustomCheckbox;
