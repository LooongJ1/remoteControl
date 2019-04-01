import React from "react";
import { AppRegistry, View, Text, SectionList,TouchableOpacity,StyleSheet,Dimensions,Button } from "react-native";
import Air from "./Air";
import { number } from "prop-types";
const {width, height} = Dimensions.get('window');
const BadgeData = {data: [{title: "1"},{title: "2"},{title: "3"},{title: "4"},{title: "5"},{title: "6"},{title: "7"},{title: "8"},{title: "9"},{title: "*"},{title: "0"},{title: "#"}]}

class tvControl extends React.Component {
    props: { navigation: any; };
    state: any;
    

    constructor(props) {
        super(props);
        this.state = {
            s:true,
            i:'开'
        }
    }

    componentDidMount(){
    }

    getOff = () => {
        this.setState({
            s:!this.state.s
        })
        if(this.state.s == true){
            this.setState({
                i:'关'
            })
        }else{
            this.setState({
                i:'开'
            })
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
                <View style={{ width:width,height:250,backgroundColor:'#63bbd0' }}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.getOff}>
                            <Text style={{fontSize:19,textAlign:'center',color:'#fff'}}>{this.state.i}</Text>
                    </TouchableOpacity>
                    <View style={{ width:width,flexDirection:'row',justifyContent:'space-evenly',marginTop:30}}>
                        <View>
                            <Button
                                title='频道+'
                            />
                            <Button
                                title='频道-'
                            />
                        </View>
                        <View>
                            <Button
                                title='音量+'
                            />
                            <Button
                                title='音量-'
                            />
                        </View>
                    </View>
                </View>
                <View style={{ width:width,height:height-250,flexDirection:'row',flexWrap: 'wrap',justifyContent:'center'}}>
                    {this.renderAllBadge()}
                </View>
            </View>
        );
    }

    renderAllBadge(){
        let allBadge = [];
        // let num:['1','2','3','4','5','6','7','8','9','*','0','#'];
        for (let i = 0; i < BadgeData.data.length; i++){
            var numb = BadgeData.data[i]
            allBadge.push(
                <TouchableOpacity key={i} style={styles.numStyle}>
                    <Text>{numb.title}</Text>
                </TouchableOpacity>
            )
        }
        return allBadge;
    }
}
const styles = StyleSheet.create({
    buttonStyle:{
        margin:20,
        alignItems:'center',
        justifyContent:'center',
        width: 50,
        height:50,
        backgroundColor:'#ee2746',
        borderColor:'green',
        borderStyle:'solid',
        borderRadius:30,
        paddingBottom:2    
    },
    numStyle:{
        backgroundColor:'#e2e1e4',
        width:80,
        height:40,
        margin:20,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:30,
    }})
export default tvControl;
