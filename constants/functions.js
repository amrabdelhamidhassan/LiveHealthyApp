import { store } from "../store/store";
// export const CalculateKatchCaloriesFormula=(user)=>
// {

// }
export const CalculateCaloriesFormula=(user)=>
{

    let calories;
    if(user.gender=='male')
    {
        calories=(10*user.weight+6.25*user.height-5*user.age+5)
    }
    else
    {
        calories=(10*user.weight+6.25*user.height-5*user.age-161)

    }
    return Math.round(calories)
}
export const CalculateFoodCalories=(type,object)=>
{

    let calories=0;
    let protein=0;
    let totalfats=0;
    let totalcarbs=0;
    if(type=='group')
    {
        (object.meals).forEach(meal => {
            (meal.food).forEach(food=>
                {
                    calories=food.nutritionfacts.calories*food.serving+calories
                    protein=food.nutritionfacts.protein*food.serving+protein
                    totalfats=food.nutritionfacts.totalfats*food.serving+totalfats
                    totalcarbs=food.nutritionfacts.totalcarbs*food.serving+totalcarbs
                })
        });
        
    }
    else if(type=='meal')
    {
        (object.food).forEach(food=>
            {
                calories=food.nutritionfacts.calories+calories
                protein=food.nutritionfacts.protein+protein
                totalfats=food.nutritionfacts.totalfats+totalfats
                totalcarbs=food.nutritionfacts.totalcarbs+totalcarbs
            })
    }
    const groupNutrition=
    {
        calories:calories,protein:protein,totalfats:totalfats,totalcarbs:totalcarbs
    }
    return groupNutrition
}
export const CalculateFoodMacrosPercentages=(object)=>
{
    object.protein==0?protein=0:protein=Math.round(object.protein*4/object.calories*100)
    object.totalcarbs==0?carbs=0:carbs=Math.round(object.totalcarbs*4/object.calories*100)
    if(protein ==0 && carbs ==0) fats=0;
    else fats=100-protein-carbs
    if(fats<0)fats=0;
    return ("Protein: "+protein+"% "+"Fat: "+fats+"% "+"Carbs: "+carbs+"% ")

}
