/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import PubNub from 'pubnub'

export default class pubchat extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const pubnub = new PubNub({
    subscribeKey: "sub-c-a2bdf540-630e-11e7-b272-02ee2ddab7fe",
    publishKey: "pub-c-94d21a8f-be7c-48aa-b7fb-9a0da78e81ac",
    secretKey:"sec-c-ZjU0YzE1YTEtYTA1YS00OTI4LWE0NjMtYzM5NzU5YmRiMjgz",
});

pubnub.addListener({
    message: function(message) {
        console.log(message);
        // handle message
    }
})

pubnub.subscribe({ 
    channels: ['girish'] 
});

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

AppRegistry.registerComponent('pubchat', () => pubchat);
