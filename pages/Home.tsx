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

        appboxosdk.setConfig('602248', true, false); // set your Appboxo client id, sandbox mode, and multitask mode

        appboxosdk.getMiniapps();

        return () => {
            miniappListSubscription();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Button
                title="Go to first screen"
                onPress={() => navigation.navigate('FirstScreen')}
            />
            <Button
                title="Go to second screen"
                onPress={() => navigation.navigate('SecondScreen')}
            />
            <ScrollView style={styles.scrollContainer}>
                {miniapps.length > 0 &&
                    miniapps.map((app, index) => (
                        <View key={index}>
                          <Pressable style={styles.miniappContainer} onPress={()=>{appboxosdk.openMiniapp(app.app_id)}}>
                              {app.logo && (
                                <Image source={{ uri: app.logo }} style={styles.logo}/>
                              )}
                            <Text>{app.name}</Text>
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
        alignItems: 'center',
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
    logo: {
        width: 50,
        height: 50,
    },
});