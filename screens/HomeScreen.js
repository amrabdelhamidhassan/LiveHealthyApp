import { StyleSheet, Text, View,TouchableOpacity,ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SideMenu from '../components/SideMenu';
import { colors } from '../constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';
import GroupMealsDiv from '../components/GroupMealsDiv';
import { getAllActivitiesApi,ActivitiesAction } from '../services/userServices';
import { store } from '../store/store';
import { useEffect } from 'react';
import PersonalCard from '../components/PersonalCard';
import { useDispatch, useSelector } from 'react-redux';
export default function HomeScreen({navigation}) {
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
      if((store.getState().activitiesReducer.activities).length==0)
      startAppScreen();

    },[]
  )
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}style={styles.container}>
        <SideMenu navigation={navigation}/>
        <PersonalCard/>
        <Text style={styles.text}>Now Start Organizing your Groups of Meals</Text>
        <GroupMealsDiv/>
      </ScrollView>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexGrow:1,
      flexDirection:'column',
      backgroundColor: colors.mainBackGround,
    },
      text:{
        color:colors.mainTextColor,
        fontFamily: "Roboto",
        fontWeight:'bold',
        marginTop:RFValue(0.5,65),
        paddingHorizontal:RFValue(1,65),
        paddingVertical:RFValue(0.2,65),       
         borderRadius:RFValue(0.5,65),
        backgroundColor:colors.mainThemeColor,
        alignItems: 'center',
        shadowColor: '#fff',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 5,  
        elevation: 10
    },
  });