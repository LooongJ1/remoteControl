import React from "react";
import { AppRegistry, View, Text, SectionList,TouchableOpacity,Image } from "react-native";
import Airdata from './Airdata'
import Control from './control'
import img from './img'

class Air extends React.Component {
    props: any;

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerTitle:'空调品牌'
    }

    _renderItem = info => {
        var txt =info.item.title;
        // var icon = info.item.icon
        return (
        <TouchableOpacity 
            activeOpacity={0.5} 
            style={{flexDirection:'row'}} 
            onPress={() => {this.props.navigation.navigate('Control',{title:txt,what:'空调'})}}
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
            {/* <Text style={{ fontSize: 23, color: "#1C1C1C",textAlign:'center' }}>空调品牌</Text> */}
            <SectionList
                renderSectionHeader={this._sectionComp}
                renderItem={this._renderItem}
                sections={Airdata.sections}
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
export default Air;
