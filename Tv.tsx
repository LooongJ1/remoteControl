import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Button } from "@ant-design/react-native/lib";

class Tv extends React.Component {
  constructor(props) {
    super(props);
  }

  public styles = StyleSheet.create({
    view1: {
      flexDirection: "column",
      alignItems: "center",
      flex: 1
    },
    view2: {
      justifyContent: "space-around",
      flex: 1
      // backgroundColor:"#3399cc"
    },
    text1: {
      fontSize: 20
    },
    text2: {
      fontSize: 15
    }
  });
  render() {
    return (
      <View style={this.styles.view1}>
        <Text style={this.styles.text1}>请选择电视品牌</Text>
        <View style={this.styles.view2}>
          <FlatList
            // ItemSeparatorComponent={true}
            data={[{ key: "a", title: "三星" }, { key: "b", title: "海信" },{ key: "b", title: "飞利浦" },{ key: "b", title: "海信" },{ key: "b", title: "LG" },{ key: "b", title: "酷开" },{ key: "b", title: "夏普" },{ key: "b", title: "TCL" },{ key: "b", title: "创维" },{ key: "b", title: "索尼" },{ key: "b", title: "乐视" },{ key: "b", title: "聚力/PPTV"},{ key: "b", title: "海尔" },{ key: "b", title: "清华同方" },{ key: "b", title: "东芝" },{ key: "b", title: "松下" },{ key: "b", title: "AOC" },{ key: "b", title: "联想" },{ key: "b", title: "熊猫" },{ key: "b", title: "苹果" },{ key: "b", title: "康佳" },{ key: "b", title: "JVC" },{ key: "b", title: "夏新" },{ key: "b", title: "现代" },{ key: "b", title: "努比亚" },{ key: "b", title: "富可视" },{ key: "b", title: "HKC" },{ key: "b", title: "创维" }]}
            renderItem={({ item }) => (
            <View>
              <Text style={this.styles.text2}>{item.title}</Text>
            </View>
            )}
          />
        </View>
      </View>
    );
  }
}
// AppRegistry.registerComponent('HelloWorldApp', () => HelloWorldApp);
export default Tv;
