import React from 'react'
import { View, Text, Dimensions, TouchableOpacity, ScrollView, Modal, } from 'react-native'
import styles from '../style'
import createDevice from '../api/CreateDeviceAPI'
import { CirclesLoader } from 'react-native-indicator'
import global from '../global'
import AsyncStorage from '@react-native-community/async-storage'
import getDataFromStorage from '../api/getDataFromStorage'
const { width, height } = Dimensions.get('window')
export default class ValiderScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dev_eui: '',
            app_eui: '',
            app_key: '',
            company_id: '',
            nameDevice: '',
            modalVisible: false
        }
    }

    componentDidMount() {
        getDataFromStorage('@MyAccount:key').then(data => {
            this.setState({ company_id: data.msg.user.company_id })
        })
        const valueData = this.props.navigation.getParam('valueData')
        let nameDV = valueData.DEVEUI.slice(-10, valueData.DEVEUI.length)
        this.setState({
            dev_eui: valueData.DEVEUI,
            app_eui: valueData.APPEUI,
            app_key: valueData.APPKEY,
            nameDevice: this.convertHexToChart(nameDV)
        })
    }

    convertHexToChart = (str1) => {
        var hex = str1.toString();
        var str = '';
        for (var n = 0; n < hex.length; n += 2) {
            str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
        }
        return str;
    }

    postCreateDevice = () => {
        this.setState({ modalVisible: true })
        const { dev_eui, app_eui, app_key, company_id } = this.state
        const parms = {
            dev_eui: dev_eui,
            app_eui: app_eui,
            app_key: app_key,
            company_id: company_id
        }
        createDevice(`${global.url_create_device}`, JSON.stringify(parms)).then(data => {
            if (data !== null && data !== undefined) {
                this.setState({ modalVisible: false })
                this.props.navigation.navigate('Success', { dataDevice: data.msg })
            } else {
                this.setState({ modalVisible: false })
                this.props.navigation.navigate('Fail')
            }
        })
        // this.props.navigation.navigate('Success')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.header]}>
                    <View style={styles.header}>
                        <Text style={[styles.textBlue, { fontSize: 30 }]}>Vous avez scanné:</Text>
                        <Text></Text>

                    </View>
                </View>
                <View style={[styles.body, { justifyContent: 'flex-start' }]}>
                    {/* content body ? */}
                    <Text style={[styles.textBlue, { fontSize: 30 }]}>Le capteur</Text>
                    <Text style={styles.textRed}>N° {this.state.nameDevice}</Text>
                </View>

                <View style={[styles.footer]}>
                    <View style={[styles.header, { width: '100%' }]}>
                        <Text
                            style={[styles.textBlue, {
                                fontFamily: 'GothamLight',
                                fontSize: 20
                            }]}>
                            Vous pouvez le pré-positionner{`\n`}et appuyer sur le bouton du capteur
                        </Text>
                    </View>
                    <View style={[styles.body, { width: '100%' }]}>
                        <TouchableOpacity style={[styles.btnTouchable, { height: '60%', width: '70%', flexDirection: 'row' }]}
                            onPress={this.postCreateDevice}>
                            <Text style={styles.titleBtn}>VALIDER</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.footer, { width: '100%' }]}>
                        <TouchableOpacity style={[styles.btnTouchable, { height: '60%', width: '70%' }]}
                            onPress={() => {
                                this.props.navigation.navigate('QRcode')
                            }}>
                            <Text style={styles.titleBtn}>RE-SCANNER</Text>
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
            </View>
        )
    }
}