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

        appboxosdk.setConfig('602248', { 
            enableMultitaskMode: false, 
            sandboxMode: false,
            isDebug: true,
            showClearCache: false,
            showPermissionsPage: false
         }); // set your Appboxo client id, sandbox mode, and multitask mode

        appboxosdk.getMiniapps();

        return () => {
            miniappListSubscription();
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