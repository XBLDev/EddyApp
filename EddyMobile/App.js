/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing 
} from 'react-native';

import Animation from 'lottie-react-native';
import LottieAnimation from 'easy-lottie-react-native';

const easing = Easing.inOut(Easing.quad);

export default class App extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
    }).start();
  }


  render() {
    return (
      <View style={styles.container}>
          {/* <Animation
            style={{
              width: 200,
              height: 200,
            }}
            source={require('animations/LottieLogo1.json')}
            progress={this.state.progress}
         /> */}
         <LottieAnimation 
            style={{
              width: 200,
              height: 200,
            }}
            source={require('animations/Group 1 Image 12 Binoculars.json')} 
            loop 
            easing={easing} 
         />

      </View>
    );
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
