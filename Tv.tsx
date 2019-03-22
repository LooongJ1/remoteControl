import React from "react";
import { AppRegistry, View, Text, SectionList,TouchableOpacity,Image } from "react-native";

class Tv extends React.Component {

    constructor(props) {
        super(props);
    }

    _renderItem = info => {
        var txt = "  " + info.item.title;
        var icon = "  " + info.item.icon;
        return (
        <TouchableOpacity activeOpacity={0.5}>
            <Image source={{uri:icon}}/>
            <Text
                style={{
                height: 80,
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
        var sections = [
        { key: "A", data: [{ title: "AOC", icon: "" },{title:'艾洛维',icon:''}] },
        { key: "B", data: [{ title: "暴风TV", icon: "" }] },
        { key: "C", data: [{ title: "创维", icon: "" },{ title: "创佳", icon: "" },{ title: "长虹", icon: "" }] },
        { key: "D", data: [{ title: "东芝", icon: "" }] },
        { key: "E", data: [{ title: "", icon: "" }] },
        {
            key: "F",
            data: [{ title: "风行", icon: "" }, { title: "富可视", icon: "" }, { title: "飞利浦", icon: "" }]
        },
        { key: "G", data: [{ title: "", icon: "" }] },
        {
            key: "H",
            data: [
            { title: "HKC", icon: "" },
            { title: "海信", icon: "" },
            { title: "海尔", icon: "" }
            ]
        },
        { key: "I", data: [{ title: "", icon: "" }] },
        {
            key: "J",
            data: [{ title: "JVC", icon: "" }, { title: "聚力", icon: "" },{title:'京东方',icon:''}]
        },
        {
            key: "K",
            data: [{ title: "酷开", icon: "" }, { title: "康佳", icon: "" }]
        },
        {
            key: "L",
            data: [
            { title: "LG", icon: "" },
            { title: "乐视", icon: "" },
            { title: "联想", icon: "" },
            { title: "雷鸟", icon: "" }
            ]
        },
        { key: "M", data: [{ title: "", icon: "" }] },
        { key: "N", data: [{ title: "努比亚", icon: "" }] },
        { key: "O", data: [{ title: "", icon: "" }] },
        {
            key: "P",
            data: [{ title: "PPTV", icon: "" }, { title: "苹果", icon: "" }]
        },
        { key: "Q", data: [{ title: "清华同方", icon: "" }] },
        { key: "R", data: [{ title: "", icon: "" }] },
        {
            key: "S",
            data: [
            { title: "三星", icon: "" },
            { title: "索尼", icon: "" },
            { title: "松下", icon: "" }
            ]
        },
        { key: "T", data: [{ title: "TCL", icon: "" }] },
        { key: "U", data: [{ title: "", icon: "" }] },
        { key: "V", data: [{ title: "", icon: "" }] },
        { key: "W", data: [{ title: "微鲸", icon: "" }] },
        {
            key: "X",
            data: [
            { title: "夏普", icon: "" },
            { title: "夏新", icon: "" },
            { title: "熊猫", icon: "" },
            { title: "现代", icon: "" }
            ]
        },
        { key: "Y", data: [{ title: "", icon: "" }] },
        { key: "Z", data: [{ title: "", icon: "" }] }
        ];

        return (
        <View style={{ 
            flex: 1 ,                            
            height: 33
            }}>
            <Text style={{ fontSize: 23, color: "#1C1C1C",textAlign:'center' }}>电视品牌</Text>
            <SectionList
                renderSectionHeader={this._sectionComp}
                renderItem={this._renderItem}
                sections={sections}
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
export default Tv;
