import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
module.exports = {
    //style layout
    container: {
        margin: 0,
        padding: 0,
        backgroundColor: '#fff',
        flex: 1,
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    //style component
    logoImage: {
        width: '80%',
        height: '80%'
    },
    textTitle: {
        color: '#2d2e87',
        fontSize: 30,
        letterSpacing: 1,
        fontFamily: 'GothamMedium'
    },
    inputGroup: {
        width: '80%',
    },
    textInput: {
        backgroundColor: '#f2f2f2',
        marginBottom: 30,
        borderRadius: 7,
        paddingLeft: 15,
        fontFamily: 'GothamLight'
    },
    titleInput: {
        fontSize: 15,
        color: '#2d2e87',
        fontFamily: 'GothamLight'
    },
    btnTouchable: {
        backgroundColor: '#9bc31c',
        width: "85%",
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        elevation: 2
    },
    titleBtn: {
        color: '#fff', 
        fontSize: 25,
        fontFamily: 'GothamMedium',
    },
    E_Appro: {
        backgroundColor: '#fff',
        width: width / 2.5,
        height: '70%',
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.45,
        shadowRadius: 1.14,
        elevation: 3,
    },
    QRCamera: {
        height: '100%',
        width: '85%',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textRed: {
        color: '#ff0000',
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'GothamMedium'
    },
    textBlue: {
        color: '#2d2e87',
        textAlign: 'center',
        fontFamily: 'GothamMedium'
    },
    pointView: {
        margin: 4, 
        backgroundColor: '#2d2e87', 
        height: 10, 
        width: 10, 
        borderRadius: 100, 
        opacity: 0.2 
    },
    btnSetInfo: {
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#f2f2f2',
        height:'100%',
        borderRadius: 10,
        flex: 1,
    },
    titleBtnSetInfo: {
        color: '#999999',
        fontSize: 20,
        fontFamily: 'GothamLight'
    },
    listChoisir: {
        width: '100%',
        color: '#2d2e87',
        height: '100%',
    },
    angleViewScanWidth: {
        width: 35,
        height: 5,
        backgroundColor: '#fff',
        position: 'absolute'
    },
    angleViewScanHeight: {
        width: 5,
        height: 35,
        backgroundColor: '#fff',
        position: 'absolute'
    },
}