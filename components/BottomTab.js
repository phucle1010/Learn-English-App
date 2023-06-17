import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import screens from '../navigation';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => (
                {
                    headerShown: false,
                    tabBarStyle: styles.container,
                    tabBarShowLabel: true,
                    // tabBarLabelStyle: {
                    //     // color: '#6495ed',
                    //     //             tabIconColor: '#faa0a0',
                    //     // activeColor: '#ee4b2b',

                    // },
                    tabBarIconStyle: {
                        marginTop: 10
                    },
                    tabBarLabel: ({ focused }) => {
                        return focused
                            ? (<Text style={{ color: '#6495ed', fontSize: 13, marginBottom: 15, fontWeight: 'bold' }} >{route.name}</Text>)
                            : (<Text style={{ color: '#add8e6', fontSize: 13, marginBottom: 15, fontWeight: '400' }} >{route.name}</Text>)
                    },
                }
            )}
        >
            {screens.map((screen, index) => {
                let TabComp = null;
                let MainScreen = screen.component;
                if (screen.isHideNavigationTab) {
                    TabComp = (
                        <Tab.Screen
                            key={index}
                            name={screen.name}
                            component={MainScreen}
                            options={{
                                tabBarStyle: {
                                    display: 'none',
                                },
                                tabBarIcon: () => (
                                    <MaterialCommunityIcons
                                        name={screen.tabIconName}
                                        size={screen.tabIconSize}
                                        color={index === selectedTabIndex ? screen.activeColor : screen.tabIconColor}
                                    />
                                ),
                                tabBarItemStyle: {
                                    display: screen.isHideTab === true ? 'none' : 'flex',
                                },
                            }}
                            listeners={{
                                focus: () => {
                                    setSelectedTabIndex(index);
                                },
                            }}
                        />
                    );
                } else {
                    TabComp = (
                        <Tab.Screen
                            key={index}
                            name={screen.name}
                            component={MainScreen}
                            options={{
                                tabBarIcon: () => (
                                    <MaterialCommunityIcons
                                        name={screen.tabIconName}
                                        size={screen.tabIconSize}
                                        color={index === selectedTabIndex ? screen.activeColor : screen.tabIconColor}
                                    />
                                ),
                                tabBarItemStyle: {
                                    display: screen.isHideTab === true ? 'none' : 'flex',
                                    borderTopWidth: 2,
                                    borderTopColor: index === selectedTabIndex ? screen.activeColor : 'transparent',
                                },
                            }}
                            listeners={{
                                focus: () => {
                                    setSelectedTabIndex(index);
                                },
                            }}
                        />
                    );
                }
                return TabComp;
            })}
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        // paddingBottom: 10,
        height: 80,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#efefef',
    },
});

export default BottomTab;
