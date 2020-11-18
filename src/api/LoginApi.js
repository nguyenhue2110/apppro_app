import AsyncStorage from '@react-native-community/async-storage';

const loginApi = async(url, param) => {
    try {
        const body = new FormData();
        body.append('email', param.email.toString());
        body.append('password', param.password.toString());

        let response = await fetch(url, {
            method: 'POST',
            body: body
        });
        let responseJson = await response.json();
        if(responseJson.status === 200) {
            AsyncStorage.setItem('@AuthKey:key', JSON.stringify(responseJson.msg.token));
            AsyncStorage.setItem('@MyAccount:key', JSON.stringify(Object.assign(responseJson, {'password': param.password.toString()})));
            return responseJson;
        }else {
            return null;
        }
    } catch (error) {}
}
export default loginApi;