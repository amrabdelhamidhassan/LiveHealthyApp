import { StyleSheet, Text, View ,Modal,TouchableOpacity,ScrollView,TextInput,SafeAreaView,FlatList,Alert} from 'react-native';
import DropDown from './DropDown';
import * as yup from 'yup';
import { useState } from 'react';
import { getFoodSearch,addtoMealApi,createNewFoodApi } from '../services/foodServices';
import { Formik } from 'formik';
import { store } from '../store/store';
import { colors } from '../constants/colors';
import { constants } from '../constants/constants';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useEffect } from 'react';
export default function AddFoodModal({OptionStyle,OptionTextStyle,meal,updateFood=()=>{}}) 
{
    const [yourServing,setYourServing]=useState(["1.00"])
    const [showFoodSearchResults,setShowFoodSearchResults]=useState(false);
    const [foodSearchResults,setFoodSearchResults]=useState([]);
    const checkCaloriesValidity=(protein,carbs,fats,calories)=>
    {
        let calccalories=4*parseFloat(protein)+4*parseFloat(carbs)+9*parseFloat(fats);
        console.log(calccalories)
        if (Math.abs(parseFloat(calories)-parseFloat(calccalories))<5) return true
        else return false;
    }
    const addFoodToMeal=async(food,serving)=>
    {
        Alert.alert(
            "Add Food To Meal",
            "Are You Sure You Want to add "+food.name+" to meal "+meal.name+"  ?",
            [
              {
                text: "No",
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: async() => {
                    await addtoMealApi({mealId:meal.id,foodId:food.id,serving:serving})
                    updateFood();
                    setModalVisible('false')
                },
                style: "cancel",
              },
              
              
            ],
          );
         
    };
    const createNewFood=async(values)=>
    {
        Alert.alert(
            "Create New Food",
            "Are You Sure You Want to create "+values.name+" ?",
            [
              {
                text: "No",
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: async() => {
                    await createNewFoodApi(values)
                    updateFood();
                    setModalVisible('false')
                },
                style: "cancel",
              },
              
              
            ],
          );
         
    };
    const getFoodTypeByName=(data)=>
    {
        let foodType=(constants.foodTypesSearch).filter((item)=>item.data===data)
        return foodType[0]
    }
    const getFoodTypeById=(id)=>
    {
        let foodType=(constants.foodTypesSearch).filter((item)=>{
            return parseInt(item.id)==parseInt(id)})
        return foodType[0]
    }
    const getFoodQuantityByName=(data)=>
    {
        let foodQuantity=(constants.foodQuantities).filter((item)=>item.data===data)
        return foodQuantity[0]
    }
    const getFoodQuantitiyById=(id)=>
    {
        let foodQuantity=(constants.foodQuantities).filter((item)=>{
            return parseInt(item.id)==parseInt(id)})
        return foodQuantity[0]
    }
    useEffect(()=>
    {
        if(foodSearchResults.length>0)
        setShowFoodSearchResults(true);

    }
    ,[foodSearchResults])

    const SearchQueryItem = ({ item ,yourServing,setYourServing}) => (
        <TouchableOpacity style={styles.foodSearchItem}onPress={()=>{
            if(isNaN(yourServing)|| yourServing=="")
            {Alert.alert('Enter Your Food Serving')}

            else
            {
                addFoodToMeal(item,yourServing)
            }
        }} >
                    <View style={styles.dataBox}>
                        <Text style={styles.dataText}>{item.name}</Text>
                        <Text style={styles.dataText}>{"Food Type : "+item.foodType.name}</Text>

                    </View>
                    <View style={styles.dataBox}>
                        <Text style={styles.dataText}>{" Calories : "+item.nutritionfacts.calories.toFixed(2)+' kcal'}</Text>
                        <Text style={styles.dataText}>{" Per Serving : "+item.nutritionfacts.servingSize.toFixed(2)+" "+item.nutritionfacts.servingQuantity.name}</Text>

                    </View>
                    <View style={styles.dataBox}>
                        <Text style={styles.dataText}>{" Protien : "+item.nutritionfacts.protein.toFixed(2)+' gm'}</Text>
                        <Text style={styles.dataText}>{" Carbs : "+item.nutritionfacts.totalcarbs.toFixed(2)+' gm'}</Text>
                        <Text style={styles.dataText}>{" Fats : "+item.nutritionfacts.totalfats.toFixed(2)+' gm'}</Text>
                    </View>
        </TouchableOpacity>
       );
     const renderSearchQueryItem = ({ item }) => (
         <SearchQueryItem item={item} yourServing={yourServing} setYourServing={setYourServing} />
       ); 
    const ReviewSchema1=yup.object(
        {
          maxprotein: yup.number().typeError("Max Protein Value Must be a Number"),
            minprotein: yup.number().typeError(" Min Protein Value Must be a Number"),
          maxcalories: yup.number().typeError("Max Calories Value Must be a Number"),
          mincalories: yup.number().typeError("Min Calories Value Must be a Number"),
          maxcarbs: yup.number().typeError("Max Carbs Value Must be a Number"),
          mincarbs: yup.number().typeError("Min Carbs Value Must be a Number"),
          maxfats: yup.number().typeError("Max Fats Value  be a Number"),
          minfats: yup.number().typeError("Min Fats Value  be a Number"),
        })
    const ReviewSchema2=yup.object(
            {
                name: yup.string().required("Name is required").min(2, "Enter Valid Name").matches(/^[a-zA-Z-]+$/,'Enter Valid Name Letters and Dashes Only'),
                servingSize: yup.number('').required('Serving Size Required').min(0.1,'Serving Size Required'),
                protein: yup.number('').required('Protein Required'),
                totalfats: yup.number('').required('Total Fats Required'),
                totalcarbs: yup.number('').required('Total Carbs Required'),
                calories: yup.number('').required('Total Calories are Required'),
                serving:yup.number('').required('Serving Per Meal is Required ')
            })
        const [modalVisible, setModalVisible] = useState(false);
        const [viewType,setViewType]=useState('neutral')
        useEffect(()=>
        {
            setFoodSearchResults([])
            setShowFoodSearchResults(false);
            setViewType('neutral')
        }
        ,[])
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
        <ScrollView  contentContainerStyle={{ alignItems: 'center' }} style={styles.modalView}>
                 <TouchableOpacity style={styles.button} onPress={()=>
                        {
                            setViewType("search");
                            setYourServing("1.00");
                        }}>
                            <Text style={styles.btnText}>Search For Different Existing Food Items</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.btnText}onPress={()=>
                        {
                            setViewType("create");
                            setYourServing("1.00");
                            
                        }}>Create New Personal Food Item</Text>
                </TouchableOpacity>
{viewType=="search" && <View style={styles.container}>
            <Formik
            initialValues={{
                name:"",
                mincalories:"0",
                maxcalories:"0",
                minprotein:"0",
                maxprotein:"0",
                minfats:"0",
                maxfats:"0",
                mincarbs:"0",
                maxcarbs:"0",
                foodTypeId:"0",
                foodVerfication:"all",
                sortBy:"calories" ,
                sortDir:"Asc",
                userId:store.getState().userReducer.user?.id
            }}
            validationSchema={ReviewSchema1}
            onSubmit={async(values)=>
            {
                const response=await getFoodSearch(values);
                if (response)
                {

                    setFoodSearchResults(response)
                }
            }
            }
            >
            {
                
                (formikProps) => {
                  return (  
                    <View style={styles.container}>
                            <View style={styles.dataBox}>
                                <Text style={styles.dataText}>Name</Text>
                                <TextInput style={styles.dataTextInput}
                                placeholder='Name'
                                maxLength={30} 
                                name='name' id='name' 
                                value={formikProps.values.name}
                                onChangeText={formikProps.handleChange('name')}
                                onBlur ={formikProps.handleBlur('name')}
                                ></TextInput>
                            </View>

                            <View style={styles.dataBox}>
                                <Text style={styles.dataText}>Min Calories</Text>
                                <TextInput style={styles.dataTextInput}placeholder='Min Calories'
                                    name='mincalories' id='mincalories' 
                                    maxLength={8} 
                                    value={formikProps.values.mincalories}
                                    onChangeText={formikProps.handleChange('mincalories')}
                                    onBlur ={formikProps.handleBlur('mincalories')}
                                    keyboardType='decimal-pad'
                                ></TextInput>
                            <Text style={styles.dataText}>Max Calories</Text>
                                <TextInput style={styles.dataTextInput}placeholder=' Max Calories'
                                    name='maxcalories' id='maxcalories' 
                                    maxLength={8} 
                                    value={formikProps.values.maxcalories}
                                    onChangeText={formikProps.handleChange('maxcalories')}
                                    onBlur ={formikProps.handleBlur('maxcalories')}
                                    keyboardType='decimal-pad'
                                ></TextInput>
  

                            </View>

                        <View style={styles.dataBox}>
                                <Text style={styles.dataText}>Min Protein</Text>
                                <TextInput style={styles.dataTextInput}placeholder='Min Protein'
                                    name='minprotein' id='minprotein' 
                                    maxLength={8} 
                                    value={formikProps.values.minprotein}
                                    onChangeText={formikProps.handleChange('minprotein')}
                                    onBlur ={formikProps.handleBlur('minprotein')}
                                    keyboardType='decimal-pad'
                                ></TextInput>
                            <Text style={styles.dataText}>Max Protein</Text>
                                <TextInput style={styles.dataTextInput}placeholder=' Max Protein'
                                    name='maxprotein' id='maxprotein' 
                                    maxLength={8} 
                                    value={formikProps.values.maxprotein}
                                    onChangeText={formikProps.handleChange('maxprotein')}
                                    onBlur ={formikProps.handleBlur('maxprotein')}
                                    keyboardType='decimal-pad'
                                ></TextInput>  


                        </View>
                        <View style={styles.dataBox}>
                                <Text style={styles.dataText}>Min Carbs</Text>
                                <TextInput style={styles.dataTextInput}placeholder='Min Carbs'
                                    name='mincarbs' id='mincarbs' 
                                    maxLength={8} 
                                    value={formikProps.values.mincarbs}
                                    onChangeText={formikProps.handleChange('mincarbs')}
                                    onBlur ={formikProps.handleBlur('mincarbs')}
                                    keyboardType='decimal-pad'
                                ></TextInput>
                            <Text style={styles.dataText}>Max Carbs</Text>
                                <TextInput style={styles.dataTextInput}placeholder=' Max Carbs'
                                    name='maxcarbs' id='maxcarbs' 
                                    maxLength={8} 
                                    value={formikProps.values.maxcarbs}
                                    onChangeText={formikProps.handleChange('maxcarbs')}
                                    onBlur ={formikProps.handleBlur('maxcarbs')}
                                    keyboardType='decimal-pad'
                                ></TextInput>  

                        </View>
                        <View style={styles.dataBox}>
                                <Text style={styles.dataText}>Min Fats</Text>
                                <TextInput style={styles.dataTextInput}placeholder='Min Fats'
                                    name='minfats' id='minfats' 
                                    maxLength={8} 
                                    value={formikProps.values.minfats}
                                    onChangeText={formikProps.handleChange('minfats')}
                                    onBlur ={formikProps.handleBlur('minfats')}
                                    keyboardType='decimal-pad'
                                ></TextInput>
                            <Text style={styles.dataText}>Max Fats</Text>
                                <TextInput style={styles.dataTextInput}placeholder=' Max Fats'
                                    name='maxfats' id='maxfats' 
                                    maxLength={8} 
                                    value={formikProps.values.maxfats}
                                    onChangeText={formikProps.handleChange('maxfats')}
                                    onBlur ={formikProps.handleBlur('maxfats')}
                                    keyboardType='decimal-pad'
                                ></TextInput>  

                        </View>
                            <View style={styles.dataBox}>
                                <Text style={styles.dataText}>Food Type</Text>
                                <DropDown data={(constants.foodTypesSearch)} OptionStyle={styles.dataTextInput} initialValue={getFoodTypeById(formikProps.values.foodTypeId).data} onSelect={(item)=>
                                {
                                    formikProps.values.foodTypeId=getFoodTypeByName(item).id;
                                }}/>
                            </View>
                            <View style={styles.dataBox}>
                                <Text style={styles.dataText}>Food Query</Text>
                                <DropDown data={constants.foodVerfication} OptionStyle={styles.dataTextInput} initialValue={formikProps.values.foodVerfication} onSelect={(item)=>
                                {
                                    formikProps.values.foodVerfication=item
                                }}/>
                            </View>
                            <View style={styles.dataBox}>
                                <Text style={styles.dataText}>Sort By</Text>
                                <DropDown data={constants.sortBy} OptionStyle={styles.dataTextInput} initialValue={formikProps.values.sortBy} onSelect={(item)=>
                                {
                                    formikProps.values.sortBy=item
                                }}/>
                                <DropDown data={constants.sortDir} OptionStyle={styles.dataTextInput} initialValue={formikProps.values.sortDir} onSelect={(item)=>
                                {
                                    formikProps.values.sortDir=item
                                }}/>
                            </View>
                            <View style={styles.dataView}>

                            {formikProps.touched && formikProps.errors.name&&<Text style={styles.error}>{formikProps.touched && formikProps.errors.name? formikProps.errors.name:""}</Text>}
                            {formikProps.touched && formikProps.errors.mincalories&&<Text style={styles.error}>{formikProps.touched && formikProps.errors.mincalories? formikProps.errors.mincalories:""}</Text>}
                            {formikProps.touched && formikProps.errors.maxcalories&&<Text style={styles.error}>{formikProps.touched && formikProps.errors.maxcalories? formikProps.errors.maxcalories:""}</Text>}
                            {formikProps.touched && formikProps.errors.minprotein&&<Text style={styles.error}>{formikProps.touched && formikProps.errors.minprotein? formikProps.errors.minprotein:""}</Text>}
                            {formikProps.touched && formikProps.errors.maxprotein&&<Text style={styles.error}>{formikProps.touched && formikProps.errors.maxprotein? formikProps.errors.maxprotein:""}</Text>}
                            {formikProps.touched && formikProps.errors.mincarbs&&<Text style={styles.error}>{formikProps.touched && formikProps.errors.mincarbs? formikProps.errors.mincarbs:""}</Text>}
                            {formikProps.touched && formikProps.errors.maxcarbs&&<Text style={styles.error}>{formikProps.touched && formikProps.errors.maxcarbs? formikProps.errors.maxcarbs:""}</Text>}
                            {formikProps.touched && formikProps.errors.minfats&&<Text style={styles.error}>{formikProps.touched && formikProps.errors.minfats? formikProps.errors.minfats:""}</Text>}
                            {formikProps.touched && formikProps.errors.maxfats&&<Text style={styles.error}>{formikProps.touched && formikProps.errors.maxfats? formikProps.errors.maxfats:""}</Text>}
                            </View>
                    <TouchableOpacity onPress={formikProps.handleSubmit} style={styles.button}>
                             <Text  style={styles.btnText}>{"Search"}</Text>   
                    </TouchableOpacity>
                    </View>
                  )
                  }}
        </Formik>   
        <View style={styles.container}>
                    {
                    showFoodSearchResults&& 
                     <SafeAreaView >
                        <View style={styles.dataBox}>
                            <Text style={styles.dataText}>{"Your Serving "}</Text>
                            <TextInput style={styles.dataTextInput}
                                    placeholder='Your Serving '
                                    maxLength={4} 
                                    name='yourServing' id='yourServing' 
                                    value={yourServing}
                                    onChangeText={(number)=>{setYourServing(number)}}
                                    keyboardType="decimal-pad"
                                    ></TextInput>                    
                        </View>
                        <FlatList
                                data={foodSearchResults}
                                renderItem={renderSearchQueryItem}
                                keyExtractor={item =>'FSR'+ Math.random(1000)}
                                listKey={(item, index) => 'FSR' + Math.random(1000)}
                                scrollEnabled={false}
                        />
                     </SafeAreaView> 
                    }
        </View>
            </View>
        }
  {viewType=="create" && <View style={styles.container}>
            <Formik
            initialValues={{
                name:'',
                foodTypeId:'1',
                protein:'',
                totalcarbs:'',
                totalfats:'',
                servingSize:'',
                servingQuantityId:'1',
                serving:'1.00', 
                mealId:meal.id,
                userId:store.getState().userReducer.user?.id,

            }}
            validationSchema={ReviewSchema2}
            onSubmit={(values)=>
            {
                const valid =checkCaloriesValidity(values.protein,values.totalcarbs,values.totalfats,values.calories);
                if(valid)
                createNewFood(values);
                else
                {
                    {Alert.alert('Enter Valid Macros to add up to the entered calories')}

                }
            }
            }
            >
            {
                
                (formikProps) => {
                  return (  
                    <View style={styles.container}>
                            <View style={styles.dataBox}>
                                <Text style={styles.dataText}>Name</Text>
                                <TextInput style={styles.dataTextInput}
                                placeholder='Name'
                                maxLength={15} 
                                name='name' id='name' 
                                value={formikProps.values.name}
                                onChangeText={formikProps.handleChange('name')}
                                onBlur ={formikProps.handleBlur('name')}
                                ></TextInput>

                            </View>
                            {formikProps.touched && formikProps.errors.name&&<Text style={styles.error}>{formikProps.touched && formikProps.errors.name? formikProps.errors.name:""}</Text>}

                            <View style={styles.dataBox}>
                                <Text style={styles.dataText}>{"Calories (kcal)"}</Text>
                                <TextInput style={styles.dataTextInput}placeholder='Calories'
                                    name='calories' id='calories' 
                                    maxLength={15} 
                                    value={formikProps.values.calories}
                                    onChangeText={formikProps.handleChange('calories')}
                                    onBlur ={formikProps.handleBlur('calories')}
                                    keyboardType='decimal-pad'
                                ></TextInput>

                        </View>
                        {formikProps.touched && formikProps.errors.calories&&<Text style={styles.error}>{formikProps.touched && formikProps.errors.calories? formikProps.errors.calories:""}</Text>}

                            <View style={styles.dataBox}>
                                <Text style={styles.dataText}>{"Protein (gm)"}</Text>
                                <TextInput style={styles.dataTextInput}placeholder=' Protein'
                                    name='protein' id='protein' 
                                    maxLength={8} 
                                    value={formikProps.values.protein}
                                    onChangeText={formikProps.handleChange('protein')}
                                    onBlur ={formikProps.handleBlur('protein')}
                                    keyboardType='decimal-pad'
                                ></TextInput>

                        </View>
                        {formikProps.touched && formikProps.errors.protein&&<Text style={styles.error}>{formikProps.touched && formikProps.errors.protein? formikProps.errors.protein:""}</Text>}

                            <View style={styles.dataBox}>
                                <Text style={styles.dataText}>{"Fats (gm)"}</Text>
                                <TextInput style={styles.dataTextInput}placeholder='Fats'
                                        name='totalfats' id='totalfats' 
                                        maxLength={8} 
                                        value={formikProps.values.totalfats}
                                        onChangeText={formikProps.handleChange('totalfats')}
                                        onBlur ={formikProps.handleBlur('totalfats')}
                                        keyboardType='decimal-pad'
                                ></TextInput>

                        </View>
                        {formikProps.touched && formikProps.errors.totalfats&&<Text style={styles.error}>{formikProps.touched && formikProps.errors.totalfats? formikProps.errors.totalfats:""}</Text>}

                            <View style={styles.dataBox}>
                                <Text style={styles.dataText}>{'Carbs (gm)'}</Text>
                                <TextInput style={styles.dataTextInput}placeholder='Carbs'
                                        name='totalcarbs' id='totalcarbs' 
                                        value={formikProps.values.totalcarbs}
                                        maxLength={8} 
                                        onChangeText={formikProps.handleChange('totalcarbs')}
                                        onBlur ={formikProps.handleBlur('totalcarbs')}
                                        keyboardType='decimal-pad'
                                ></TextInput>
                        </View>
                        {formikProps.touched && formikProps.errors.totalcarbs&&<Text style={styles.error}>{formikProps.touched && formikProps.errors.totalcarbs? formikProps.errors.totalcarbs:""}</Text>}

                            <View style={styles.dataBox}>
                                <Text style={styles.dataText}>Serving Size</Text>
                                <TextInput style={styles.dataTextInput}placeholder='Serving Size'
                                        name='servingSize' id='servingSize' 
                                        value={formikProps.values.servingSize}
                                        maxLength={8} 
                                        onChangeText={formikProps.handleChange('servingSize')}
                                        onBlur ={formikProps.handleBlur('servingSize')}
                                        keyboardType='decimal-pad'
                                ></TextInput>
                            <DropDown data={constants.foodQuantities} OptionStyle={styles.dataTextInput} initialValue={getFoodQuantitiyById(formikProps.values.servingQuantityId).data} onSelect={(item)=>
                                {
                                    formikProps.values.servingQuantityId=getFoodQuantityByName(item).id;
                                }}/>

                        </View>
                        {formikProps.touched && formikProps.errors.servingSize&&<Text style={styles.error}>{formikProps.touched && formikProps.errors.servingSize? formikProps.errors.servingSize:""}</Text>}

                            <View style={styles.dataBox}>
                                <Text style={styles.dataText}>Your Serving</Text>
                                    <TextInput style={styles.dataTextInput}placeholder='Serving Size'
                                            name='serving' id='serving' 
                                            value={formikProps.values.serving}
                                            maxLength={8} 
                                            onChangeText={formikProps.handleChange('serving')}
                                            onBlur ={formikProps.handleBlur('serving')}
                                            keyboardType='decimal-pad'
                                    ></TextInput>
                            </View>
                    <TouchableOpacity onPress={formikProps.handleSubmit} style={styles.button}>
                             <Text  style={styles.btnText}>Add New Food Item</Text>   
                    </TouchableOpacity>
                    </View>

                  )
                  }}
        </Formik>
            </View> }

        </ScrollView>
        </Modal>
        
        <TouchableOpacity
          style={OptionStyle}
          onPress={() => setModalVisible(true)}
        >
          <Text style={OptionTextStyle}>Add Food Item</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
      justifyContent: "center",
      alignItems:"center"
    },
    foodSearchItem:
    {
        margin:RFValue(1,65),
        padding:RFValue(1,65),
        borderColor: 'red',
        borderStyle: 'dotted',
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor:colors.mainTextColor,
        flexDirection:'column',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    container: {
        flex: 1,
        backgroundColor: colors.mainBackGround,
        alignItems: 'center',
        justifyContent: "center",
      },
    modalView: {
        flex:1,
        backgroundColor: colors.mainBackGround,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    dataView:
    {
        flex:1,
        flexDirection:'column'
    },
    dataBox:
    {
        flexDirection:'row',
    },
    dataText:
    {
        color:colors.mainTextColor,
        fontWeight:'bold',
        backgroundColor:colors.mainThemeColor,
        paddingHorizontal:RFValue(0.3,65),
        paddingVertical:RFValue(0.1,65),
        margin:RFValue(0.5,65),
        borderRadius:RFValue(1,65),
    },
    dataTextInput:
    {
        fontWeight:'bold',
        flex:1,
        backgroundColor:colors.mainThemeColor,
        color:'grey',
        paddingHorizontal:RFValue(0.3,65),
        paddingVertical:RFValue(0.1,65),
        margin:RFValue(0.5,65),
        borderRadius:RFValue(1,65),
    },
    button:
    {
        backgroundColor:'black',
        margin:RFValue(1,65),
        color:'white',
        paddingVertical:RFValue(0.5,65),
        paddingHorizontal:RFValue(1,65),
        borderRadius:RFValue(1,65),
        fontWeight:'bold'
      },
    btnText:
    {
        color:'white',
        fontWeight:'bold',
    },
    error:{
    color: 'red',
    fontSize: RFValue(12, 650),
    marginTop:1,
    textAlignVertical: 'center',
    width: "100%",
    marginVertical: RFValue(5, 650),
    marginHorizontal: RFValue(10, 650),

    },
  });