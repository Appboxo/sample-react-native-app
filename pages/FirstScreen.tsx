/*CORE*/
import React from 'react';
import {Button, StyleSheet, View, Text} from 'react-native';
/*LIBS*/
// import appboxosdk from '@appboxo/react-native-sdk';

export default function FirstScreen() {
  // React.useEffect(() => {
  //   const customEventsSubscription = appboxosdk.customEvents.subscribe(
  //     (event) => {
  //       const newEvent = {
  //         app_id: 'app36902',
  //         custom_event: {
  //           payload: {payment: 'received'},
  //           request_id: event.custom_event.request_id,
  //           type: 'event',
  //         },
  //       };
  //       appboxosdk.customEvents.send(newEvent);
  //     },
  //     () => {},
  //   );
  //   return () => {
  //     console.log('destroy first');
  //     customEventsSubscription();
  //   };
  // }, []);

  const handleOpenMiniapp = () => {
    appboxosdk.openMiniapp('app36902', ''); //launch miniapp by id with auth payload
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
