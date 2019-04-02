import React from 'react';
import { View, Text, StyleSheet,Alert } from 'react-native';
import { Button } from '@ant-design/react-native/lib';
import Tv from './Tv';
import Air from './Air'

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    headerTitle:'万能遥控器',
}

  componentDidMount(){
    Alert.alert('警告','检测到手机无红外模块或未授于红外权限，功能可能无法正常使用')
  }

  render() {
    return (
      <View style={styles.view1}>
        <Text style={styles.text}>请选择所需要控制的物品</Text>
        <View style={styles.view2}>
          <Button type='primary' onPress={() => {this.props.navigation.navigate('Tv')}}>电视</Button>
          <Button type='primary' onPress={() => {this.props.navigation.navigate('Air')}}>空调</Button>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  view1:{
    flexDirection:'column',
    alignItems:'center',
    flex:1,
    margin:20
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
// AppRegistry.registerComponent('HelloWorldApp', () => HelloWorldApp);
export default App;