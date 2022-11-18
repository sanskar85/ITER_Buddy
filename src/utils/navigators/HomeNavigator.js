import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HEADER_NONE_CONFIG} from './config/MainNavigator';
import HomeNavigatorBar from './config/HomeNavigatorBar';
import {TABS} from '../const';
import Dashboard from '../../screens/dashboard/Dashboard';
import Attendance from '../../screens/attendance/Attendance';
import Results from '../../screens/results/Results';

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={TABS.DASHBOARD}
      tabBar={props => <HomeNavigatorBar {...props} />}>
      <Tab.Screen
        name={TABS.DASHBOARD}
        component={Dashboard}
        options={HEADER_NONE_CONFIG}
      />
      <Tab.Screen
        name={TABS.ATTENDANCE}
        component={Attendance}
        options={HEADER_NONE_CONFIG}
      />
      <Tab.Screen
        name={TABS.RESULTS}
        component={Results}
        options={HEADER_NONE_CONFIG}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
