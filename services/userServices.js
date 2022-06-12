import api from "./api";
import axios from "axios";
import {baseURL} from "./api";
import { GET_USER } from "../store/actions";
import { GET_ACTIVITIES } from "../store/actions";
export async function loginApi(phone,device_name='phone')
{
    axios.defaults.baseURL=baseURL
    axios.defaults.timeout=8000
    const { data } =await axios.post('/sanctum/token',{
        phone:phone ,
        device_name:device_name       
    })
    // console.log(data)
    if(data)
    {
        const userResponse ={
            id:data.user.id,
            fname: data.user.fname,
            lname:data.user.lname,
            phone:data.user.phone,
            roleId:data.user.roleId,
            age:data.user.age,
            height:data.user.height,
            weight:data.user.weight,
            gender:data.user.gender,
            weightGoal:data.user.weightGoal,
            fatpercentage:data.user.fatpercentage,
            roleId:data.user.roleId,
            activityId:data.user.activityId,
            lastLogin:data.user.lastLogin,
            token:data.token,
        }
        return userResponse
    }
    else{
        return null;
    }

}
export async function signupApi(phone,fname,lname,age,height,weight,gender,weightGoal,fatpercentage,activityId,device_name='phone')
{
    axios.defaults.baseURL=baseURL
    axios.defaults.timeout=8000
    const { data } =await axios.post('/sanctum/token/signup',{
        phone:phone ,
        device_name:device_name,       
        fname: fname,
        lname:lname,
        age:age,
        height:height,
        weight:weight,
        gender:gender,
        weightGoal:weightGoal,
        fatpercentage:fatpercentage,
        activityId:activityId,
    })
    // console.log(data)
    if(data)
    {
        const userResponse ={
            id:data.user.id,
            fname: data.user.fname,
            lname:data.user.lname,
            phone:data.user.phone,
            roleId:data.user.roleId,
            age:data.user.age,
            height:data.user.height,
            weight:data.user.weight,
            gender:data.user.gender,
            weightGoal:data.user.weightGoal,
            fatpercentage:data.user.fatpercentage,
            activityId:data.user.activityId,
            lastLogin:data.user.lastLogin,
            token:data.token,
        }
        return userResponse
    }
    else{
        return null;
    }

}
export async function editPersonalInfoApi(phone,fname,lname,age,height,weight,gender,weightGoal,fatpercentage,activityId,device_name='phone')
{
    axios.defaults.baseURL=baseURL
    axios.defaults.timeout=8000
    const { data } =await axios.put('/editpersonalinfo',{
        phone:phone ,
        device_name:device_name,       
        fname: fname,
        lname:lname,
        age:age,
        height:height,
        weight:weight,
        gender:gender,
        weightGoal:weightGoal,
        fatpercentage:fatpercentage,
        activityId:activityId,
    })
    // console.log(data)
    if(data)
    {
        const userResponse ={
            id:data.user.id,
            fname: data.user.fname,
            lname:data.user.lname,
            phone:data.user.phone,
            roleId:data.user.roleId,
            age:data.user.age,
            height:data.user.height,
            weight:data.user.weight,
            gender:data.user.gender,
            weightGoal:data.user.weightGoal,
            fatpercentage:data.user.fatpercentage,
            activityId:data.user.activityId,
            lastLogin:data.user.lastLogin,
            token:data.token,
        }
        return userResponse
    }
    else{
        return null;
    }

}
export  const  loginAction= (user) =>{

    try {
        return async dispatch => {
            
            await dispatch({
                type: GET_USER,
                payload: user
            });
        };
    } 
    catch (error) {
        console.log(error);
    }  
    
}
export const getAllActivitiesApi=async()=>
{

        axios.defaults.baseURL=baseURL
        axios.defaults.timeout=8000
        const Response= await axios.get('/activities');
        return Response;
     

}
export  const  ActivitiesAction= (Activities) =>{

    try {
        return async dispatch => {
            
            await dispatch({
                type: GET_ACTIVITIES,
                payload: Activities
            });
        };
    } 
    catch (error) {
        console.log(error);
    }  
}