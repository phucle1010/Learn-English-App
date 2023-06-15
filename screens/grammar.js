import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';
import Lottie from 'lottie-react-native';
import db, { doc, getDoc, getDocs, collection } from '../firebase/index';
import { useIsFocused } from '@react-navigation/native';
import Loading from '../components/Loading'

const GrammarItem = (props) => {
    const { name, onPress } = props
    return (
        <TouchableOpacity onPress={onPress} style={styles.itemGrammar}>
            <Text style={styles.txtItemGrammar}>{name}</Text>
        </TouchableOpacity>
    )
}

const Grammar = (props) => {
    const { navigation } = props
    const isFocusedScreen = useIsFocused();
    const [dataGrammar, setDataGrammar] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const handleGetGrammar = async () => {
        const querySnapshot = await getDocs(collection(db, "GRAMMAR"));
        const newData = []
        querySnapshot.forEach((doc) => {
            const docData = doc.data();
            const dataWithId = { ...docData, id: doc.id };
            newData.push(dataWithId);
        });
        setDataGrammar(newData)
    }

    useEffect(() => {
        if (isFocusedScreen) {
            handleGetGrammar();
            setIsLoading(false)
        } else {
            setDataGrammar([])
            setIsLoading(true)
        }
    }, [isFocusedScreen])

    return (
        <React.Fragment>
            {
                isLoading ? <Loading /> : (
                    <View style={styles.container}>
                        <View style={styles.headcontainer}>
                            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                                <Image style={styles.imgreturn} source={require('../sources/icons/arrowleft.png')} />
                            </TouchableOpacity>
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
                        <FlatList
                            data={dataGrammar}
                            renderItem={({ item }) => <GrammarItem onPress={() => navigation.navigate('GrammarDetail', {
                                name: item.name,
                                des: item.description,
                                question: item.exercise
                            })} name={item.name} />}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                )
            }
        </React.Fragment>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 82,
        backgroundColor: color.btn_color3,
    },
    headcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
        // marginTop: 30,
        marginBottom: 10,
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
        paddingHorizontal: 20
    },
});

export default Grammar;