import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default function () {

    const requestStoragePermission = async () => {
        try {
            let storagePermission;

            if (Platform.OS === 'android') {
                storagePermission = await requestAndroidStoragePermission();
            } else if (Platform.OS === 'ios') {
                storagePermission = await requestIOSStoragePermission();
            }
            console.log('storagePermission: ',storagePermission)

            if (storagePermission === RESULTS.GRANTED) {
                console.log('Storage permission granted.');
                return true
            } else {
                console.log('Storage permission denied.');
                return null
            }
        } catch (error) {
            console.error('Error requesting storage permission:', error);
        }
    };

    // const requestAndroidStoragePermission = async () => {
    //     return request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    // };
    const requestAndroidStoragePermission = async () => {
        if (Platform.Version < 30) {
          // Request WRITE_EXTERNAL_STORAGE permission for Android versions before 11
          return request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        } else {
          // No need to request explicit permission for scoped storage on Android 11 and later
          return RESULTS.GRANTED;
        }
      };

    const requestIOSStoragePermission = async () => {
        return request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    };

    return {
        requestStoragePermission
    }
}