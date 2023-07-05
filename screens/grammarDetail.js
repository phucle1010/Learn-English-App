import * as React from 'react';
import { Text, View, useWindowDimensions, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Image } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import color from '../contains/color';
import fontstyle from '../contains/fontStyle';
import GrammarExercise from './grammarExercise';
import GrammarTheory from './grammarTheory';

const RenderTabBar = (props) => (
    <View style={styles.container}>


        <View style={{ flexDirection: 'row' }}>
            {props.navigationState.routes.map((route, index) => {
                const isFocused = props.navigationState.index === index;

                const onPress = () => {
                    props.jumpTo(route.key);
                };

                return (
                    <TouchableWithoutFeedback
                        key={route.key}
                        onPress={onPress}
                    >
                        <View style={[styles.tab, { borderColor: isFocused ? '#5C4AC9' : '#000000', borderBottomWidth: isFocused ? 1 : 0 }]}>
                            <Text style={[styles.headerText, { color: isFocused ? '#5C4AC9' : '#000000' }]}>{route.title}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                );
            })}
        </View>
    </View>
);

const GrammarDetail = (props) => {
    const { navigation, route } = props
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Lý thuyết' },
        { key: 'second', title: 'Bài tập' },
    ]);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.headcontainer}>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        left: 20,
                        height: '100%',
                        justifyContent: 'center',
                    }}
                    onPress={() => navigation.navigate("Grammar")}
                >
                    <Icon name='arrow-left' size={20} color={color.txt5} />
                </TouchableOpacity>
                <Text style={styles.txthead}>{route.params.name}</Text>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={SceneMap({
                    first: () => <GrammarTheory content={route.params.des} />,
                    second: () => <GrammarExercise questionsData={route.params.question} />,
                })}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={RenderTabBar}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingHorizontal: 22
    },
    logo: {
        width: 100,
        height: 100,
    },

    headerText: {
        color: '#666666',
        fontSize: 14,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
    },
    frame: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headcontainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.btn_color3,
        height: 80,
        justifyContent: 'center',
        paddingHorizontal: 16
    },
    imgreturn: {
        width: 30,
        height: 30,
    },
    txthead: {
        fontFamily: fontstyle.fontfamily_2,
        fontSize: 20,
        color: '#BEBEBE'
    },
});

export default GrammarDetail;