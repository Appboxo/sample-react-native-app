/*CORE*/
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
/*LIBS*/
import appboxosdk from '@appboxo/react-native-sdk';

interface Props {
  navigation: any;
}

export default function Home({navigation}: Props) {
  React.useEffect(() => {
    appboxosdk.setConfig('602248', false); //set your Appboxo client id
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
});
