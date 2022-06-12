import { Text,View,StyleSheet,Pressable,TextInput,SafeAreaView,FlatList,TouchableOpacity,Alert } from "react-native";
import { useEffect ,useState} from 'react';
import AddFoodModal from "./AddFoodModal";
import { deleteMealApi } from "../services/foodServices";
import FoodCard from "./FoodCard";
import { colors } from "../constants/colors";
import { CalculateFoodCalories,CalculateFoodMacrosPercentages } from "../constants/functions";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useSelector } from "react-redux";
export default function MealCard({meal,updateMeals=()=>{}}) {
    const [newMeal,setNewMeal]=useState(false);
    const [showCard,setShowCard]=useState(false);
    const currentUser=useSelector((state)=>state.userReducer.user)
    const deleteMeal=async()=>
    {
        Alert.alert(
            "Delete Meal",
            "Are You Sure You Want to Delete Meal "+meal.name+" ?",
            [
              {
                text: "No",
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: async() => {
                    await deleteMealApi(meal.id)
                    updateMeals();
                },
                style: "cancel",
              },
              
              
            ],
          );
         
    };
    const MealName=()=>
    {
        return ('Meal Name : '+meal.name+"\n Click to View Details")
    }
    const IntroText=()=>
    {
        return (meal.food.length+" Foods")
    }
    const NutritionText=()=>
    {
        const mealNutrition=CalculateFoodCalories('meal',meal)
        const percentageText=CalculateFoodMacrosPercentages(mealNutrition)

        return ("Total Meal Calories : "+mealNutrition.calories.toFixed(2)+" kcal\nTotal Meal Protein :"+mealNutrition.protein.toFixed(2)+" gm\nTotal Meal Carbs : "+mealNutrition.totalcarbs.toFixed(2)+"gm\nTotal Meal Fats : "+mealNutrition.totalfats.toFixed(2)+" gm\n"+percentageText)
    }
    const FoodItem = ({ item }) => (
        <FoodCard food={item} mealId={meal.id} updateFood={updateMeals}/>
       );
     const renderFoodItem = ({ item }) => (
         <FoodItem item={item} />
       ); 
    return (
      <TouchableOpacity style={styles.container}onPress={()=>setShowCard(!showCard)}>
                <Text style={styles.text}>{MealName()}</Text>
{showCard&&     <Text style={styles.text}>{IntroText()}</Text>}
                <Pressable style={styles.button}onPress={deleteMeal}><Text style={styles.text2}>Delete Meal</Text></Pressable>
{showCard&&     <AddFoodModal OptionStyle={styles.button} OptionTextStyle={styles.text2} meal={meal}updateFood={updateMeals}/>}
  
            {showCard &&meal.food.length>0 &&  <Text style={styles.text}>{NutritionText()}</Text>}
            { showCard && meal.food.length!=0  &&
                <SafeAreaView>
                        <FlatList
                                data={meal.food}
                                renderItem={renderFoodItem}
                                keyExtractor={item => 'MC'+(item.id).toString()+(meal.id).toString()+Math.random(1000)}
                                listKey={(item, index) => 'MC' + (item.id).toString()+(meal.id).toString()+Math.random(1000)}
                        />
                </SafeAreaView> }
      </TouchableOpacity>
    );
  }
  const styles = StyleSheet.create({
    container: {
        flex:1,
      backgroundColor:  'white',
      flexGrow:1,
      flexDirection:'column',
      width:RFValue(25,65),
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
        color:colors.mainThemeColor,
        fontWeight:'bold',
        marginTop:RFValue(0.5,65),
        paddingHorizontal:RFValue(1,65),
        paddingVertical:RFValue(0.2,65),       
         borderRadius:RFValue(0.5,65),
         textAlign:'center',
        backgroundColor:colors.secondThemeColor,
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
        backgroundColor:colors.secondThemeColor,
        marginTop:RFValue(1,65),
        marginRight:RFValue(1,65),
        borderRadius:RFValue(1,65),
    },
  });