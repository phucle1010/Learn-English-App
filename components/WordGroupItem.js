import React from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';
const { width } = Dimensions.get("window")

const WordGroupItem = (props) => {
    const { name, onPress, uri } = props
    return (
        <View style={styles.wordGroupContainer}>
            <TouchableOpacity onPress={onPress} style={styles.wrapWordGroup}>
                <Image style={styles.img} source={{ uri: uri }} resizeMode='stretch' />
                <Text style={styles.txtimg}>{name}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default WordGroupItem

const styles = StyleSheet.create({
    txtwordGroup: {
        fontSize: 20,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 'bold',
        color: color.txt4,
    },
    wordGroupContainer: {
        width: (width - 66) / 2,
        height: (width - 66) / 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        margin: 11,
    },
    wrapWordGroup: {
        width: '100%',
        height: '100%',
        backgroundColor: color.btn_color3,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
    img: {
        width: 67,
        height: 67,
    },
    txtimg: {
        fontSize: 16,
        fontFamily: fontStyle.fontfamily_2,
        textAlign: 'center',
        color: '#000000',
        padding: 5
    },
})