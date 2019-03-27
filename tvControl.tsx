import React from "react";
import { AppRegistry, View, Text, SectionList,TouchableOpacity,Image } from "react-native";
import Air from "./Air";


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
                flexDirection: "row",
                flex:1
                }}>
                <View style={{ flex:1,height:250,backgroundColor:'#63bbd0',flexDirection:'row' }}>
                    
                </View>
                <View>
                    
                </View>
            </View>
        );
    }
}

export default tvControl;
