import AsyncStorage from '@react-native-community/async-storage'
const createDevice = async (url, parm) => {
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": 'T9JqxfID9JrymGldV4rPKVrRi16M0nWFoVyDb2yGw3mM8xbw7UGlW0dhKPK8',
                "Content-Type": "application/json"
            },
            body: parm
        });
        let responseJson = await response.json();
        if (responseJson.status == 200) {
            AsyncStorage.setItem('@DeviceInfo', JSON.stringify(responseJson.msg));
            return responseJson;
        } else {
            return undefined;
        }
    } catch (error) {
        console.log(error)
        return undefined;
    }
}

export default createDevice;