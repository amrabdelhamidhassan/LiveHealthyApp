import { Text,View,StyleSheet,Pressable,TextInput,SafeAreaView,FlatList,TouchableOpacity ,Alert } from "react-native";
import { useEffect ,useState} from 'react';
import { colors } from "../constants/colors";
import { deleteGroupMealApi,createMealApi } from "../services/foodServices";
import MealCard from "./MealCard";
import { CalculateFoodCalories,CalculateFoodMacrosPercentages,CalculateCaloriesFormula} from "../constants/functions";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useSelector } from "react-redux";
export default function GroupMealCard({groupmeal,updateGroupMeals=()=>{}}) {
    const [showCard,setShowCard]=useState(false);
    const [newMeal,setNewMeal]=useState(false);
    const [newMealName,setNewMealName]=useState("");
    const currentUser=useSelector((state)=>state.userReducer.user)
    let activities=(useSelector((state)=>state.activitiesReducer.activities)).filter((item)=>item.id==currentUser?.activityId)
    const activityratio=activities[0]?.ratio;
    const GroupName=()=>
    {
        return ("Group Name : "+groupmeal.name+"\n Click to View Details")
    }
    const IntroText=()=>
    {
        return (groupmeal.meals.length+" Meals")
    }
    const NutritionText=()=>
    {
        if(currentUser==null)return;
        let lowestCalories;
        let HighestCalories;
        if(currentUser.weightGoal=='lose')
        {
            lowestCalories= (CalculateCaloriesFormula(currentUser)*activityratio)-500
            HighestCalories=(CalculateCaloriesFormula(currentUser)*activityratio)-200
        }
        else if (currentUser.weightGoal=='gain')
        {
            lowestCalories= (CalculateCaloriesFormula(currentUser)*activityratio)+200
            HighestCalories=(CalculateCaloriesFormula(currentUser)*activityratio)+500
        }
        else 
        {
            lowestCalories= (CalculateCaloriesFormula(currentUser)*activityratio)-200
            HighestCalories=(CalculateCaloriesFormula(currentUser)*activityratio)+200
  
        }
        let caloriesRange;

        const groupNutrition=CalculateFoodCalories('group',groupmeal)
        const percentageText=CalculateFoodMacrosPercentages(groupNutrition)
        if(groupNutrition.calories<lowestCalories)
            caloriesRange="low";
        else if (groupNutrition.calories>HighestCalories)
                caloriesRange="high";
        else caloriesRange="good";
        return ("Total Group Calories : "+groupNutrition.calories.toFixed(2)+" kcal ("+caloriesRange+")\nTotal Group Protein :"+groupNutrition.protein.toFixed(2)+" gm\nTotal Group Carbs : "+groupNutrition.totalcarbs.toFixed(2)+"gm\nTotal Group Fats : "+groupNutrition.totalfats.toFixed(2)+" gm\n"+percentageText)
    }
    const saveNewMeal=()=>
    {
        let name=newMealName.replace(/\s/g, '');
        if(name=="")
        {
            Alert.alert(
                "Name Error",
                "Enter Name Please to create new Meal",
            );
        }
        else 
        {
            createMeal(name);
            setNewMeal(false)
            setNewMealName("")
        }
    }
    const createMeal=async(name)=>
    {
        Alert.alert(
            "Create Meal",
            "Are You Sure You Want to Create New Meal "+name+" ?",
            [
              {
                text: "No",
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: async() => {
                    await createMealApi(name,groupmeal.id)
                    updateGroupMeals();
                },
                style: "cancel",
              },
              
              
            ],
          );
         
    };
    const deleteGroup=async()=>
    {
        Alert.alert(
            "DeleteGroup",
            "Are You Sure You Want to Delete Group "+groupmeal.name+" ?",
            [
              {
                text: "No",
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: async() => {
                    await deleteGroupMealApi(groupmeal.id)
                    updateGroupMeals();
                },
                style: "cancel",
              },
              
              
            ],
          );
         
    };

    const MealItem = ({ item }) => (
        <MealCard meal={item} updateMeals={updateGroupMeals}/>
       );
     const renderMealItem = ({ item }) => (
         <MealItem item={item} />
       ); 
    return (
      <TouchableOpacity style={styles.container} onPress={()=>setShowCard(!showCard)}>
                <Text style={styles.text}>{GroupName()}</Text>
    {showCard&& <Text style={styles.text}>{IntroText()}</Text>}
            <Pressable style={styles.button}onPress={deleteGroup}><Text style={styles.text2}>Delete Group</Text></Pressable>

{showCard&&groupmeal.meals.length>0 &&
                <Text style={styles.text}>{NutritionText()}</Text>}

 {showCard&&               <Pressable style={styles.button}onPress={()=>{setNewMeal(!newMeal);setNewMealName("")}}><Text style={styles.text2}>Create New Meal</Text></Pressable>}
                {showCard&& newMeal&&<View  style={{flex:1,justifyContent:'center',alignItems:'center' ,flexDirection:"row"}}>
                    <TextInput style={styles.dataTextInput}
                                    placeholder='Meal Name'
                                    maxLength={15} 
                                    name='name' id='name' 
                                    value={newMealName}
                                    onChangeText={(name)=>setNewMealName(name)}
                    >

                    </TextInput>
                    <Pressable style={styles.button}onPress={saveNewMeal}><Text style={styles.text2}>Save</Text></Pressable>
                        
                </View>
    }
                {showCard&& groupmeal.meals.length!=0  &&
                <SafeAreaView>
                        <FlatList
                                data={groupmeal.meals}
                                renderItem={renderMealItem}
                                keyExtractor={item => 'GMC'+(item.id).toString()+(groupmeal.id).toString()+Math.random(1000)}
                                listKey={(item, index) => 'GMC' + (item.id).toString()+(groupmeal.id).toString()+Math.random(1000)}

                        />
                </SafeAreaView> }

      </TouchableOpacity>
    );
  }
  const styles = StyleSheet.create({
    container: {
        flex:1,
      backgroundColor:  colors.secondThemeColor,
      flexGrow:1,
      flexDirection:'column',
      width:RFValue(30,65),
      marginVertical:RFValue(0.5,65),
      padding:RFValue(1,65),
      borderRadius:RFValue(2,65),
      alignItems: 'center',
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
        marginTop:RFValue(0.5,65),
        paddingHorizontal:RFValue(1,65),
        paddingVertical:RFValue(0.2,65),       
         borderRadius:RFValue(0.5,65),
         textAlign:'center',
        backgroundColor:colors.mainThemeColor,
        alignItems: 'center',
        shadowColor: '#fff',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 5,  
        elevation: 10
    },
    text2:
    {
        color: "white",
        fontWeight:'bold',
        flex:1,

    },
    button:
    {
        flex:1,
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
    dataTextInput:
    {

        fontWeight:'bold',
        paddingHorizontal:RFValue(3,65),
        backgroundColor:colors.mainThemeColor,
        marginRight:RFValue(1,65),
        borderRadius:RFValue(1,65),
    },
  });