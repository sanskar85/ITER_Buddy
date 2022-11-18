import React from 'react';
import {SCREEN} from '../const';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
const Stack = createNativeStackNavigator();

import {HEADER_NONE_CONFIG} from './config/MainNavigator';
import Splash from '../../screens/splash/Splash';
import Login from '../../screens/login/Login';
import Home from '../../screens/home/Home';
import Notice from '../../screens/notice/Notice';
import Holidays from '../../screens/holidays/Holidays';
import NoticeViewer from '../../screens/notice/NoticeViewer';
import Profile from '../../screens/profile/Profile';
import Materials from '../../screens/materials/Materials';
import SubjectSelector from '../../screens/subject_selector/SubjectSelector';

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREEN.SPLASH}>
        <Stack.Screen
          name={SCREEN.SPLASH}
          component={Splash}
          options={HEADER_NONE_CONFIG}
        />
        <Stack.Screen
          name={SCREEN.LOGIN}
          component={Login}
          options={HEADER_NONE_CONFIG}
        />
        <Stack.Screen
          name={SCREEN.HOME}
          component={Home}
          options={HEADER_NONE_CONFIG}
        />
        <Stack.Screen
          name={SCREEN.NOTICE}
          component={Notice}
          options={HEADER_NONE_CONFIG}
        />
        <Stack.Screen
          name={SCREEN.NOTICE_VIEWER}
          component={NoticeViewer}
          options={HEADER_NONE_CONFIG}
        />
        <Stack.Screen
          name={SCREEN.HOLIDAYS}
          component={Holidays}
          options={HEADER_NONE_CONFIG}
        />
        <Stack.Screen
          name={SCREEN.PROFILE}
          component={Profile}
          options={HEADER_NONE_CONFIG}
        />
        <Stack.Screen
          name={SCREEN.MATERIALS}
          component={Materials}
          options={HEADER_NONE_CONFIG}
        />
        <Stack.Screen
          name={SCREEN.SUBJECTS_SELECTOR}
          component={SubjectSelector}
          options={HEADER_NONE_CONFIG}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
