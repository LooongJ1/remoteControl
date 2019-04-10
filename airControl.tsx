import React from "react";
import { AppRegistry, View, Text, StyleSheet,TouchableOpacity,Image,Dimensions,Switch } from "react-native";
import Air from "./Air";
const {width, height} = Dimensions.get('window');


class airControl extends React.Component {
    props: { navigation: any; };
    state: any;
    

    constructor(props) {
        super(props);
        this.state = {
            s:26,
            value:false,
            load:true,
            fx:'自动',
        }
    }

    componentDidMount(){
    }

    getUp = () => {
        if(this.state.s > 29){
            this.setState({
                load:false
            })
        }else{
            this.setState({
                s:this.state.s + 1
            })
        }
    }

    getOff = () => {
        if(this.state.s < 19){
            this.setState({
                load:false
            })
        }else{
            this.setState({
                s:this.state.s - 1
            })
        }
    }    

    getFx = () => {
        if(this.state.fx === '自动'){
            this.setState({
                fx:'上下',
            })
        }else{
            this.setState({
                fx:'自动'
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
        // const { navigation } = this.psrops;
        // const title = navigation.getParam('title');
        // const what = navigation.getParam('what');

        return (
            <View style={{
                flex:1
                }}>
                <View style={styles.viewStyle}>
                    {/* <Text>{title}{what}</Text> */}
                    <TouchableOpacity 
                    disabled = {this.state.load}
                    style={{flex:0.35,alignItems:'center',justifyContent: 'center'}}
                    // onPress={() => {this.setState({s: this.state.s - 1});}}
                    onPress={this.getOff}
                    >
                        <Text style={{fontWeight:'300',fontSize:30}}>
                            -
                        </Text>
                    </TouchableOpacity>
                    <View style={{flex:1,alignItems:'center',justifyContent: 'center'}}>
                        <Text style={{fontSize:100}}>
                            {this.state.s}℃
                        </Text>
                        <Text style={{fontSize:15}}>
                            风向:{this.state.fx}
                        </Text>
                    </View>
                    <TouchableOpacity 
                        disabled = {this.state.load}
                        style={{flex:0.35,alignItems:'center',justifyContent: 'center'}}
                        onPress={this.getUp}
                    >
                        <Text style={{fontWeight:'300',fontSize:30}}>
                            +
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width:width,height:height-250,flexDirection:'column'}}>
                    <View style={{ width:width,height:70,flexDirection:'row',justifyContent:'center'}}>
                        <Switch style={{ 
                            transform: [{ scaleX: 2.1 }, { scaleY: 2.1}]
                            }} 
                            value={this.state.value} 
                            onValueChange={(value) => {this.setState({value: value,load:!value})}}/>
                    </View>
                    <View style={{width:width,height:100,flexDirection:'row',justifyContent:'center'}}>
                        <TouchableOpacity style={styles.buttonStyle} disabled = {!this.state.value} onPress={() => {this.setState({s:18})}}>
                            <Text style={{fontSize:19,textAlign:'center',color:'#fff'}}>制冷</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonStyle} disabled = {!this.state.value} onPress={() => {this.setState({s:30})}}>
                            <Text style={{fontSize:19,textAlign:'center',color:'#fff'}}>制热</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:width,height:100,flexDirection:'row',justifyContent:'center'}}>
                        <TouchableOpacity style={styles.buttonStyle} disabled = {!this.state.value} onPress={this.getFx}>
                            <Text style={{fontSize:19,textAlign:'center',color:'#fff'}}>风向</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    buttonStyle:{
        margin:40,
        alignItems:'center',
        justifyContent:'center',
        width: 50,
        height:50,
        backgroundColor:'#5e616d',
        borderRadius:30,
        paddingBottom:2    
    },
    viewStyle:{
        width:width,
        height:250,
        backgroundColor:'#63bbd0',
        flexDirection:'row'
    }
  })
export default airControl;
