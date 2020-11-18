import React from 'react'
import {
    View, Text,
    TouchableOpacity, Dimensions,
    ScrollView, TextInput, Image, Alert, ActivityIndicator, Modal, PermissionsAndroid
} from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import AsyncStorage from '@react-native-community/async-storage'
import Logo from '../images/LYRECO.png'
import styles from '../style'
import global from '../global'
import loginApi from '../api/LoginApi'
import { CirclesLoader } from 'react-native-indicator'
import permissionsApp from '../api/permissionApp'
const { width, height } = Dimensions.get('window');
export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            autoConnect: false,
            modalVisible: false,
            animating: false
        }
    }

    async componentDidMount() {
        let permission = await permissionsApp()
        const bool = JSON.parse(await AsyncStorage.getItem("@autoConnect:"))
        this.setState({ autoConnect: bool })
        if (this.state.autoConnect == true) {
            const account = JSON.parse(await AsyncStorage.getItem("@SaveAccount"))
            if (account !== null) {
                this.setState({ email: account.email })
                this.setState({ password: account.password })
                this.login()
            }
        }
    }

    login = () => {
        const { email, password } = this.state;
        if (email.length <= 0 || password.length <= 0) {
            // Alert.alert('Attention', 'Veuillez saisir votre compte et votre mot de passe !')
            this.props.navigation.navigate('HomePage')

        } else {
            this.setState({ modalVisible: true })
            const params = { email: email, password: password }
            loginApi(`${global.url_login}`, params).then(
                data => {
                    if (data !== null && data !== undefined) {
                        this.setState({ modalVisible: false })
                        const account = { email, password }
                        AsyncStorage.setItem("@SaveAccount", JSON.stringify(account))
                        this.props.navigation.navigate('HomePage')
                    } else {
                        this.setState({ modalVisible: false })
                        Alert.alert('Attention !', 'Compte ou mot de passe incorrect. Saisir à nouveau');
                    }
                }
            )
        }
    }

    autoConnect = async () => {
        await this.setState({ autoConnect: !this.state.autoConnect })
        await AsyncStorage.setItem("@autoConnect:", JSON.stringify(this.state.autoConnect))
        const account = { email: this.state.email, password: this.state.password }
        AsyncStorage.setItem("@SaveAccount", JSON.stringify(account))
    }

    render() {
        return (
            <ScrollView>
                {/* logo company */}
                <View style={styles.header}>
                    <Image source={Logo} style={{ width: width, height: height / 3 }}></Image>
                </View>
                {/* form input login in here */}
                <View style={styles.body}>
                    {/* input email */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.titleInput}>Identifiant:</Text>
                        <TextInput
                            style={styles.textInput}
                            value={this.state.email}
                            autoCapitalize='none'
                            onChangeText={(email) => this.setState({ email: email })}>
                        </TextInput>
                    </View>
                    {/* input password */}
                    <View style={styles.inputGroup}>
                        <Text style={[styles.titleInput]}>Mot de passe:</Text>
                        <TextInput
                            style={styles.textInput}
                            secureTextEntry={true}
                            autoCapitalize='none'
                            value={this.state.password}
                            onChangeText={(password) => this.setState({ password: password })}>
                        </TextInput>
                    </View>
                    <View style={[styles.inputGroup, { flexDirection: 'row', alignItems: 'center' }]}>
                        <CheckBox
                            onValueChange={this.autoConnect}
                            value={this.state.autoConnect}></CheckBox>
                        <Text style={{ color: '#2d2e87', fontFamily: 'GothamMedium' }}>Connexion automatique</Text>
                    </View>
                </View>
                <View style={[styles.footer, { height: height / 3 }]}>
                    <View style={[styles.header, { justifyContent: 'flex-end' }]}>
                        <Text style={[styles.titleInput, { fontSize: 15, letterSpacing: 0 }]}>CRÉER OU RÉINITIALISER MON MOT DE PASSE</Text>
                    </View>

                    {/* button login */}
                    <View style={[styles.footer, { width: '100%' }]}>
                        <TouchableOpacity style={[styles.btnTouchable, { width: '65%', flexDirection: 'row' }]}
                            onPress={this.login}
                            disabled={this.state.animating}>
                            <Text style={{ color: '#fff', fontSize: 25, fontFamily: 'GothamMedium' }}>SE CONNECTER</Text>
                            <ActivityIndicator
                                animating={this.state.animating}
                                size="small"
                                color="#fff"
                                style={{ display: this.state.animating ? 'flex' : 'none', marginLeft: 15 }} >
                            </ActivityIndicator>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}>
                    <View style={{ backgroundColor: '#33333333', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <CirclesLoader
                            size={50}
                            color="green"
                            dotRadius={8}>
                        </CirclesLoader>
                    </View>
                </Modal>
            </ScrollView>
        )
    }
}