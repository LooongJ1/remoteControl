/**
 * @format
 */

import {AppRegistry} from 'react-native';
import HelloWorldApp from './App.tsx';
import {name as appName} from './app.json';
import Tv from './Tv.jsx'

AppRegistry.registerComponent(appName, () => Tv);
