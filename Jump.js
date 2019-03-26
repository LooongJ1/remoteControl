import {createStackNavigator,createAppContainer} from 'react-navigation'
import App from './App';
import Tv from './Tv';
import Air from './Air';

const AppJump = createStackNavigator({
    App:{
        screen:App
    },
    Tv :{
        screen:Tv
    },
    Air:{
        screen:Air
    }
},{
    initialRouteName:'App'
});

export default createAppContainer(AppJump);