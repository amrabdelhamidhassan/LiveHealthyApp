import api from "./api";
import { baseURL } from "./api";
import { store } from "../store/store";
import { Alert } from "react-native";
const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

export const getAllUserGroupMeals=async(userId)=>
{

        return await api.get('/groupmeals',
        {
            params:{
            userId:userId
            }
        }
        );
                 

}
export const getAllGroupMealMeals=async(id)=>
{

        return await api.get('/meals',
        {
            params:{
                id:id
            }
        }
        );
                 

}
export const getFoodSearch=async(values)=>
{

        // const response= await api.get('/food/search',
        // {
        //     params:{
        //         name:values.name,
        //         mincalories:values.mincalories,
        //         maxcalories:values.maxcalories,
        //         minprotein:values.minprotein,
        //         maxprotein:values.maxprotein,
        //         mincarbs:values.mincarbs,
        //         maxcarbs:values.maxcarbs,
        //         minfats:values.minfats,
        //         maxfats:values.maxfats,
        //         foodTypeId:values.foodTypeId,
        //         maxfats:values.maxfats,
        //         foodVerfication:values.foodVerfication,
        //         userId:values.userId
        //     }
        // }
        // );
        // if(response)
        // {
        //     console.log(typeof response.data)

        //     if(typeof response.data ==='string')
        //     {
        //         try{
        //             return   JSON.parse(response.data);

        //         }
        //         catch
        //         {
        //             getFoodSearch(values)
        //         }
        //     }
        //     else
        //     {
        //         return response.data;
        //     }
        // }
        // try{
            const params = {
                name:values.name,
                mincalories:values.mincalories,
                maxcalories:values.maxcalories,
                minprotein:values.minprotein,
                maxprotein:values.maxprotein,
                mincarbs:values.mincarbs,
                maxcarbs:values.maxcarbs,
                minfats:values.minfats,
                maxfats:values.maxfats,
                foodTypeId:values.foodTypeId,
                maxfats:values.maxfats,
                foodVerfication:values.foodVerfication,
                userId:values.userId,
                sortBy:values.sortBy,
                sortDir:values.sortDir
            }
            const url = baseURL + '/food/search' + '?' + new URLSearchParams(params);
            const token = store.getState().userReducer.user==null ? null:store.getState().userReducer.user.token;//  =store.getState().session.token; (get token from store)
            const Authorization = `Bearer ${token}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': Authorization
                }
            })
            let responseText = await response.text();
            console.log(responseText)

            let responseJson=JSON.parse(responseText);
            return responseJson
        // }
        // catch
        // {
        //     console.log("getFoodSearch Called Recursively")
        //     return await getFoodSearch(values)
        // }

}
export const deleteGroupMealApi=async(id)=>
{
    await api.delete('/groupmeals/delete',{
        data: {
            id:id
        }
    })
                 

}
export const deleteMealApi=async(id)=>
{
    await api.delete('/meals/delete',{
        data: {
            id:id
        }
    })
                 

}
export const createGroupMealApi=async(name,userId)=>
{
    await api.post('/groupmeals/create',{
            name:name,
            userId:userId
        
    })
                 

}
export const createNewFoodApi=async(values)=>
{
    await api.post('/food/create',{
        name:values.name,
        foodTypeId:values.foodTypeId,
        calories:values.calories,
        servingSize:values.servingSize,
        totalfats:values.totalfats,
        totalcarbs:values.totalcarbs,
        protein:values.protein,
        servingQuantityId:values.servingQuantityId,
        mealId:values.mealId,
        userId:values.userId,
        serving:values.serving
    })
                 

}
export const addtoMealApi=async(values)=>
{
    try{
    await api.post('/food/addtomeal',{
        foodId:values.foodId,
        mealId:values.mealId,
        serving:values.serving
    })
    }
    catch{
        Alert.alert('food already exists in this meal')
    }

}
export const createMealApi=async(name,groupId)=>
{
    await api.post('/meals/create',{
            name:name,
            groupId:groupId
        
    })
                 

}
export const removeFoodApi=async(foodId,mealId)=>
{
    await api.put('/food/remove',{
        
            foodId:foodId,
            mealId:mealId

        
    })
                 

}