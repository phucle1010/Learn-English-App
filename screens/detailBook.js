import React from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity, Image, Text } from 'react-native';
import Pdf from 'react-native-pdf';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';

const DetailBook = (props) => {
    const { navigation, route } = props
    const { idBook } = route.params
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
                <TouchableOpacity onPress={() => navigation.navigate("ReadBook")}>
                    <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                </TouchableOpacity>
                <Text style={styles.txthead}>Nội dung sách</Text>
            </View>
            <Pdf
                trustAllCerts={false}
                source={source}
                // enablePaging={true}
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
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.btn_color3,
        height: 80,
        width: 390,
        elevation: 4,
    },
    imgreturn: {
        width: 30,
        height: 30,
        marginLeft: 38,
    },
    txthead: {
        position: 'absolute',
        left: '35%',
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 20,
        textAlign: 'center',
        color: color.txt5,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});
export default DetailBook;