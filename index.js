/**
 * @format
 */

import {AppRegistry} from 'react-native';
import HelloWorldApp from './App';
import {name as appName} from './app.json';
import Tv from './Tv'
import Air from './Air'
// import {StackNavigator} from 'react-navigation';


// const jump = StackNavigator({
//     Tv:{screen:Tv},
//     Air:{screen:Air}
//   })

AppRegistry.registerComponent(appName, () => Air);
