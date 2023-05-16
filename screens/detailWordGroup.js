import React from 'react';
import { Text, TextInput, StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';

const DetailWordGroup = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headcontainer}>
                    <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                    <Text style={styles.txthead}>Bộ từ vựng</Text>
                </View>
                <View style={styles.searchcontainer}>
                    <TextInput style={styles.search} placeholder="Tìm kiếm từ vựng" />
                    <Image style={styles.icon} source={require('../sources/icons/search.png')} />
                </View>
                <View style={styles.wrapWord}>
                    <Text style={styles.word}>Hello</Text>
                    <View style={styles.wordcontainer}>
                        <Text style={styles.txtspell}>/həˈloʊ/</Text>
                        <View style={styles.soundcontainer}>
                            <Text style={styles.txticon}>UK</Text>
                            <Image style={styles.iconsound} source={require('../sources/icons/volumehigh.png')} />
                            <Text style={styles.txticon}>US</Text>
                            <Image style={styles.iconsound} source={require('../sources/icons/volumehigh.png')} />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    headcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.btn_color3,
        height: 80,
        width: 390,
    },
    imgreturn: {
        width: 30,
        height: 30,
        marginLeft: 38,
    },
    txthead: {
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 20,
        marginLeft: 100,
        color: color.txt5,
    },
    searchcontainer: {
        marginTop: 20,
        flexDirection: 'row',
        width: 306,
        height: 40,
        borderRadius: 30,
        marginHorizontal: 20,
        marginBottom: 17,
        borderWidth: 1,
        borderColor: color.bodercolor3,
        alignItems: 'center',
    },
    search: {
        flex: 1,
        paddingHorizontal: 10,
        fontSize: 14,
        fontStyle: 'italic',
    },
    icon: {
        width: 22,
        height: 22,
        marginRight: 15,
    },
    wrapWord: {
        marginTop: 10,
        marginBottom: 5,
        width: 346,
        height: 100,
        borderRadius: 10,
        backgroundColor: color.btn_color3,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4,
    },
    wordcontainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 346,
        height: 110,
        paddingHorizontal: 20,
        backgroundColor: color.btn_color3,
        justifyContent: 'space-between',
        borderRadius: 10,
        marginTop: 15,
        elevation: 1,
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
});

export default DetailWordGroup;
