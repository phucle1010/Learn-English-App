import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import screens from '../navigation';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../contains/color';

const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();

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
                    tabBarIconStyle: {
                    },
                    tabBarLabelStyle: {
                        display: 'none'
                    },
                    tabBarInactiveTintColor: '#F3CFC6',
                    tabBarInactiveBackgroundColor: '#FFFFFF',
                    tabBarActiveTintColor: '#FFFFFF',
                    tabBarActiveBackgroundColor: '#E37383',

                }
            )}
        >
            {screens.map((screen, index) => {
                return (
                    <Tab.Screen
                        key={index}
                        name={screen.name}
                        component={screen.component}
                        options={({ color, size, focused }) => (
                            {
                                tabBarStyle: {
                                    height: screen.isHideNavigationTab ? 0 : 60
                                },
                                tabBarIcon: ({ color }) => (
                                    <MaterialCommunityIcons
                                        name={screen.tabIconName}
                                        size={screen.tabIconSize}
                                        color={color}
                                    />
                                ),
                                tabBarItemStyle: {
                                    display: screen.isHideTab === true ? 'none' : 'flex',
                                    marginHorizontal: 35,
                                    borderTopRightRadius: 25,
                                    borderTopLeftRadius: 25,
                                },
                            }
                        )}
                    />
                )
            })}
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: 60,
        backgroundColor: 'red',
        // borderTopWidth: 1,
        // borderTopColor: '#efefef',
    },
});

export default BottomTab;
