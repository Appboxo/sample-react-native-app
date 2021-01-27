/*CORE*/
import React from 'react';
import {Button, StyleSheet, View, Text} from 'react-native';
/*LIBS*/
import appboxo from '@appboxo/react-native-sdk-test';

export default function FirstScreen() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
    const customEventsSubscription = appboxo.customEvents.subscribe(
      (event) => {
        const newEvent = {
          app_id: 'app43196',
          custom_event: {
            payload: {payment: 'received'},
            request_id: event.custom_event.request_id,
            type: 'event',
          },
        };
        appboxo.customEvents.send(newEvent);
      },
      () => {},
    );
    return () => {
      console.log('destroy first');
      customEventsSubscription();
    };
  }, []);

  const handleOpenMiniapp = () => {
    appboxo.openMiniapp('app41013', '', {
      extraUrlParams: {test: 'test'},
    }); //launch miniapp by id with auth payload
  };

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <View style={styles.container}>
      <Text style={{marginBottom: 20, fontSize: 24}}>
        All purchases will be success
      </Text>
      <Button
        title="Launch miniapp"
        onPress={handleOpenMiniapp}
        accessibilityLabel="Launch miniapp"
      />
      <Button title={'Theme: ' + theme} onPress={changeTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
