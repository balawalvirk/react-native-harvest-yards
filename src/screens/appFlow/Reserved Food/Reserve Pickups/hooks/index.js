import { useRef } from "react";
import RNFS from 'react-native-fs';
import { Alert } from "react-native";
import { usePermissions, useStorage } from "../../../../../services";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import Toast from "react-native-toast-message";

export const useHooks = () => {

    const qrCodeRef = useRef(null)
    const {saveQRCodeToGallery}=useStorage()

    return {
        qrCodeRef,
        saveQRCodeToGallery
    }
}