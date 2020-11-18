import React from 'react'
import { View, Image, Text, TouchableOpacity, Easing, Dimensions, Animated } from 'react-native'
import checkicon from '../images/checkicon.png'
import styles from '../style'
import { LineDotsLoader, DotsLoader } from 'react-native-indicator'
const { width, height } = Dimensions.get('window');
export default class ValiderSuccess extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Information')
        }, 3000);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.header, { flex: 2 }]}>
                    <Image source={checkicon} style={{ width: 250, height: 250 }}></Image>
                    <Text></Text><Text></Text>
                    <Text style={[styles.textBlue, { fontFamily: 'GothamLight', fontSize: 18 }]}>
                        Votre capteur a bien été reconnu par{`\n`}
                        le réseau et envoie correctement les données
                    </Text>
                    <Text></Text>
                    <View style={{ flexDirection: 'row' }}>
                        <DotsLoader color='#2d2e87' />
                        <DotsLoader color='#2d2e87' />
                    </View>
                </View>

                <View style={[styles.footer]}>
                    <View style={[styles.body, { width: '100%' }]}>
                        <View style={[styles.btnTouchable, { width: '70%' }]}>
                            <Text style={styles.titleBtn}>VALIDER</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

