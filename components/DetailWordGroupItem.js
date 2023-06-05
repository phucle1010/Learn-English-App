import React from 'react';
import { Text, TextInput, StyleSheet, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
const { width } = Dimensions.get('window')

const DetailWordGroupItem = (props) => {
    const { word, phonetic, onPressUS, onPressUK, disUK, disUS } = props
    return (
        <TouchableOpacity style={styles.wrapWord}>
            <Text style={styles.word}>{word}</Text>
            <View style={styles.wordcontainer}>
                <Text style={styles.txtspell}>{phonetic}</Text>
                <View style={styles.soundcontainer}>
                    {disUK && <TouchableOpacity onPress={onPressUK} style={styles.soundcontainer}>
                        <Text style={styles.txticon}>UK</Text>
                        <Image style={styles.iconsound} source={require('../sources/icons/volumehigh.png')} />
                    </TouchableOpacity>}
                    {disUS && <TouchableOpacity onPress={onPressUS} style={styles.soundcontainer}>
                        <Text style={styles.txticon}>US</Text>
                        <Image style={styles.iconsound} source={require('../sources/icons/volumehigh.png')} />
                    </TouchableOpacity>}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default DetailWordGroupItem

const styles = StyleSheet.create({
    wrapWord: {
        marginHorizontal: 10,
        width: width - 44,
        borderRadius: 20,
        backgroundColor: color.btn_color3,
        shadowColor: '#333',
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 5,
        marginVertical: 6,
        padding: 10,
    },
    wordcontainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: color.btn_color3,
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    word: {
        fontSize: 28,
        fontFamily: fontstyle.fontfamily_1,
        color: color.txt1,
        marginHorizontal: 10,
        fontWeight: 'bold',
        paddingTop: 10,
    },
    txtspell: {
        fontSize: 16,
        paddingTop: 10,
        fontFamily: fontstyle.fontfamily_1,
        color: color.txt4,
    },
    soundcontainer: {
        flexDirection: 'row',
    },
    iconsound: {
        width: 24,
        height: 24,
        marginTop: 10,
        marginRight: 10,

    },
    txticon: {
        fontSize: 16,
        fontFamily: fontstyle.fontfamily_1,
        color: color.txt1,
        marginHorizontal: 10,
        paddingTop: 10,
        fontWeight: 500,
    },
})