import React from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import styles from '../style'
import qrcodeIC from '../images/qrcode.png'

const { width, height } = Dimensions.get('window');
export default class QRCodeScreen extends React.Component {
    render() {
        return (
            <View style={[styles.container]}>
                <View style={styles.header}>
                    <Text style={[styles.textTitle, { letterSpacing: 0, textAlign: 'center' }]}>Merci de bien vouloir{`\n`}scanner le QRcode</Text>
                    {/* <Text style={{ color: '#2d2e87', fontSize: 16, fontFamily: 'GothamLight' }}>Qui se trouve au dos de votre capteur</Text> */}
                </View>
                <View style={[styles.body, { flex: 2 }]}>
                    <View style={[styles.body]}>
                        <Image source={qrcodeIC} style={{ width: 300, height: 300}} />
                    </View>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={[styles.btnTouchable, { width: '60%' }]}
                        onPress={() => {
                            this.props.navigation.navigate('Scanner')
                        }}>
                        <Text style={[styles.titleBtn]}>SCANNER</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}