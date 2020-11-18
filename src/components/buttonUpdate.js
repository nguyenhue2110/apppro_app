import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import styles from '../style'

const { width, height } = Dimensions.get('window');



export default function ButtonUpdate(props) {
    const { background, item, onPress } = props;
    return (

        <TouchableOpacity
            style={[styles.btnSetInfo, { backgroundColor: background == item.id ? '#2d2e87' : '#f9f9f9', flex: 0, width: '45%' }]}
            onPress={onPress}
        >
            <Text style={[styles.titleBtnSetInfo, { color: background == item.id ? '#fff' : '#999999' }]}>{item.name}</Text>
        </TouchableOpacity>

    );
}

