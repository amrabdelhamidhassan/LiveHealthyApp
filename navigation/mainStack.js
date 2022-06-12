import { createStackNavigator } from '@react-navigation/stack';
import { useState,useEffect } from 'react';
import AddFoodScreen from '../screens/AddFoodScreen';
import GroupMealScreen from '../screens/GroupMealScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MainHeader from '../components/MainHeader';
import HomeScreen from '../screens/HomeScreen';
import LoadingScreen from '../screens/LoadingScreen';
import { store } from '../store/store';
import SignUpScreen from '../screens/SignUpScreen';
import EditInfoScreen from '../screens/EditInfoScreen';

import { useSelector } from 'react-redux';

export default function MainStack() {
  const Stack = createStackNavigator();
  const isLogin=useSelector((state) => state.userReducer.user);
  const Data=useSelector((state) => state.activitiesReducer.activities);

  return (
    <>
     {Data.length<=0 ? 
          <Stack.Navigator screenOptions={
            {header:()=><MainHeader/>}
          }>
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
    
        </Stack.Navigator> :
  
     isLogin ?
     <Stack.Navigator screenOptions={
        {header:()=><MainHeader/>}
      }>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="GroupMealScreen" component={GroupMealScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="AddFoodScreen" component={AddFoodScreen} />
        <Stack.Screen name="EditInfoScreen" component={EditInfoScreen} />

    </Stack.Navigator>
    :
    <Stack.Navigator screenOptions={
      {header:()=><MainHeader/>}
    }>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />

    </Stack.Navigator>   
    }
    </>
  
  );

}
