/*CORE*/
import React from 'react';
import {Button, StyleSheet, View, Text} from 'react-native';
/*LIBS*/
import Boxo from '@appboxo/react-native-sdk';

export default function FirstScreen() {
  React.useEffect(() => {
    const customEventsSubscription = Boxo.customEvents.subscribe(
      (event) => {
        const newEvent = {
          app_id: 'app16973',
          custom_event: {
            payload: {payment: 'received'},
            request_id: event.custom_event.request_id,
            type: 'event',
          },
        };
        Boxo.customEvents.send(newEvent);
      },
      () => {},
    );
    const paymentEventsSubscription = Boxo.paymentEvents.subscribe(
      (event) => {
        const newEvent = {
          app_id: event.app_id,
          payment_event: {
            ...event.payment_event,
            status: 'success'
          },
          };
        Boxo.paymentEvents.send(newEvent);
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
    Boxo.openMiniapp('app16973',
     {
      data:{ title:'test' },
      extraUrlParams:{
        key1: 'value1',
        key2: 'value2'
      }, 
      colors: {
        primaryColor: '#000000', 
        secondaryColor: '#FF0000', 
        tertiaryColor: '#FFFF00'
      },
      enableSplash: true,
      pageAnimation: 'RIGHT_TO_LEFT'
    }); //launch miniapp by id
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
