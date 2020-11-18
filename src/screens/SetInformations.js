import React from 'react'
import {
    View, Text,
    TouchableOpacity, Image,
    Picker, Dimensions,
    ScrollView,
    Modal, Alert, TextInput, ToastAndroid
} from 'react-native'
import { CirclesLoader } from 'react-native-indicator'
import backicon from '../images/backicon.png'
import styles from '../style'
import global from '../global'
import getApi from '../api/getApi'
import postApi from '../api/postApi'
import ButtonUpdate from '../components/buttonUpdate'
import getDataFromStorege from '../api/getDataFromStorage'
const { width, height } = Dimensions.get('window')
export default class SetInformations extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Valider_success: false,
            modalVisible: true,
            Stock: [],
            Papier: [],
            Offre: [],
            Ref_article: [],
            id: null,
            stock_id: null,
            paper_id: null,
            offer_id: null,
            refarticle_id: null,
            alert_threshold: null,
            max_stock: '',
            changeover_day: null,
        }
        this.getDataFromApi()
    }

    getDataFromApi = () => {
        getDataFromStorege('@DeviceInfo').then(data => {
            this.setState({ id: data.id })
        })
        getApi(`${global.url}${'v1/manager/app/stock'}`).then(data => {
            if (data !== null && data !== undefined) {
                this.setState({ Stock: data.msg })
            }
        })
        getApi(`${global.url}${'v1/manager/app/paper'}`).then(data => {
            if (data !== null && data !== undefined) {
                this.setState({ Papier: data.msg })
            }
        })
        getApi(`${global.url}${'v1/manager/app/offer'}`).then(data => {
            if (data !== null && data !== undefined) {
                this.setState({ Offre: data.msg })
            }
        })
        getApi(`${global.url_get_ref_article}`).then(ref => {
            if (ref !== null && ref !== undefined) {
                this.setState({ Ref_article: ref.msg })
                this.setState({ modalVisible: false })
            }
        })
    }


    Post_UpdateInfo_Device = async () => {
        await this.checkValider2()
        if (this.state.Valider_success == true) {
            this.setState({ modalVisible: true })
            const params = {
                id: this.state.id,
                stock_id: this.state.stock_id,
                paper_id: this.state.paper_id,
                max_stock: this.state.max_stock,
                alert_threshold: this.state.alert_threshold,
                offer_id: this.state.offer_id,
                changeover_day: this.state.changeover_day,
                refarticle_id: this.state.refarticle_id
            }
            postApi(`${global.url}${'v1/manager/app/device'}`, params).then(data => {
                if (data !== null && data !== undefined) {
                    this.setState({ modalVisible: false })
                    this.props.navigation.navigate('Finish')
                }
            })
        }

    }


    checkValider = () => {
        if (this.state.stock_id == null ||
            this.state.paper_id == null ||
            this.state.offer_id == null ||
            this.state.max_stock.length == 0 ||
            this.state.alert_threshold == null ||
            this.state.refarticle_id == null) {
            this.setState({ Valider_success: false })
        } else {
            this.setState({ Valider_success: true })
        }

        if (this.state.offer_id == 1 && this.state.changeover_day == null) {
            this.setState({ Valider_success: false })
        }

        if (this.state.max_stock <= this.state.alert_threshold) {
            this.setState({ Valider_success: false })
        }
    }

    checkValider2 = () => {
        if (this.state.stock_id == null ||
            this.state.paper_id == null ||
            this.state.offer_id == null ||
            this.state.max_stock.length == 0 ||
            this.state.alert_threshold == null ||
            this.state.refarticle_id == null) {
            this.setState({ Valider_success: false })
            Alert.alert("Attention!", "Vous devez impérativement indiquer un choix par item")

        } else {
            this.setState({ Valider_success: true })
        }

        if (this.state.offer_id == 1 && this.state.changeover_day == null) {
            this.setState({ Valider_success: false })
        }

        if (this.state.max_stock <= this.state.alert_threshold) {
            Alert.alert("Attention!", "Stock Maxi  doit être supérieur à Seuil d'alerte")
            this.setState({ Valider_success: false })
        }




    }
    render() {
        return (
            <ScrollView >
                <View style={[styles.header, { height: height / 5 }]}>
                    <Text style={[styles.textBlue, { fontSize: 20, fontFamily: 'GothamLight' }]}>Votre capteur a bien été reconnu par le réseau.</Text>
                    <Text style={[styles.textTitle]}>MERCI D'INDIQUER:</Text>
                </View>
                <View style={[styles.body, { height: height / 1.7 }]}>
                    {/* set value Stock */}
                    <View style={[styles.inputGroup, { flex: 1 }]}>
                        <Text style={styles.titleInput}>Stock:</Text>
                        <View style={{ flexDirection: 'row', paddingTop: 5, justifyContent: 'space-between' }}>
                            {
                                this.state.Stock.map(item =>
                                    <ButtonUpdate
                                        background={this.state.stock_id}
                                        item={item}
                                        onPress={() => this.setState({ stock_id: item.id }, () => this.checkValider())}
                                        key={item.name} />)
                            }
                        </View>
                    </View>
                    {/* set value Papier */}
                    <View style={[styles.inputGroup, { flex: 1 }]}>
                        <Text style={styles.titleInput}>Papier:</Text>
                        <View style={{ flexDirection: 'row', paddingTop: 5, justifyContent: 'space-between' }}>
                            {
                                this.state.Papier.map(item =>
                                    <ButtonUpdate
                                        background={this.state.paper_id}
                                        item={item}
                                        onPress={() => this.setState({ paper_id: item.id }, () => this.checkValider())}
                                        key={item.name} />)
                            }
                        </View>
                    </View>

                    {/* set value Stock Maxi & Seuil d'alerte*/}
                    <View style={[styles.inputGroup, { flex: 1 }]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: "45%" }}>
                                <Text style={styles.titleInput}>Stock Maxi:</Text>
                            </View>
                            <View style={{ width: "45%" }}>
                                <Text style={styles.titleInput}>Seuil d'alerte:</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 5, justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                style={[styles.btnSetInfo, {
                                    backgroundColor: '#f9f9f9',
                                    flex: 0, width: '45%',
                                    fontSize: 20,
                                    color: '#999999',
                                }]}>
                                <TextInput
                                    style={[styles.titleBtnSetInfo, { flex: 1, width: '100%', paddingLeft: 15, fontSize: 15 }]}
                                    onChangeText={(value) => {
                                        let regex = '^\\d+(\\^.\\d+)*$';
                                        if (value.match(regex) == null) {
                                            ToastAndroid.show("Stock Maxi doit être un entier", ToastAndroid.SHORT)
                                            this.setState({ Valider_success: false })
                                        } else {
                                            this.setState({ max_stock: value }, () => this.checkValider())
                                        }
                                        if(value == ''){
                                            this.setState({ Valider_success: false })
                                            this.setState({ max_stock: '' }, () => this.checkValider())

                                        }
                                    }
                                    }
                                    placeholder="Taper le chiffre"
                                    value={this.state.max_stock}
                                    keyboardType="numeric">
                                </TextInput>
                            </TouchableOpacity>

                            <TouchableOpacity style={[
                                styles.btnSetInfo,
                                {
                                    backgroundColor: '#f9f9f9',
                                    flex: 0, width: '45%',
                                    fontSize: 20,
                                    color: '#999999',
                                }]}>
                                <Picker
                                    selectedValue={this.state.alert_threshold}
                                    style={[styles.listChoisir, { flex: 1, alignItems: 'center' }]}
                                    onValueChange={(itemValue) => {
                                        this.setState({ alert_threshold: itemValue }, () => this.checkValider())
                                    }}>
                                    <Picker.Item label="Chiffre de 1... 10" value={null} color='#2d2e87' />
                                    <Picker.Item label="1" value={1} color='#2d2e87' />
                                    <Picker.Item label="2" value={2} color='#2d2e87' />
                                    <Picker.Item label="3" value={3} color='#2d2e87' />
                                    <Picker.Item label="4" value={4} color='#2d2e87' />
                                    <Picker.Item label="5" value={5} color='#2d2e87' />
                                    <Picker.Item label="6" value={6} color='#2d2e87' />
                                    <Picker.Item label="7" value={7} color='#2d2e87' />
                                    <Picker.Item label="8" value={8} color='#2d2e87' />
                                    <Picker.Item label="9" value={9} color='#2d2e87' />
                                    <Picker.Item label="10" value={10} color='#2d2e87' />
                                </Picker>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* set value Offre */}
                    <View style={[styles.inputGroup, { flex: 1 }]}>
                        <Text style={styles.titleInput}>Offre:</Text>
                        <View style={{ flexDirection: 'row', paddingTop: 5, justifyContent: 'space-between' }}>
                            {
                                this.state.Offre.map(item =>
                                    <ButtonUpdate
                                        background={this.state.offer_id}
                                        item={item}
                                        onPress={() => {
                                            this.setState({ offer_id: item.id }, () => this.checkValider())
                                            if (item.id == 2) this.setState({ changeover_day: null }, () => this.checkValider())
                                        }}
                                        key={item.name} />)
                            }
                        </View>
                    </View>


                    {/* set value Jour de passage  */}
                    <View style={[styles.inputGroup, { flex: 1, display: this.state.offer_id == 1 ? 'flex' : 'none' }]}>
                        <Text style={styles.titleInput}>Jour de passage:</Text>
                        <View style={[styles.header, styles.btnSetInfo, { marginTop: 5, borderRadius: 15, paddingLeft: 15 }]}>
                            {/* Picker value */}
                            <Picker
                                selectedValue={this.state.changeover_day}
                                style={styles.listChoisir}
                                onValueChange={(itemValue) => {
                                    this.setState({ changeover_day: itemValue }, () => this.checkValider())
                                }}>
                                <Picker.Item label="Jour: Lundi...Vendredi" value={null} color='#2d2e87' />
                                <Picker.Item label="Lundi" value={"Lundi"} color='#2d2e87' />
                                <Picker.Item label="Mardi" value={"Mardi"} color='#2d2e87' />
                                <Picker.Item label="Mercredi" value={"Mercredi"} color='#2d2e87' />
                                <Picker.Item label="Jeudi" value={"Jeudi"} color='#2d2e87' />
                                <Picker.Item label="Vendredi" value={"Vendredi"} color='#2d2e87' />
                            </Picker>
                        </View>
                    </View>

                    {/* set value Ref Article */}
                    <View style={[styles.inputGroup, { flex: 1, marginTop: 10 }]}>
                        <Text style={styles.titleInput}>Ref article:</Text>
                        <View style={[styles.header, styles.btnSetInfo, { marginTop: 5, borderRadius: 15, paddingLeft: 15 }]}>
                            {/* Picker value */}
                            <Picker
                                selectedValue={this.state.refarticle_id}
                                style={[styles.listChoisir]}
                                onValueChange={(itemValue) => {
                                    this.setState({ refarticle_id: itemValue }, () => this.checkValider())
                                }}>
                                <Picker.Item label="Choisir . . ." value={null} color='#2d2e87' />
                                {
                                    this.state.Ref_article.map(item =>
                                        <Picker.Item key={item.id} label={item.name} value={item.id} color='#2d2e87' />)
                                }
                            </Picker>
                        </View>
                    </View>
                </View>
                <View style={[styles.footer, { height: height / 5 }]}>
                    <Text style={[styles.textRed, { fontFamily: 'GothamLight', fontSize: 15, display: this.state.Valider_success ? 'none' : 'flex' }]}>(Vous devez impérativement indiquer un choix par item)</Text>
                    <Text></Text>
                    <View style={[{ flexDirection: 'row' }]}>
                        {/* RETOUR button */}
                        <TouchableOpacity
                            style={[styles.btnTouchable, { backgroundColor: '#fff', width: '35%', flexDirection: "row", display: this.state.Valider_success ? 'flex' : 'none' }]}
                            onPress={() => {
                                this.props.navigation.navigate('Valider')
                            }}>
                            <Image source={backicon} style={{ width: 15, height: 15 }} />
                            <Text style={[styles.titleBtn, { color: '#9bc31c', fontSize: 20 }]}> RETOUR</Text>
                        </TouchableOpacity>
                        <View style={{ width: '3%', display: this.state.Valider_success ? 'flex' : 'none' }}></View>
                        {/* VALIDER button */}
                        <TouchableOpacity style={[styles.btnTouchable, { width: this.state.Valider_success ? '35%' : '70%', flexDirection: 'row' }]}
                            onPress={this.Post_UpdateInfo_Device}>
                            <Text style={[styles.titleBtn, { fontSize: 20 }]}>VALIDER</Text>
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
