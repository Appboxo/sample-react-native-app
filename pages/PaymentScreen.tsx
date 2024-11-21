/*CORE*/
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, View, Text, Image, ScrollView, Pressable } from 'react-native';
/*LIBS*/
import appboxosdk from '@appboxo/react-native-sdk';


interface Props {
  navigation: any;
}
export default function PaymentScreen({ navigation, route }: Props) {
  var event;

  React.useEffect(() => {
    event = route.params;
    //payment data
    const appId = event.app_id;
    const paymentEvent = event.payment_event;
    const transactionToken = paymentEvent.transaction_token;
    const amount = paymentEvent.amount;
    const currency = paymentEvent.currency;
    const extraParams = paymentEvent.extra_params;

    return () => {

    };
  }, []);

  const payClick = () =>{
      navigation.goBack();
      // after payment is completed
      // open the hidden miniapp by id and send result to miniapp
      appboxosdk.openMiniapp(event.app_id);
      const resultEvent = {
                    app_id: event.app_id,
                    payment_event: {
                      ...event.payment_event,
                      status: 'Success'
                    },
                  };
      appboxosdk.paymentEvents.send(resultEvent);
  }
  const cancelClick = () =>{
        navigation.goBack();
        appboxosdk.openMiniapp(event.app_id);
        const resultEvent = {
                       app_id: event.app_id,
                       payment_event: {
                         ...event.payment_event,
                         status: 'cancelled'
                       },
                     };
        appboxosdk.paymentEvents.send(resultEvent);
  }

  return (
    <View style={styles.container}>
                <Pressable
                    style={styles.button}
                    onPress={ payClick }>
                    <Text style={styles.buttonText}>Pay</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={ cancelClick }>
                    <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>

            </View>
  );
}

const styles = StyleSheet.create({
   container: {
          flex: 1,
          flexDirection: 'column',
          backgroundColor: '#fff',
          justifyContent: 'center',
      },
  button: {
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 6,
          elevation: 3,
          marginTop: 16,
          marginLeft: 16,
          marginRight: 16,
          backgroundColor: 'blue',
      },
  buttonText: {
          color: 'white',
          fontSize: 16,
      },
});
