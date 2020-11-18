import AsyncStorage from '@react-native-community/async-storage'

const postApi = async (url, params) => {
    try {
        const token = await AsyncStorage.getItem('@AuthKey:key');
        let response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(token),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
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
export default postApi;