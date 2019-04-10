import {createStackNavigator,createAppContainer} from 'react-navigation'
import App from './App';
import Tv from './Tv';
import Air from './Air';
import Sweepingrobot from './Sweepingrobot'
import AirControl from './airControl'
import tvControl from './tvControl'
import SweepingrobotControl from './SweepingrobotControl'

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
    Sweepingrobot:{
        screen:Sweepingrobot
    },
    AirControl:{
        screen:AirControl
    },
    TvControl:{
        screen:tvControl
    },
    SweepingrobotControl:{
        screen:SweepingrobotControl
    }
},{
    initialRouteName:'App'
});

export default createAppContainer(AppJump);