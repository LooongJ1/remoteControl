/**
 * @format
 */

import {AppRegistry} from 'react-native';
import HelloWorldApp from './App';
import {name as appName} from './app.json';
import Tv from './Tv'

AppRegistry.registerComponent(appName, () => Tv);
