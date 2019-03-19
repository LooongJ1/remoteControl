import React from "react";
import { View, Text, StyleSheet, Image, ListView,TouchableOpacity } from "react-native";
import { Button } from "@ant-design/react-native/lib";
import { any } from "prop-types";
const Tvdata = require("./Tvdata.json");

class Tv extends React.Component {
  public tvs = [];
  
  public dataBlob = {};
  
  public sectionIDs = [];

  public rowIDs = [];

  public jsonData = Tvdata.data;
  
  public dataSource = any;

  public state = {
    dataSource : any
  }

  public setState(dataSource){
    this.dataSource = dataSource
  }

  getInitialState() {
    const getSelectionData = (dataBlob, sectionID) => {
      return dataBlob[sectionID];
    };

    const getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[sectionID + ":" + rowID];
    };
    return {
      dataSource: new ListView.DataSource({
        getSectionData: getSelectionData,
        getRowData: getRowData,
        rowHasChanged: (r1, r2) => r1 != r2,
        sectionHeaderHasChanged: (s1, s2) => s1 != s2
      })
    };
  }

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
    },
    rowImageStyle:{
      width:70,
      height:70
    }
  });

  componentDidMount(){
    this.loadDataFromJson();
  }

  loadDataFromJson(){
    for (let l = 0; l<this.jsonData.lenth; l++) {
      this.sectionIDs.push(l);
      this.dataBlob[l] = this.jsonData[l].title;
      this.tvs = this.jsonData[l].tv; 
      this.rowIDs[l] = [];
      for (let i = 0 ; i<this.tvs.length;i++){
        this.rowIDs[l].push(i);
        this.dataBlob[l+':'+i] = this.tvs[i];
      }
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob,this.sectionIDs,this.rowIDs)
    });
  }
  render() {
    return (
      <View style={this.styles.view1}>
        <Text style={this.styles.text1}>请选择电视品牌</Text>
        <View style={this.styles.view2}>
          <ListView 
            dataSource={this.state.dataSource} 
            renderRow={this.renderRow}
            renderSectionHeader={this.renderSectionHeader}
          />
        </View>
      </View>
    );
  } 

  //每一行的数据
  renderRow(rowData){
    return(
      <TouchableOpacity activeOpacity={0.5}>
        <View style={this.styles.rowStyle}>
          <Image source={{uri: rowData.icon}} style={this.styles.rowImageStyle}/>
          <Text>{rowData.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  //每一组的数据
  renderSectionHeader(sectionData,sectionID){
    return(
      <View>
        <Text>{sectionData}</Text>
      </View>
    )
  }
}
// AppRegistry.registerComponent('HelloWorldApp', () => HelloWorldApp);
export default Tv;
