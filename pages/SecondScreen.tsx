/*CORE*/
import React from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';
/*LIBS*/
// import appboxosdk from '@appboxo/react-native-sdk';

export default function SecondScreen() {
  // React.useEffect(() => {
  //   const customEventsSubscription = appboxosdk.customEvents.subscribe(
  //     (event) => {
  //       const newEvent = {
  //         app_id: 'app36902',
  //         custom_event: {
  //           error_type: 'canceled',
  //           payload: {},
  //           request_id: event.custom_event.request_id,
  //           type: 'event',
  //         },
  //       };
  //       appboxosdk.customEvents.send(newEvent);
  //     },
  //     () => {},
  //   );

  //   const lifecycleHooksSubscription = appboxosdk.lifecycleHooksListener({
  //     onLaunch: (appId: string) => console.log(appId, 'onLaunch'),
  //     onResume: (appId: string) => console.log(appId, 'onResume'),
  //     onClose: (appId: string) => console.log(appId, 'onClose'),
  //     onPause: (appId: string) => console.log(appId, 'onPause'),
  //     onError: (appId: string, error: string) =>
  //       console.log(appId, 'onError', error),
  //   });

  //   return () => {
  //     console.log('destroy second');
  //     lifecycleHooksSubscription();
  //     customEventsSubscription();
  //   };
  // }, []);

  const handleOpenMiniapp = () => {
    appboxosdk.openMiniapp('app36902', ''); //launch miniapp by id with auth payload
  };

  return (
    <View style={styles.container}>
      <Text style={{marginBottom: 20, fontSize: 24}}>
        All purchases will be declined
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
