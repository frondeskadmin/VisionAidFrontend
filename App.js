import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import CameraPage from './CameraPage';

export default function App() {
  return (
    <View style={styles.container}>
      <CameraPage></CameraPage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
