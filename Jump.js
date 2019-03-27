import {createStackNavigator,createAppContainer} from 'react-navigation'
import App from './App';
import Tv from './Tv';
import Air from './Air';
import Control from './control'

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
    Control:{
        screen:Control
    }
},{
    initialRouteName:'App'
});

export default createAppContainer(AppJump);