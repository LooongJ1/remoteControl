import React from "react";
import { AppRegistry, View, Text, SectionList,TouchableOpacity,StyleSheet,Dimensions,Button } from "react-native";
import { number } from "prop-types";
const {width, height} = Dimensions.get('window');
const BadgeData = {data: [{title: "1"},{title: "2"},{title: "3"},{title: "4"},{title: "5"},{title: "6"},{title: "7"},{title: "8"},{title: "9"},{title: "*"},{title: "0"},{title: "#"}]}

class SweepingrobotControl extends React.Component {
    props: { navigation: any; };
    state: any;
    

    constructor(props) {
        super(props);
        this.state = {
            s:true,
            i:'▶',
            d:'正在充电',
            g:'未启动',
            m:'自动'
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
                i:'| |',
                g:'工作中',
                d:'正在放电'
            })
        }else{
            this.setState({
                i:'▶',
                g:'未启动'
            })
        }
    }

    ms = () => {
        if (this.state.m == '自动') {
            this.setState({
                m:'区域'
            })
        } else if(this.state.m == '区域'){
            this.setState({
                m:'沿边'
            })
        } else if(this.state.m == '沿边'){
            this.setState({
                m:'自动'
            })
        }
    }

    dl = () => {
        this.setState({
            d:'正在充电'
        })
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
        return (
            <View style={{
                flex:1,
                width:width,
                height:height,
                alignItems:'center',
                justifyContent:'center'
                }}>
                    <View style={{ 
                        width:180,
                        height:62,
                        borderColor:'#b2bbbe',
                        borderWidth:2
                        }}>
                        <Text style={{color:'#5cb3cc'}}>{this.state.g}</Text>
                        <Text style={{color:'#5cb3cc'}}>电量:{this.state.d}</Text>
                        <Text style={{color:'#5cb3cc'}}>模式:{this.state.m}</Text>
                    </View>
                    <View style={{ width:width,height:320,alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity style={styles.buttonStyle} onPress={this.getOff}>
                                <Text style={{fontSize:19,textAlign:'center',color:'#fff'}}>{this.state.i}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width:width,height:100,flexDirection:'row',justifyContent:'space-evenly'}}>
                        <TouchableOpacity style={{ width:75,height:40,justifyContent:'center',alignItems:'center',backgroundColor:'#7cabb1',borderRadius:30}} onPress={this.ms}>
                            <Text>模式切换</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width:75,height:40,justifyContent:'center',alignItems:'center',backgroundColor:'#7cabb1',borderRadius:30}} onPress={this.dl}>
                            <Text>返回充电</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    buttonStyle:{
        alignItems:'center',
        justifyContent:'center',
        width: 70,
        height:70,
        backgroundColor:'#ee2746',
        borderRadius:40,
        paddingBottom:2    
    }})
export default SweepingrobotControl;
