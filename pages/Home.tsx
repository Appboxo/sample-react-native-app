/*CORE*/
import React from 'react';
import {Button, StyleSheet, View, Text} from 'react-native';
/*LIBS*/
// import appboxosdk from '@appboxo/react-native-sdk';

interface Props {
  navigation: any;
}

export default function Home({navigation}: Props) {
  const [styling, setStyling] = React.useState({});
  // React.useEffect(() => {
  //   appboxosdk.setConfig('[client_id]', false); //set your Appboxo client id
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styling} >
        Click `Hit Me!!` button to make it crash when applying borderColor to Text :D
      </Text>
      <Button 
        title="Hit Me!!"
        onPress={() => {setStyling({borderColor: 'red', borderWidth: 1})}} />
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
