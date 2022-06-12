import { Text,View,StyleSheet,TouchableOpacity } from "react-native";
import { useEffect ,useState} from 'react';
import { colors } from "../constants/colors";
import { CalculateCaloriesFormula } from "../constants/functions";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useSelector } from "react-redux";
export default function PersonalCard() {
    const currentUser=useSelector((state)=>state.userReducer.user)
    const [showCard,setShowCard]=useState(false)
    let activities=(useSelector((state)=>state.activitiesReducer.activities)).filter((item)=>item.id==currentUser?.activityId)
    const activityratio=activities[0]?.ratio;
    const IntroText1=(user)=>
    {
        if(user==null)return;
        return ("Welcome "+user.fname+", Click to Show Your Info ")
    }
    const IntroText2=(user)=>
    {
        if(user==null)return;

        return (user.age+" years old"+" ,"+user.gender+" ,"+user.height+" cm ,"+user.weight+" kgm ")
    }
    const WeightGoalText=(user)=>
    {
        if(user==null)return;

        return ("Suggested Calories Range "+"To "+user.weightGoal+" Weight")
    }
    const BMRText=(user)=>
    {
        if(user==null)return;

        return ("BMR Calories : "+CalculateCaloriesFormula(user)+" kcal")
    }
    const MaintainWeightText=(user)=>
    {
        if(user==null)return;

        return ("Maintain Weight Calories : "+(CalculateCaloriesFormula(user)*activityratio)+" kcal")
    }

    const CaloriesRange=(user)=>
    {
        if(user==null)return;

        if(user.weightGoal=='lose')
        {
            return ("From "+((CalculateCaloriesFormula(user)*activityratio)-500)+' kcal To '+((CalculateCaloriesFormula(user)*activityratio)-200)+" kcal")

        }
        else if (user.weightGoal=='gain')
        {
            return ("From "+((CalculateCaloriesFormula(user)*activityratio)+200)+' kcal To '+((CalculateCaloriesFormula(user)*activityratio)+500)+" kcal")

        }
        else 
        {
            return ("From "+((CalculateCaloriesFormula(user)*activityratio)-200)+' kcal To '+((CalculateCaloriesFormula(user)*activityratio)+200)+" kcal")

        }
    }
    return (
 
      <TouchableOpacity style={styles.container} onPress={()=>setShowCard(!showCard)}>
                <Text style={styles.text}>{IntroText1(currentUser)}</Text>
           { showCard&&       <Text style={styles.text}>{IntroText2(currentUser)}</Text>}
           { showCard&&       <Text style={styles.text}>{BMRText(currentUser)}</Text>}
           { showCard&&      <Text style={styles.text}>{MaintainWeightText(currentUser)}</Text>}
           { showCard&&       <Text style={styles.text}>{WeightGoalText(currentUser)}</Text>}
           { showCard&&      <Text style={styles.text}>{CaloriesRange(currentUser)}</Text>}
      </TouchableOpacity>
    
    );
  }
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.secondThemeColor,
      marginHorizontal:RFValue(1,65),
      marginVertical:RFValue(0.2,65),
      paddingHorizontal:RFValue(5,65),
      paddingVertical:RFValue(0.5,65),
      borderRadius:RFValue(1,65),
      alignItems: 'center',
      shadowColor: '#fff',
      shadowOffset: { width: 5, height: 5 },
      shadowOpacity: 1,
      shadowRadius: 5,  
      elevation: 10
    },
    text:{
        color:colors.mainTextColor,
        fontWeight:'bold',
        marginVertical:RFValue(0.5,65),
        paddingHorizontal:RFValue(1,65),
        paddingVertical:RFValue(0.2,65),       
         borderRadius:RFValue(0.5,65),
        backgroundColor:colors.mainThemeColor,
        alignItems: 'center',
        shadowColor: '#fff',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 5,  
        elevation: 10,
        textAlign:'center'
    },
    button:{
        backgroundColor: colors.mainThemeColor,
        borderRadius:RFValue(1,65),
        marginTop:RFValue(1,65),
        padding:RFValue(0.5,65),
    }
  });