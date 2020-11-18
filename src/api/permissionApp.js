import { PermissionsAndroid } from 'react-native';

async function permissionsApp() {
    try {
        const camera = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA 
        );
        const write = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE 
        );
        const read = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE 
        );
        const audio = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        );
    } catch (error) {
        console.log(error)
    }
}

export default permissionsApp