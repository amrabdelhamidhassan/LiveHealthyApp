import PersonalInfo from "../components/PersonalInfo"
export default function SignUpScreen({navigation,route}) {
    return(
   <PersonalInfo navigation={navigation} user={
    {
        phone:route.params.phone,
        fname:"",
        lname:"",
        age:"",
        weight:"",
        height:"",
        gender:"male",
        activityId:"1",
        fatpercentage:'0.00',
        weightGoal:"maintain",
    }
   } 
   edit={false}/>
    )
  };