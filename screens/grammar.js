import React from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';

const Grammar = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headcontainer}>
                    <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                    <Text style={styles.txthead}>Ngữ pháp</Text>
                </View>
                <View
                    style={{
                        width: 330,
                        alignItems: 'flex-start',
                    }}
                >
                    <Text style={styles.txtwordGroup}>Danh mục ngữ pháp</Text>
                </View>
                <TouchableOpacity style={styles.itemGrammar}>
                    <Text style={styles.txtItemGrammar}>Danh từ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemGrammar}>
                    <Text style={styles.txtItemGrammar}>Động từ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemGrammar}>
                    <Text style={styles.txtItemGrammar}>Tính từ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemGrammar}>
                    <Text style={styles.txtItemGrammar}>Câu đơn</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemGrammar}>
                    <Text style={styles.txtItemGrammar}>Câu phức</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemGrammar}>
                    <Text style={styles.txtItemGrammar}>Mệnh đề</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemGrammar}>
                    <Text style={styles.txtItemGrammar}>So sánh</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemGrammar}>
                    <Text style={styles.txtItemGrammar}>Bị động</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemGrammar}>
                    <Text style={styles.txtItemGrammar}>Câu điều kiện</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemGrammar}>
                    <Text style={styles.txtItemGrammar}>12 thì cơ bản</Text>
                </TouchableOpacity>
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
        marginLeft: 80,
        color: color.txt5,
    },
    txtwordGroup: {
        fontSize: 20,
        fontFamily: fontStyle.fontfamily_2,
        fontWeight: 'bold',
        color: color.txt4,
        marginTop: 30,
        marginBottom: 20,
    },
    itemGrammar: {
        width: 346,
        height: 46,
        borderRadius: 20,
        borderColor: color.bodercolor3,
        marginTop: 20,
        borderWidth: 1,
        justifyContent: 'center',
    },
    txtItemGrammar: {
        fontSize: 18,
        fontFamily: fontStyle.fontfamily_1,
        fontWeight: 400,
        color: color.txt1,
        marginLeft: 20,
    },
});

export default Grammar;
