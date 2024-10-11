/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import MainNavigation from '@app/navigation/main_navigation';
import LoadingWrapper from '@app/presentation/common/loading_wrapper';
import store from '@app/redux/store';
import {
  closeRealm,
  getRealm,
} from '@app/services/movie_service';
import React, {useEffect, useState} from 'react';
import {
  AppState,
  AppStateStatus,
  StatusBar,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';

function App(): React.JSX.Element {
  const [appState, setAppState] = useState<AppStateStatus>('active');

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App đã trở lại foreground, mở lại Realm.');
        await getRealm();
      }

      if (nextAppState === 'background') {
        console.log('App vào nền, đóng Realm.');
        closeRealm();
      }

      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      subscription.remove();
    };
  }, [appState]);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <LoadingWrapper>
        <MainNavigation />
      </LoadingWrapper>
    </Provider>
  );
}

export default App;
