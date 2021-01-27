/*CORE*/
import React from 'react';
import {Button, StyleSheet, View, Text} from 'react-native';
/*LIBS*/
import appboxo from '@appboxo/react-native-sdk-test';

interface Props {
  navigation: any;
}

export default function Home({navigation}: Props) {
  const [styling, setStyling] = React.useState({});

  React.useEffect(() => {
    appboxo.setConfig('237183', true, 'light'); //set your Appboxo client id
  }, []);

  console.log(styling, 'styling');

  return (
    <View style={styles.container}>
      <Text style={styling}>
        Click `Hit Me!!` button to make it crash when applying borderColor to
        Text :D
      </Text>
      <Button
        title="Set styling"
        onPress={() =>
          setStyling({
            borderWidth: 2,
            borderColor: 'red',
          })
        }
      />
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
    borderWidth: 2,
    justifyContent: 'space-around',
  },
  text: {
    borderWidth: 2,
    borderColor: 'red',
  },
});
