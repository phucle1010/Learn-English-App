import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import screens from '../navigation';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(-1);

    return (
        <Tab.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.container,
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    color: '#faa0a0',
                },
            }}
        >
            {screens.map((screen, index) => {
                let TabComp = null;
                if (screen.isHideNavigationTab) {
                    TabComp = (
                        <Tab.Screen
                            key={index}
                            name={screen.name}
                            component={screen.component}
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
                            component={screen.component}
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
        paddingBottom: 10,
        height: 80,
        backgroundColor: '#fff',
    },
});

export default BottomTab;
