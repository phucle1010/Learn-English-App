import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import fontStyle from '../contains/fontStyle';
import Lottie from 'lottie-react-native';
import { doc, getDoc, db, getDocs, collection } from '../firebase/index';
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
    const [dataGrammar, setDataGrammar] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        try {
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
            handleGetGrammar();
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
    }, [])
    return (
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
            {isLoading
                ? <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Lottie
                        source={{ uri: 'https://assets5.lottiefiles.com/packages/lf20_p8bfn5to.json' }}
                        autoPlay
                        loop
                    />
                </View>
                : <FlatList
                    data={dataGrammar}
                    renderItem={({ item }) => <GrammarItem onPress={() => navigation.navigate('GrammarDetail', {
                        name: item.name,
                        des: item.description,
                        question: item.exercise
                    })} name={item.name} />}
                    keyExtractor={item => item.id}
                />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 80
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
        paddingHorizontal: 20
    },
});

export default Grammar;
