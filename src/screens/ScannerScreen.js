import React from 'react'
import {
    View, Text,
    Dimensions,
    TouchableOpacity,
    Alert, Animated,
    Easing, ScrollView, ToastAndroid
} from 'react-native'
import { RNCamera } from 'react-native-camera'
import styles from '../style'
import { TextLoader } from 'react-native-indicator'
const { width, height } = Dimensions.get('window')
export default class ScannerScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            animated: new Animated.Value(0),
        }
    }

    componentDidMount() {
        this.moveAnimation()
    }

    moveAnimation = () => {//component di chuyen
        Animated.timing(this.state.animated, {
            toValue: (height / 2) * 0.88,
            duration: 2000,
        }).start(() => {
            //call after finish this animation
            Animated.timing(this.state.animated, {
                toValue: 0,
                duration: 2000,
            }).start(() => {
                this.moveAnimation()
            });
        });
    }

    onScan = (e) => {
        if (e.data.includes('DEVEUI')) {
            const scaned = JSON.parse(e.data)
            this.props.navigation.navigate('Valider', { valueData: scaned })
            this.camera.pausePreview()
        }else {
            ToastAndroid.show("Code QR non valide", ToastAndroid.SHORT)
        }
    }

    render() {
        return (
            <View style={[styles.container, { height: height, flex: 0 }]}>
                <ScrollView>
                    <View style={[styles.header, { height: height / 4, flex: 0 }]}>
                        <Text style={[styles.textTitle, { letterSpacing: 0, textAlign: 'center' }]}>Merci de bien vouloir{`\n`}scanner le QRcode</Text>
                        <Text style={{ color: '#2d2e87', fontSize: 16, fontFamily: 'GothamLight' }}>Qui se trouve au dos de votre capteur</Text>
                    </View>
                    <View style={[styles.body, { height: height / 2, flex: 0 }]}>
                        <RNCamera
                            ref={ref => {
                                this.camera = ref;
                            }}
                            onBarCodeRead={this.onScan}
                            barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                            style={[styles.QRCamera]}
                        >
                            <View style={{ backgroundColor: 'transparent', width: '90%', height: '90%' }}>
                                <Animated.View
                                    style={{
                                        width: '100%',
                                        height: 5,
                                        backgroundColor: '#fff',
                                        opacity: 0.3,
                                        zIndex: 1,
                                        marginTop: this.state.animated
                                    }}>
                                </Animated.View>

                                <View style={[styles.angleViewScanWidth, { top: -3, left: -3 }]}></View>
                                <View style={[styles.angleViewScanHeight, { left: -3 }]}></View>

                                <View style={[styles.angleViewScanWidth, { right: -3, top: -3 }]}></View>
                                <View style={[styles.angleViewScanHeight, { right: -3, top: 0 }]}></View>

                                <View style={[styles.angleViewScanWidth, { left: -3, bottom: 0 }]}></View>
                                <View style={[styles.angleViewScanHeight, { left: -3, bottom: 0 }]}></View>

                                <View style={[styles.angleViewScanWidth, { right: -3, bottom: 0 }]}></View>
                                <View style={[styles.angleViewScanHeight, { right: -3, bottom: 0 }]}></View>
                            </View>
                        </RNCamera>
                    </View>
                    <View style={[styles.footer, { height: height / 4, flex: 0 }]}>
                        <View style={styles.btnTouchable}
                            onPress={() => {
                                this.props.navigation.navigate('Valider', { value: 1 })

                            }}>
                            <TextLoader text="SCANNING" textStyle={styles.titleBtn} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}