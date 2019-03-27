import React from "react";
import { AppRegistry, View, Text, SectionList,TouchableOpacity,Image } from "react-native";
import Air from "./Air";


class Control extends React.Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerTitle:'万能遥控器'
    }

    render() {
        const { navigation } = this.props;
        const title = navigation.getParam('title');
        const what = navigation.getParam('what');
        return (
            <View style={{
                flexDirection: "row",
                flex:1
                }}>
                <View style={{ backgroundColor: "blue", flex: 1 }}>
                    <Text>{title}{what}</Text>
                </View>
                <View>

                </View>
            </View>
        );
    }
}

export default Control;
