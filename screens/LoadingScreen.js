import { StyleSheet, Text, View,TouchableOpacity,ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SideMenu from '../components/SideMenu';
import { colors } from '../constants/colors';
import MainHeader from '../components/MainHeader';
import MainText from '../components/MainText';
import { RFValue } from 'react-native-responsive-fontsize';
import GroupMealsDiv from '../components/GroupMealsDiv';
import { getAllActivitiesApi,ActivitiesAction } from '../services/userServices';
import { store } from '../store/store';
import { useEffect } from 'react';
import PersonalCard from '../components/PersonalCard';
import { useDispatch, useSelector } from 'react-redux';
export default function LoadingScreen({navigation}) {
  const dispatch=useDispatch();
  const saveActivitiesToStore = async (activities) => dispatch(ActivitiesAction(activities))
  const currentUser=useSelector((state)=>state.userReducer.user)
  const startAppScreen=async()=>
  {
    const response=await getAllActivitiesApi();
    if(response)
    {
     await  saveActivitiesToStore(response.data)

    }
  }
  useEffect(
    ()=>
    {
      startAppScreen();

    },[]
  )
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}style={styles.container}>
            <MainText/>
      </ScrollView>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexGrow:1,
      flexDirection:'column',
      backgroundColor: '#fff',
    },
    text:{
      color:colors.mainTextColor,
      fontWeight:'bold',
      marginTop:RFValue(1,65),
  },
  });