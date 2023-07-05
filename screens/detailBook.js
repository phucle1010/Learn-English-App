import React from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity, Image, Text } from 'react-native';
import Pdf from 'react-native-pdf';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import Icon from 'react-native-vector-icons/SimpleLineIcons'

const DetailBook = (props) => {
    const { navigation, route } = props
    const { idBook, itembook } = route.params
    const source = { uri: `https://edtechbooks.org/pdfs.v2/${idBook}/_${idBook}.pdf`, cache: true };
    // console.log(`https://edtechbooks.org/pdfs.v2/${idBook}/_${idBook}.pdf`)
    //const source = require('./test.pdf');  // ios only
    //const source = {uri:'bundle-assets://test.pdf' };
    //const source = {uri:'file:///sdcard/test.pdf'};
    //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
    //const source = {uri:"content://com.example.blobs/xxxxxxxx-...?offset=0&size=xxx"};
    //const source = {uri:"blob:xxxxxxxx-...?offset=0&size=xxx"};

    return (
        <View style={styles.container}>
            <View style={styles.headcontainer}>
                <TouchableOpacity style={{ position: 'absolute', left: 20 }} onPress={() => navigation.navigate("DetailReadBook", {
                    itembook
                })}>
                    <Icon name='arrow-left' style={{ color: color.txt5, fontSize: 23, fontWeight: 'bold' }} />
                </TouchableOpacity>
                <Text style={styles.txthead}>Nội dung sách</Text>
            </View>
            <Pdf
                trustAllCerts={false}
                source={source}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    headcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: 80,
        width: 390,
        elevation: 3,
    },
    imgreturn: {
        width: 30,
        height: 30,
        marginLeft: 38,
    },
    txthead: {
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 20,
        color: color.txt5,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});
export default DetailBook;