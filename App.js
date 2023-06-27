import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { getDocs, collection, updateDoc, doc, increment, setDoc } from 'firebase/firestore';
import db from './firebase';

import BottomTab from './components/BottomTab';
import store from './store';

const App = () => {
    // const appState = useRef(AppState.currentState);
    const [appState, setAppState] = useState(AppState.currentState);
    const [usageStart, setUsageStart] = useState(new Date());

    useEffect(() => {

        const handleAppStateChange = (nextAppState) => {
            if (appState.match(/inactive|background/) && nextAppState === 'active') {
                // App is in foreground
                setUsageStart(new Date());
            } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
                // App is in background
                console.log(usageStart)
                const usageEnd = new Date();
                const usageTime = usageEnd.getTime() - usageStart.getTime();

                const date = usageStart.toISOString().slice(0, 10);
                console.log(date)
                const docRef = doc(db, 'USER', "iytke9JaBuoJSCsonWrV", 'usage', date);
                setDoc(docRef, { usageTime: increment(usageTime) }, { merge: true })

                setUsageStart(null);
            }
            setAppState(nextAppState);
        };

        const appStateListener = AppState.addEventListener(
            'change',
            nextAppState => {
                handleAppStateChange(nextAppState)
            },
        );
        return () => {
            appStateListener?.remove();
        };
    }, [appState, usageStart]);

    return (
        <Provider store={store}>
            <NavigationContainer>
                <BottomTab />
            </NavigationContainer>
        </Provider>
    );
};

export default App;
