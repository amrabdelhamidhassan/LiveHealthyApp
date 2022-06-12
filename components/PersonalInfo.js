import { StyleSheet, Text, View,ScrollView ,TextInput,TouchableOpacity} from 'react-native';
import { constants } from '../constants/constants';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import DropDown from '../components/DropDown';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { colors } from '../constants/colors';
import { useSelector, useDispatch } from 'react-redux';
import MainText from '../components/MainText';
import { signupApi,loginAction ,editPersonalInfoApi} from '../services/userServices';
import { store } from '../store/store';
import * as yup from 'yup';
import { useEffect ,useState} from 'react';
export default function PersonalInfo({navigation,user,edit}) {
    const dispatch=useDispatch();
    const loginUserToStore = async (user) => dispatch(loginAction(user));
    const saveActivitiesToStore = async (activities) => dispatch(ActivitiesAction(activities))
    const ReviewSchema=yup.object(
        {
          fname: yup.string().required("English Name is required").matches(/^[aA-zZ]+$/, "Only English Letters are Allowed"),
          lname: yup.string().required("English Name is required").matches(/^[aA-zZ]+$/, "Only English Letters are Allowed"),
          age: yup.number().required("Age is required").min(8, "Minimum 8 Years").max(99, "Max 99 Years"),
          weight: yup.number().required("Weight is required").min(40, "Minimum 40 kg").max(300, "Maximum 300 kg"),
          height: yup.number().required("Height is required").min(40, "Minimum 50 cm").max(300, "Max 300 cm"),
          fatpercentage: yup.number().required("Enter 0 if you don't have it"),

        }
    );
        const activities=useSelector((state)=>state.activitiesReducer.activities).map
        ((item)=>
        {
            return {
                id:item.id,
                data:item.description
            }
        }
          
        )
        const getActivityByDescription=(description)=>
        {
            let activity=(store.getState().activitiesReducer.activities).filter((item)=>item.description===description)
            return activity[0]
        }
        const getActivityById=(id)=>
        {
            let activity=(store.getState().activitiesReducer.activities).filter((item)=>{
                console.log('getActivityId',item.id,id);
                return parseInt(item.id)==parseInt(id)})
            return activity[0]
        }
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
            {startAppScreen();
            console.log(store.getState().activitiesReducer.activities)
            }
      
          },[]
        )
        useEffect(()=>
        {
            
        },)
        return (
            <Formik
            initialValues={{
                phone:user.phone,
                fname:user.fname,
                lname:user.lname,
                age:user.age,
                weight:user.weight,
                height:user.height,
                gender:user.gender,
                activityId:user.activityId,
                fatpercentage:user.fatpercentage,
                weightGoal:user.weightGoal,
            }}
            validationSchema={ReviewSchema}
            onSubmit={async(values)=>
            {
                let User;
                if(edit)
                {
                     User = await editPersonalInfoApi(values.phone,values.fname,values.lname,values.age,
                        values.height,values.weight,values.gender,values.weightGoal,values.fatpercentage,values.activityId)
                    if(User)
                    {
                        await loginUserToStore(User)
                    }
                    navigation.goBack();
                }
                else
                {
                     User = await signupApi(values.phone,values.fname,values.lname,values.age,
                        values.height,values.weight,values.gender,values.weightGoal,values.fatpercentage,values.activityId)
                    if(User)
                    {
                        await loginUserToStore(User)
                    }
                }


            }
            }
            >
            {
                
                (formikProps) => {
                  return (  
                <ScrollView>
                    <View style={styles.container}>
                        <MainText/>
                        <StatusBar style="auto" />
                        <View style={styles.dataView}>
                            <View style={styles.dataBox}>
                                <Text style={styles.dataText}>First Name</Text>
                                <TextInput style={styles.dataTextInput}
                                placeholder=' First Name'
                                maxLength={15} 
                                name='fname' id='fname' 
                                value={formikProps.values.fname}
                                onChangeText={formikProps.handleChange('fname')}
                                onBlur ={formikProps.handleBlur('fname')}
                                ></TextInput>
                            </View>
                            {formikProps.touched && formikProps.errors.fname&&<Text style={styles.error}>{formikProps.touched && formikProps.errors.fname? formikProps.errors.fname:""}</Text>}

                        </View>
                        <View style={styles.dataView}>
                            <View style={styles.dataBox}>
                                <Text style={styles.dataText}>Last Name</Text>
                                <TextInput style={styles.dataTextInput}placeholder=' Last Name'
                                    name='lname' id='lname' 
                                    maxLength={15} 
                                    value={formikProps.values.lname}
                                    onChangeText={formikProps.handleChange('lname')}
                                    onBlur ={formikProps.handleBlur('lname')}
                                ></TextInput>
                            </View>
                            {formikProps.touched && formikProps.errors.lname&&<Text style={styles.error}>{formikProps.touched && formikProps.errors.lname? formikProps.errors.lname:""}</Text>}

                        </View>
                        <View style={styles.dataView}>
                            <View style={styles.dataBox}>
                                <Text style={styles.dataText}>Age</Text>
                                <TextInput style={styles.dataTextInput}placeholder=' Age'
                                    name='age' id='age' 
                                    maxLength={2} 
                                    value={formikProps.values.age}
                                    onChangeText={formikProps.handleChange('age')}
                                    onBlur ={formikProps.handleBlur('age')}
                                    keyboardType='decimal-pad'
                                ></TextInput>
                            </View>
                            {formikProps.touched && formikProps.errors.age&&<Text style={styles.error}>{formikProps.touched && formikProps.errors.age? formikProps.errors.age:""}</Text>}

                        </View>
                        <View style={styles.dataView}>
                            <View style={styles.dataBox}>
                                <Text style={styles.dataText}>{'Height (cm)'}</Text>
                                <TextInput style={styles.dataTextInput}placeholder=' Height (cm)'
                                        name='height' id='height' 
                                        maxLength={3} 
                                        value={formikProps.values.height}
                                        onChangeText={formikProps.handleChange('height')}
                                        onBlur ={formikProps.handleBlur('height')}
                                        keyboardType='decimal-pad'
                                ></TextInput>
                            </View>
                            {formikProps.touched && formikProps.errors.height&&<Text style={styles.error}>{formikProps.touched && formikProps.errors.height? formikProps.errors.height:""}</Text>}

                        </View>
                        <View style={styles.dataView}>
                            <View style={styles.dataBox}>
                                <Text style={styles.dataText}>{'Weight (cm)'}</Text>
                                <TextInput style={styles.dataTextInput}placeholder='Weight (cm)'
                                        name='weight' id='weight' 
                                        value={formikProps.values.weight}
                                        maxLength={3} 
                                        onChangeText={formikProps.handleChange('weight')}
                                        onBlur ={formikProps.handleBlur('weight')}
                                        keyboardType='decimal-pad'
                                ></TextInput>
                            </View>
                            {formikProps.touched && formikProps.errors.weight&&<Text style={styles.error}>{formikProps.touched && formikProps.errors.weight? formikProps.errors.weight:""}</Text>}

                        </View>
                        <View style={styles.dataView}>
                            <View style={styles.dataBox}>
                                <Text style={styles.dataText}>Gender</Text>
                                <DropDown data={constants.gender} OptionStyle={styles.dataTextInput} initialValue={formikProps.values.gender} onSelect={(item)=>
                                {
                                    formikProps.values.gender=item;
                                }}/>
                            </View>
                        </View>
                        <View style={styles.dataView}>
                            <View style={styles.dataBox}>
                                <Text style={styles.dataText}>Activity</Text>
                                <DropDown data={activities} OptionStyle={styles.dataTextInput}  initialValue={activities.length==0? null: getActivityById(formikProps.values.activityId).description} onSelect={(item)=>
                                {
                                    formikProps.values.activityId=getActivityByDescription(item).id;
                                }}/>                          
                                </View>
                        </View>
                        <View style={styles.dataView}>
                            <View style={styles.dataBox}>
                                <Text style={styles.dataText}>Fat Percentage</Text>
                                <TextInput style={styles.dataTextInput}placeholder=' Fat% (Optional)'
                                    name='fatpercentage' id='fatpercentage' 
                                    maxLength={6} 
                                    value={formikProps.values.fatpercentage}
                                    onChangeText={formikProps.handleChange('fatpercentage')}
                                    onBlur ={formikProps.handleBlur('fatpercentage')}
                                    keyboardType='decimal-pad'
                                ></TextInput>
                            </View>
                        </View>
                        <View style={styles.dataView}>
                            <View style={styles.dataBox}>
                                <Text style={styles.dataText}>Weight Goal</Text>
                                <DropDown data={constants.weightGoals} initialValue={formikProps.values.weightGoal}  OptionStyle={styles.dataTextInput} onSelect={(item)=>
                                {
                                    formikProps.values.weightGoal=item;

                                }}/>
                                </View>
                        </View>
                    <TouchableOpacity onPress={formikProps.handleSubmit} style={styles.button}>
                             <Text  style={styles.btnText}>{edit==false?"Sign Up":"Save Changes"}</Text>   
                    </TouchableOpacity>
                    </View>

                </ScrollView>
                  )
                  }}
        </Formik>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackGround,
      alignItems: 'center',
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
        alignItems:'center',
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
        marginHorizontal: RFValue(5, 650),
  
      },
  });