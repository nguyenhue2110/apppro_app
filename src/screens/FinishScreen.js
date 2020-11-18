import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import styles from '../style'
import finishIC from '../images/finish.png'

const { width, height } = Dimensions.get('window')
export default class FinishScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.header, { flex: 2 }]}>
                    <Image source={finishIC} style={{ width: 300, height: 305 }}></Image>
                    <View style={{ height: '10%' }}></View>
                    <Text style={[styles.textBlue, { fontFamily: 'GothamLight', fontSize: 17 }]}>
                        L'installation de votre capteur est terminée,{`\n`}
                        vous pouvez passer au suivant.
                        </Text>
                </View>
                <View style={[styles.body]}>
                    <View style={[styles.body, { width: '90%' }]}>
                        <TouchableOpacity style={[styles.btnTouchable]}
                        onPress={()=>{
                            this.props.navigation.navigate('Welcome')
                        }}>
                            <Text style={styles.titleBtn}>FIN D'INSTALLATION</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}