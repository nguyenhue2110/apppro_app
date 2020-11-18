import AsyncStorage from '@react-native-community/async-storage'

const getApi = async (url) => {
    try {
        const token = await AsyncStorage.getItem('@AuthKey:key');
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(token)
            }
        });
        if (response.status === 200) {
            let responseJson = await response.json();
            if (responseJson.status === 200) {
                return responseJson;
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (error) {
        console.log(error)
        return null;
    }
}
export default getApi;