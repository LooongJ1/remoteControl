import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { TabBar, Icon } from '@ant-design/react-native/lib';

class HelloWorldApp extends React.Component {
  constructor(props) {
    super(props);
  }

  public styles = StyleSheet.create({
    view:{
      
    }
  })
  render() {
    return (
      <View style={this.styles.view}>
        <Text>请先选择所需要控制的物品</Text>
      </View>

    );
  }
}
// AppRegistry.registerComponent('HelloWorldApp', () => HelloWorldApp);
export default HelloWorldApp;