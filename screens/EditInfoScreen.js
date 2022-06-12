import PersonalInfo from "../components/PersonalInfo"
import { useEffect } from "react"
import { store } from "../store/store"
export default function EditInfoScreen({navigation,route}) {

    return(
   <PersonalInfo navigation={navigation} user={route.params.user} edit={route.params.edit}/>
    )
  };