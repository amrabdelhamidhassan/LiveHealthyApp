import { StyleSheet, Text, View,TextInput,TouchableOpacity,Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../constants/colors';
import { useEffect } from 'react';
import { Formik } from 'formik';
import { store } from '../store/store';
import { getAllActivitiesApi,ActivitiesAction } from '../services/userServices';
import { loginApi,loginAction } from '../services/userServices';
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import MainText from '../components/MainText';
import React,{ useState } from 'react'
import * as yup from 'yup';
export default function LoginScreen({navigation}) {
  const firebaseConfig = {
    apiKey: "AIzaSyDuOLOzodXvVMAg7gvSiJMDxhx00A9uimY",
    authDomain: "livehealthy-a27a2.firebaseapp.com",
    projectId: "livehealthy-a27a2",
    storageBucket: "livehealthy-a27a2.appspot.com",
    messagingSenderId: "853046217725",
    appId: "1:853046217725:web:9d2c4e0c6a960638956794",
    measurementId: "G-B605TMQPFW"
};
  initializeApp(firebaseConfig);
  const auth =getAuth();
  const app =getApp();
  const ReviewSchema=yup.object(
    {
      phone: yup.string().required("Phone is required").min(2, "Enter your Valid Phone Number"),

    }
  )
  const recaptchaVerifier = React.useRef(null);
  const dispatch=useDispatch();
  const [codeSent,setCodeSent]=useState(false);
  const [final, setfinal] = useState('');
  const loginUserToStore = async (user) => dispatch(loginAction(user))
  const saveActivitiesToStore = async (activities) => dispatch(ActivitiesAction(activities))

  const ValidateOtp = async(Code) => {
    const credential = PhoneAuthProvider.credential(
      final,
      Code
    );
    await signInWithCredential(auth, credential);
    return true
    
}
  const sendSmsVerficationCode=async(Phone)=>
  {
    // const phoneProvider = new PhoneAuthProvider(auth);
    // const verificationId = await phoneProvider.verifyPhoneNumber(
    //    "+2"+Phone,
    //   recaptchaVerifier.current
    //  );
    //  setfinal(verificationId);
    setCodeSent(true)
  }
  const login=async(Code,Phone)=>
  {
    // let verifiycody=ValidateOtp(Code);
    // if(verifiycody)
    //  {
    const User = await loginApi(Phone)
    if(User)
    {
      await loginUserToStore(User)

    }
    else 
    {
      navigation.navigate('SignUpScreen',{phone:Phone})
    }
    // }
  }
    return (
      <Formik
      initialValues={{
        phone:'',
        code:''
      }}
      validationSchema={ReviewSchema}
      onSubmit={async(values)=>
      {
        if(codeSent)
        {
          login(values.code,values.phone)
        }
        else
        {
           const response=await getAllActivitiesApi();
           if(response)
           {
            await  saveActivitiesToStore(response.data)
           }
          sendSmsVerficationCode(values.phone)
        }
      }
    }
      >      
      {
                
        (formikProps) => {
          return (  
        <TouchableOpacity activeOpacity={0.9} pressDelay={3} onPress={()=>{Keyboard.dismiss();}}  style={styles.container}>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={app.options}
            attemptInvisibleVerification
          />
          <View>
                  <MainText/>
          </View>
{!codeSent&&
          <View>
            
            <TextInput style={styles.textInput}
            name='phone' id='phone' 
            placeholder='Enter Your Phone Please'
            value={formikProps.values.phone}
            onChangeText={formikProps.handleChange('phone')}
            onBlur ={formikProps.handleBlur('phone')}
            keyboardType='decimal-pad'
            >
            </TextInput>
            {formikProps.touched && formikProps.errors.phone&&<Text style={styles.error}>{formikProps.touched && formikProps.errors.phone? formikProps.errors.phone:""}</Text>}
            <TouchableOpacity style={styles.button} onPress={formikProps.handleSubmit}>
                   <Text style={styles.btnText}>Login</Text>   
            </TouchableOpacity>
          </View>
}
 {codeSent&&
          <View>
            <TextInput style={styles.textInput}
              name='code' id='code' 
              placeholder='Enter SMS Code'
              value={formikProps.values.code}
              onChangeText={formikProps.handleChange('code')}
              onBlur ={formikProps.handleBlur('code')}
            >
            </TextInput>
            {formikProps.touched && formikProps.errors.code&&<Text style={styles.error}>{formikProps.touched && formikProps.errors.code? formikProps.errors.code:""}</Text>}
            <TouchableOpacity onPress={formikProps.handleSubmit} style={styles.button}>
                   <Text  style={styles.btnText}>Confirm Sms</Text>   
            </TouchableOpacity>
          </View>
}
      <View  id="recaptcha-container"></View>

          <StatusBar style="auto" />
        </TouchableOpacity>
            );
          }
        }
      </Formik>
          
        
    );
    
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackGround,
      alignItems: 'center',
      justifyContent: 'flex-start',

    },
    textInput:
    {
      backgroundColor:colors.mainThemeColor,
      padding:RFValue(0.5,65),
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
    text:
    {
      color:colors.mainTextColor,
      fontWeight:'bold'
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