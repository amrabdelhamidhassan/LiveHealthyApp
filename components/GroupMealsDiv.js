import { Text,View,StyleSheet,Pressable,TextInput,SafeAreaView,FlatList,Alert } from "react-native";
import { useEffect ,useState} from 'react';
import { createGroupMealApi} from "../services/foodServices";
import { colors } from "../constants/colors";
import { getAllUserGroupMeals } from "../services/foodServices";
import GroupMealCard from "./GroupMealCard";
import { CalculateCaloriesFormula } from "../constants/functions";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useSelector } from "react-redux";
export default function GroupMealsDiv() {
    const [newGroupMeal,setNewGroupMeal]=useState(false);
    const [newGroupMealName,setNewGroupMealName]=useState("");
    const [GroupMeals,setGroupMeals]=useState([])
    const currentUser=useSelector((state)=>state.userReducer.user)
    let activities=(useSelector((state)=>state.activitiesReducer.activities)).filter((item)=>item.id==currentUser?.activityId)
    const activityratio=activities[0]?.ratio;
    useEffect(()=>
    {
        initializeGroupMeals();

    },[])
    const IntroText=()=>
    {
        return (GroupMeals.length+" Group Of Meals")
    }
    const saveNewGroupMeal=()=>
    {
        let name=newGroupMealName.replace(/\s/g, '');
        if(name=="")
        {
            Alert.alert(
                "Name Error",
                "Enter Name Please to create new Group",
            );
        }
        else 
        {
            createGroup(name);
            setNewGroupMeal(false)
            setNewGroupMealName("")
        }
    }
    const GroupMealItem = ({ item }) => (
       <GroupMealCard updateGroupMeals={initializeGroupMeals} groupmeal={item}/>
      );
    const renderGroupMealItem = ({ item }) => (
        <GroupMealItem item={item} />
      ); 
    const initializeGroupMeals=async()=>
    {
        const response= await getAllUserGroupMeals(currentUser.id); 
        if(response)
        {

            setGroupMeals(response.data)

        }
    }
    const CaloriesRangeText=()=>
    {
        return ("Calories Range Per Day  to Maintain Weight Goal");
    }
    const CaloriesRange=(user)=>
    {
        if(user==null)return;
        if(user.weightGoal=='lose')
        {
            return (((CalculateCaloriesFormula(user)*activityratio)-500)+" Kcal"+' To '+((CalculateCaloriesFormula(user)*activityratio)-200)+" Kcal")

        }
        else if (user.weightGoal=='gain')
        {
            return (((CalculateCaloriesFormula(user)*activityratio)+200)+" Kcal"+' To '+((CalculateCaloriesFormula(user)*activityratio)+500)+" Kcal")

        }
        else 
        {
            return (((CalculateCaloriesFormula(user)*activityratio)-200)+" Kcal"+' To '+((CalculateCaloriesFormula(user)*activityratio)+200)+" Kcal")

        }
    }
    const createGroup=async(name)=>
    {
        Alert.alert(
            "Create Group",
            "Are You Sure You Want to Create New Group "+name+" ?",
            [
              {
                text: "No",
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: async() => {
                    await createGroupMealApi(name,currentUser.id)
                    initializeGroupMeals();
                },
                style: "cancel",
              },
              
              
            ],
          );
         
    };
        
    
    return (
      <View style={styles.container}>
                <Text style={styles.text}>{CaloriesRangeText(currentUser)}</Text>
                <Text style={styles.text}>{CaloriesRange(currentUser)}</Text>
                <Text style={styles.text}>{IntroText()}</Text>
                <Pressable style={styles.button}onPress={()=>{setNewGroupMeal(!newGroupMeal);newGroupMeal==false?setNewGroupMealName(""):""}}>
                  <Text style={styles.text2}>Create New Group Meal</Text></Pressable>
  {newGroupMeal&&<View  style={{justifyContent:'center',alignItems:'center' ,flexDirection:"row"}}>
                    <TextInput style={styles.dataTextInput}
                                    placeholder='Group Name'
                                    maxLength={15} 
                                    name='name' id='name' 
                                    value={newGroupMealName}
                                    onChangeText={(newGroupMealName)=>setNewGroupMealName(newGroupMealName)}
                    >

                    </TextInput>
                    <Pressable style={styles.button}onPress={saveNewGroupMeal}><Text style={styles.text2}>Save</Text></Pressable>
                        
                </View>
    }
{ GroupMeals.length!=0  &&
           <SafeAreaView >
                <FlatList
                        data={GroupMeals}
                        renderItem={renderGroupMealItem}
                        keyExtractor={item =>'GMD'+ (item.id).toString()+Math.random(1000)}
                        listKey={(item, index) => 'GMD' + (item.id).toString()+Math.random(1000)}
                />
            </SafeAreaView> 
            }
{ GroupMeals.length==0  &&         <Text style={styles.text}>No Group Meals</Text>}
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
        backgroundColor:  colors.mainBackGround,
        flex:1,
        flexDirection:'column',
        marginHorizontal:RFValue(1,65),
        marginVertical:RFValue(0.2,65),
        paddingHorizontal:RFValue(1,65),
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
        marginTop:RFValue(0.5,65),
        paddingHorizontal:RFValue(1,65),
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

    },
    button:
    {
        backgroundColor:'black',
        margin:RFValue(1,65),
        color:'white',
        paddingVertical:RFValue(0.5,65),
        paddingHorizontal:RFValue(5,65),
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
      flex:1,

        fontWeight:'bold',
        paddingHorizontal:RFValue(3,65),
        backgroundColor:'white',
        marginRight:RFValue(1,65),
        borderRadius:RFValue(1,65),
    },
  });