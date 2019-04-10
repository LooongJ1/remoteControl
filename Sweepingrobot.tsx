import React from "react";
import { AppRegistry, View, Text, SectionList,TouchableOpacity,Image } from "react-native";
import Sweepingrobotdata from './Sweepingrobotdata'
import img from './img'

class Sweepingrobot extends React.Component {
    props: any;

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerTitle:'扫地机器人品牌'
    }

    _renderItem = info => {
        var txt =info.item.title;
        // var icon = info.item.icon
        return (
        <TouchableOpacity 
            activeOpacity={0.5} 
            style={{flexDirection:'row'}} 
            onPress={() => {this.props.navigation.navigate('SweepingrobotControl',{title:txt,what:'扫地机器人'})}}
        >
            <Image style={{width:130,height:60}} source={img['png'+txt]}/>
            <Text
                style={{
                height: 50, 
                textAlignVertical: "center",
                backgroundColor: "#ffffff",
                color: "#5C5C5C",
                fontSize: 15
                }}
            >
                {txt}
            </Text>
        </TouchableOpacity>
        );
    };

    _sectionComp = info => {
        var headtxt = "  " + info.section.key;
        return (
        <Text
            style={{
            height: 20,
            // textAlign: "center",
            textAlignVertical: "center",
            backgroundColor: "#CFCFCF",
            color: "#1C1C1C",
            fontSize: 15
            }}
        >
            {headtxt}
        </Text>
        );
    };

    _keyExtractor = (item, index) => index;

    render() {
        return (
        <View style={{ 
            flex: 1 ,                            
            height: 33
            }}>
            <SectionList
                renderSectionHeader={this._sectionComp}
                renderItem={this._renderItem}
                sections={Sweepingrobotdata.sections}
                keyExtractor={this._keyExtractor}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 1, backgroundColor: "#CFCFCF" }} />
                )}
            />
        </View>
        );
    }
}

// AppRegistry.registerComponent('App', () => HomeScreen);
export default Sweepingrobot;
