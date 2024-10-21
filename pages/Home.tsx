/*CORE*/
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, View, Text, Image, ScrollView, Pressable } from 'react-native';
/*LIBS*/
import appboxosdk, { MiniappData } from '@appboxo/react-native-sdk';

interface Props {
  navigation: any;
}

export default function Home({ navigation }: Props) {
    const [miniapps, setMiniapps] = useState<MiniappData[]>([]);

    useEffect(() => {
        const miniappListSubscription = appboxosdk.miniapps.subscribe((miniapps: MiniappData[]) => {
            setMiniapps(miniapps);
        }, (error) => {
            console.log(error)
        },
        );

        appboxosdk.setConfig('352131', {
            enableMultitaskMode: true,
            sandboxMode: false,
            isDebug: true,
            showClearCache: false,
            showPermissionsPage: false
         }); // set your Appboxo client id, sandbox mode, and multitask mode

        appboxosdk.getMiniapps();
        const customEventsSubscription = appboxosdk.customEvents.subscribe(
          (event) => {
            const newEvent = {
              app_id: 'app16973',
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
        const lifecycleHooksSubscription = appboxosdk.lifecycleHooksListener({
          onLaunch: (appId: string) => console.log(appId, 'onLaunch'),
          onResume: (appId: string) => console.log(appId, 'onResume'),
          onClose: (appId: string) => console.log(appId, 'onClose'),
          onPause: (appId: string) => console.log(appId, 'onPause'),
          onAuth: (appId: string) => {
            console.log(appId, 'onAuth');

            fetch('https://demo-hostapp.appboxo.com/api/get_auth_code/')
            .then((response) => {
              if (!response.ok) {
                console.error('Error fetching auth code:', error);
                appboxosdk.setAuthCode(appId, '');
              }
              return response.json();
            })
            .then((data) => {
              appboxosdk.setAuthCode(appId, data.auth_code);
            })
          },
          onError: (appId: string, error: string) =>
            console.log(appId, 'onError', error),
        });
        return () => {
            miniappListSubscription();
            lifecycleHooksSubscription();
            customEventsSubscription();
            paymentEventsSubscription();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Pressable 
                style={styles.button} 
                onPress={() => navigation.navigate('FirstScreen')}>
                <Text style={styles.buttonText}>Go to first screen</Text>           
            </Pressable>
            <Pressable 
                style={styles.button} 
                onPress={() => navigation.navigate('SecondScreen')}>
                <Text style={styles.buttonText}>Go to second screen</Text>           
            </Pressable>
            <Pressable 
                style={styles.button} 
                onPress={() => navigation.navigate('ThirdScreen')}>
                <Text style={styles.buttonText}>List of products</Text>           
            </Pressable>
            <Text style={styles.miniappsTitle}>My miniapps</Text>
            <ScrollView style={styles.scrollContainer}>
                {miniapps.length > 0 &&
                    miniapps.map((app, index) => (
                        <View key={index}>
                          <Pressable style={styles.miniappContainer} onPress={()=>{appboxosdk.openMiniapp(app.app_id, {theme:'dark', data: {title:'test'}})}}>
                              {app.logo && (
                                <Image source={{ uri: app.logo }} style={styles.logo}/>
                              )}
                            <Text style={styles.miniappTitle}>{app.name}</Text>
                            </Pressable>
                        </View>
                    ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'space-around',
    },
    scrollContainer: {
        flex: 1,
        width: '100%'
    },
    miniappContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    miniappTitle: {
        color: '#000000',
        marginStart: 16,
    },
    miniappsTitle: {
        color: 'black',
        textAlign:'left',
        marginHorizontal: 16,
        marginTop:32,
        marginBottom:16,
        fontSize:24
    },
    logo: {
        width: 50,
        height: 50,
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