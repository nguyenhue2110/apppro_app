import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions, } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Logo from '../images/LYRECO.png'
import E_approIC from '../images/e-appro.png'
import logoutIC from '../images/logout.png'

import styles from '../style'

const { width, height } = Dimensions.get('window');
export default class WelcomeScreen extends React.Component {
    logout = () => {
        AsyncStorage.removeItem('@MyAccount:key');
        AsyncStorage.removeItem('@AuthKey:key');
        AsyncStorage.removeItem('@SaveAccount');
        this.props.navigation.navigate('Login');
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={Logo} style={{ width: width, height: height / 3 }}></Image>
                </View>
                <View style={[styles.body]}>
                    <View style={[styles.header, { flex: 2, justifyContent: 'flex-end' }]}>
                        <Text style={[styles.textTitle]}>Bienvenue dans</Text>
                        <Text style={{ color: '#2d2e87', fontFamily: 'GothamBook' }}>I'application d'installation des capteurs</Text>
                    </View>
                    <View style={[styles.body]}>
                        <Image source={E_approIC} style={{ width: 492 / 3, height: 215 / 3 }} />
                    </View>
                </View>
                <View style={[styles.footer, { height: height / 3 }]}>
                    <View style={[styles.body, { width: '100%' }]}>
                        <TouchableOpacity style={[styles.btnTouchable, { width: '65%' }]}
                            onPress={() => {
                                this.props.navigation.navigate('QRcode')
                            }}>
                            <Text style={[styles.titleBtn, { color: '#fff', fontSize: 25 }]}>ENTRER</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={this.logout}>
                        <Image source={logoutIC} style={{ width: width * 0.15, height: width * 0.15 }} />
                    </TouchableOpacity>
                    <Text></Text>
                </View>
            </View>
        )
    }
}

