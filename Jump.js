import {createStackNavigator,createAppContainer} from 'react-navigation'
import App from './App';
import Tv from './Tv';
import Air from './Air';
import AirControl from './airControl'
import tvControl from './tvControl'

const AppJump = createStackNavigator({
    App:{
        screen:App
    },
    Tv :{
        screen:Tv
    },
    Air:{
        screen:Air
    },
    AirControl:{
        screen:AirControl
    },
    TvControl:{
        screen:tvControl
    }
},{
    initialRouteName:'App'
});

export default createAppContainer(AppJump);