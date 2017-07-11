import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import SendBird from 'sendbird';

const sb = null;
const APP_ID = 'CB66B4F1-F440-4859-BDC9-A18D534184E8';
const userId = 'email@email.com';
const accessToken = '0a14d402a18ca34d099d3dbb315ba89c38b63b3a';

export default class Root extends Component {
  
  async componentDidMount() {
    sb = new SendBird({appId: APP_ID});
    await sb.connect(userId, function(user, error) {
      console.log('user', user);
      sb.updateCurrentUserInfo('Update no App', function(response, error) {
        console.log('update user', response, error);
      });
    });

    console.log('sendbird', sb);
  } 

  createChannel(){
    var userIds = ['email@email.com', '654321'];
    // distinct is false 
    sb.GroupChannel.createChannelWithUserIds(userIds, false, 'Dr. XMen', '', '', function(createdChannel, error) {
        if (error) {
            console.error(error);
            return;
        }
        console.log('created Channel',createdChannel);
    });
  }

  getChannels() {
    const channelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
    channelListQuery.includeEmpty = true;
    channelListQuery.limit = 20; // pagination limit could be set up to 100

    if (channelListQuery.hasNext) {
        channelListQuery.next(function(channelList, error){
            if (error) {
                console.error(error);
                return;
            }

            console.log('### Channels ###',channelList);
        });
    }
  }

  sendMessage() {
      sb.GroupChannel.getChannel('sendbird_group_channel_34516608_d401d69954b03090fda480da14283c39114f51c6', function(channel, error) {
      if (error) {
          console.error(error);
          return;
      }

      // Successfully fetched the channel.
      console.log(channel);
      channel.sendUserMessage('Minha mensagem 2', '', '', function(message, error){
      if (error) {
          console.error(error);
          return;
      }
      console.log(message);
    });
  });
}

getOldMessages(){
  sb.GroupChannel.getChannel('sendbird_group_channel_34516608_d401d69954b03090fda480da14283c39114f51c6', function(channel, error) {
      if (error) {
          console.error(error);
          return;
      }
      var messageListQuery = channel.createPreviousMessageListQuery();
      messageListQuery.load(30, true, function(messageList, error){
        if (error) {
            console.error(error);
            return;
        }
        console.log(messageList);
        messageList.forEach(msg => {
          console.log(msg._sender.nickname, msg.message);
        })
      }); 
  });
}


// sendbird_group_channel_34516608_d401d69954b03090fda480da14283c39114f51c6
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Módulo
        </Text>
        <Text style={styles.instructions}>
          <TouchableOpacity style={styles.text} onPress={this.createChannel}>
            <Text>Criar Sala</Text>
          </TouchableOpacity>
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Text style={styles.instructions}>
          <TouchableOpacity style={styles.text} onPress={this.getChannels}>
            <Text>Pegar Channels</Text>
          </TouchableOpacity>
        </Text>
        <Text style={styles.instructions}>
          <TouchableOpacity style={styles.text} onPress={this.sendMessage}>
            <Text>Enviar Mensagem</Text>
          </TouchableOpacity>
        </Text>
        <Text style={styles.instructions}>
          <TouchableOpacity style={styles.text} onPress={this.getOldMessages}>
            <Text>recuperar mensagens antigas</Text>
          </TouchableOpacity>
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
  text: {
    height: 80,
    width: 200
  }
});
