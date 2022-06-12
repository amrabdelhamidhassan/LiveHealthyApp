import { Text,View,StyleSheet,Pressable,TextInput,TouchableOpacity,Alert } from "react-native";
import { useEffect ,useState} from 'react';
import { colors } from "../constants/colors";
import { removeFoodApi } from "../services/foodServices";
import { CalculateFoodCalories } from "../constants/functions";
import { CalculateCaloriesFormula,CalculateFoodMacrosPercentages } from "../constants/functions";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useSelector } from "react-redux";
export default function FoodCard({food,mealId,updateFood=()=>{}}) {
    const [showCard,setShowCard]=useState(false);
    const removeFood=async()=>
    {
        Alert.alert(
            "Delete Meal",
            "Are You Sure You Want to Remove this Food "+food.name+" ?",
            [
              {
                text: "No",
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: async() => {
                    await removeFoodApi(food.id,mealId)
                    updateFood();
                },
                style: "cancel",
              },
              
              
            ],
          );
         
    };
    const FoodName=()=>
    {
        return (food.name)
    }
    const IntroText=()=>
    {
        return ("Type Of Food : "+food.foodType.name+"\nClick To View Details")
    }
    const NutritionText=()=>
    {
        const percentageText=CalculateFoodMacrosPercentages(food.nutritionfacts)

        return ("Calories : "+(food.serving*food.nutritionfacts.calories).toFixed(2)+" kcal\nPer Serving : "+food.nutritionfacts.servingSize.toFixed(2)+" "+food.nutritionfacts.servingQuantity.name+"\nProtein :"+(food.serving*food.nutritionfacts.protein).toFixed(2)+" gm\nCarbs : "+(food.serving*food.nutritionfacts.totalcarbs).toFixed(2)+"gm\nFats : "+(food.serving*food.nutritionfacts.totalfats).toFixed(2)+" gm\n"+percentageText)
    }
    const yourServing=()=>
    {
        return ("Your Serving : "+food.serving)
    }
    return (
      <Pressable style={styles.container}onPress={()=>{
          setShowCard(!showCard)
      }}>
                <Text style={styles.text}>{FoodName()}</Text>
                <Text style={styles.text}>{IntroText()}</Text>
                <Pressable style={styles.button}onPress={removeFood}><Text style={styles.text2}>Remove Food</Text></Pressable>
{showCard  &&   <Text style={styles.text}>{NutritionText()}</Text>}
{showCard  &&   <Text style={styles.text}>{yourServing()}</Text>}

      </Pressable>
    );
  }
  const styles = StyleSheet.create({
    container: {
        flex:1,
      backgroundColor:  colors.red,
      flexGrow:1,
      flexDirection:'column',
      width:RFValue(20,65),
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
        backgroundColor:'white',
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