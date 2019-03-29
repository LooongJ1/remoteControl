import React from "react";
import { AppRegistry, View, Text, SectionList,TouchableOpacity,Image,Dimensions,Switch } from "react-native";
import Air from "./Air";
const {width, height} = Dimensions.get('window');


class tvControl extends React.Component {
    props: { navigation: any; };
    state: any;
    

    constructor(props) {
        super(props);
        this.state = {
            s:26
        }
    }

    // static navigationOptions = {
    //     headerTitle:'万能遥控器'
    // }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: params ? params.title + params.what : '万能遥控器'
        }
    };


    render() {
        // const { navigation } = this.props;
        // const title = navigation.getParam('title');
        // const what = navigation.getParam('what');

        return (
            <View style={{
                flex:1
                }}>
                <View style={{ width:width,height:250,backgroundColor:'#63bbd0',flexDirection:'row' }}>

                </View>
                <View style={{ width:width,height:height-250,flexDirection:'column'}}>
                    <View style={{ width:width,height:100,flexDirection:'row',justifyContent:'center'}}>
                        <Switch style={{ 
                            transform: [{ scaleX: 2.5 }, { scaleY: 2.5}]
                            }} 
                            value={this.state.value} 
                            onValueChange={(value) => {this.setState({value: value})}}/>
                    </View>

                </View>
            </View>
        );
    }
}

export default tvControl;
