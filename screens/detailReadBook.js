import React from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';

const DetailReadBook = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Books')}
                style={{
                    width: 30,
                    height: 30,
                    position: 'absolute',
                    top: 25,
                    left: 30,
                    zIndex: 100,
                }}
            >
                <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
            </TouchableOpacity>
            <View style={styles.headcontainer}>
                <Text style={styles.txthead}>Đọc sách</Text>
            </View>
            <View>Nội dung sách</View>
        </View>
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
        justifyContent: 'center',
        backgroundColor: color.btn_color3,
        height: 80,
        width: 390,
        elevation: 10,
    },
    imgreturn: {
        width: '100%',
        height: '100%',
        // marginLeft: 38,
    },
    txthead: {
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 20,
        color: color.txt5,
    },

    // bookcontainer: {
    //     width: 360,
    //     height: 603,
    //     // paddingHorizontal: 20,
    //     backgroundColor: color.btn_color3,
    //     //justifyContent: 'space-between',
    //     borderRadius: 10,
    //     marginTop: 18,
    //     marginBottom: 10,
    //     elevation: 2,
    //     alignItems: 'center',
    // },
});

export default DetailReadBook;
