import React from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';

const DetailReadBook = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headcontainer}>
                    <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                    <Text style={styles.txthead}>Đọc sách</Text>
                </View>
                <View style={styles.bookcontainer}>
                    <Text>Nội dung sách chèn file fdf</Text>
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

    bookcontainer: {
        width: 346,
        height: 603,
        // paddingHorizontal: 20,
        backgroundColor: color.btn_color3,
        //justifyContent: 'space-between',
        borderRadius: 10,
        marginTop: 18,
        marginBottom: 10,
        elevation: 2,
        alignItems: 'center',
    },
});

export default DetailReadBook;
