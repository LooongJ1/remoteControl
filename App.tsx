import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@ant-design/react-native/lib';
import Tv from './Tv';

class HelloWorldApp extends React.Component {
  constructor(props) {
    super(props);
  }

  public styles = StyleSheet.create({
    view1:{
      flexDirection:'column',
      alignItems:'center',
      flex:1
    },
    text:{
      fontSize:20,
    },
    view2:{
      justifyContent:'space-around',
      flex:1,
      // backgroundColor:"#3399cc"
    }
  })
  render() {
    return (
      <View style={this.styles.view1}>
        <Text style={this.styles.text}>请选择所需要控制的物品</Text>
        <View style={this.styles.view2}>
          <Button type='primary' onPress={() => Tv}>电视</Button>
          <Button type='primary'>空调</Button>
        </View>
      </View>

    );
  }
}
// AppRegistry.registerComponent('HelloWorldApp', () => HelloWorldApp);
export default HelloWorldApp;