import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import CameraPage from './CameraPage';

export default class App extends Component { {
  this.state = {
    accelerometerData: {},
    shake: false,
  };
  
  componentDidMount() {
    this._subscribe();
  }
  
  _subscribe = () => {
    // When invoked, the listener is provided a single argumument that is an object containing keys x, y, z.
    this._subscription = Accelerometer.addListener((accelerometerData) => {
      this.setState({ accelerometerData });
      this.getInQueue();
    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }
  
  getInQueue() {
    const { y } = this.state.accelerometerData;
    if (y > 0.7) {
      this.state.shake = true;
    }
  }
  
  render() {
      if(this.shake) {
              return (
                <View style={styles.container}>
                  <CameraPage></CameraPage>
                </View>
              );
      }
    else {
      return (
          <View style={styles.container}>
            <p>Shake Camera to take photo</p>
          </View>
        );
    }
  }
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
