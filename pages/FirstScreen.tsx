/*CORE*/
import React from 'react';
import {Button, StyleSheet, View, Text} from 'react-native';
/*LIBS*/
import appboxosdk from '@appboxo/react-native-sdk';

export default function FirstScreen() {
  React.useEffect(() => {
    const customEventsSubscription = appboxosdk.customEvents.subscribe(
      (event) => {
        const newEvent = {
          app_id: 'app16973',
          request_id: event.custom_event.request_id,
          custom_event: {
            payload: {payment: 'received'},
            request_id: event.custom_event.request_id,
            type: 'event',
          },
        };
        appboxosdk.customEvents.send(newEvent);
      },
      () => {},
    );
    const paymentEventsSubscription = appboxosdk.paymentEvents.subscribe(
      (event) => {
        const newEvent = {
          app_id: event.app_id,
          payment_event: {
            ...event.payment_event,
            status: 'success'
          },
          };
        appboxosdk.paymentEvents.send(newEvent);
      },
      () => {},
    );
    return () => {
      console.log('destroy first');
      customEventsSubscription();
      paymentEventsSubscription();
    };
  }, []);

  const handleOpenMiniapp = () => {
    appboxosdk.openMiniapp('app16973'); //launch miniapp by id
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
