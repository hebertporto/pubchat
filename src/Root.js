import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import SendBird from 'sendbird';

const sb = null;
const APP_ID = 'CB66B4F1-F440-4859-BDC9-A18D534184E8';

export default class Root extends Component {
  
  componentDidMount() {
    sb = new SendBird({appId: APP_ID});
    console.log('sendbird', sb);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Módulo
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
