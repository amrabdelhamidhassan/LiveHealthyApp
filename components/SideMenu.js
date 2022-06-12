import { Text,View,StyleSheet,TouchableOpacity } from "react-native";
import { colors } from "../constants/colors";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { loginAction } from '../services/userServices';
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { store } from "../store/store";
export default function SideMenu({navigation}) {
    const dispatch=useDispatch();
    const loginUserToStore = async (user) => dispatch(loginAction(user))
    return (
      <View style={styles.container}>
            <TouchableOpacity onPress={()=>navigation.navigate('EditInfoScreen',           
            {
                user:{
                    phone:store.getState().userReducer.user.phone,
                    fname:store.getState().userReducer.user.fname,
                    lname:store.getState().userReducer.user.lname,
                    age:store.getState().userReducer.user.age.toString(),
                    weight:store.getState().userReducer.user.weight.toString(),
                    height:store.getState().userReducer.user.height.toString(),
                    gender:store.getState().userReducer.user.gender,
                    activityId:(store.getState().userReducer.user.activityId).toString(),
                    fatpercentage:store.getState().userReducer.user.fatpercentage.toString(),
                    weightGoal:store.getState().userReducer.user.weightGoal.toString(),
                },
                edit:true
            })
        }style={styles.button}>
                    <Text style={styles.btnText}>Edit Your Info</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async()=>
        {    await loginUserToStore(null)
        }}   style={styles.button}>
                    <Text style={styles.btnText}>Log Out</Text>
            </TouchableOpacity>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.mainBackGround,
      marginLeft:'auto',
      marginRight:RFValue(2,65),
      marginVertical:RFValue(2,65),
      alignItems: 'flex-end',
      transform: [{ rotate: '30deg'}]
    },
    text:{
        color:colors.mainTextColor,
        fontWeight:'bold',
    },
    button:
    {
        backgroundColor:'black',
        margin:RFValue(1,65),
        color:'white',
        paddingVertical:RFValue(0.5,65),
        paddingHorizontal:RFValue(1,65),
        alignItems:'center',
        borderRadius:RFValue(1,65),
        fontWeight:'bold'
      },
      btnText:
      {
          color:'white',
          fontWeight:'bold',
      },
  });