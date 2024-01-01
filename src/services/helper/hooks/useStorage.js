import { useRef } from "react";
import RNFS from 'react-native-fs';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import Toast from "react-native-toast-message";

export default function () {


    const saveQRCodeToGallery = async (qrRef) => {
        try {
            // Generate QR code data URL
            console.log('qrCodeRef.current: ', qrRef.current)
            qrRef.current.toDataURL(async (qrCodeDataURL) => {
                console.log('qrCodeDataURL: ', qrCodeDataURL)
                // Get the base64 content from the data URL
                // const base64Content = qrCodeDataURL.split(',')[1];
                // __DEV__ && console.log('base64Content: ', base64Content)

                // Create a file path in the app's cache directory
                const cachePath = RNFS.CachesDirectoryPath;
                __DEV__ && console.log('cachePath: ', cachePath)

                const qrCodeImageName=generateQRCodeImageName()
                const filePath = `${cachePath}/${qrCodeImageName}`;
                __DEV__ && console.log('filePath: ', filePath)


                // Write the base64 content to a file
                await RNFS.writeFile(filePath, qrCodeDataURL, 'base64')
                    .then((success) => {
                        return CameraRoll.saveToCameraRoll(filePath, 'photo')
                    })
                    .then(() => {
                        Toast.show({
                            type: 'success',
                            text1: 'Downloaded',
                            text2: 'Qr code saved to gallery',
                        });
                    })
                    ;


                console.log('QR code saved to gallery:', filePath);
            });


        } catch (error) {
            console.error('Error saving QR code to gallery:', error);
        }
    };

    const generateQRCodeImageName = () => {
        const currentDate = new Date();
        
        const year = currentDate.getFullYear();
        const month = (`0${currentDate.getMonth() + 1}`).slice(-2);
        const day = (`0${currentDate.getDate()}`).slice(-2);
        
        const hours = (`0${currentDate.getHours()}`).slice(-2);
        const minutes = (`0${currentDate.getMinutes()}`).slice(-2);
        const seconds = (`0${currentDate.getSeconds()}`).slice(-2);
        
        const datePart = `${year}-${month}-${day}`;
        const timePart = `${hours}${minutes}${seconds}`;
        
        const imageName = `${datePart}_${timePart}_qrcode.png`;
        
        return imageName;
      };

  

    return {
        saveQRCodeToGallery
    }
}