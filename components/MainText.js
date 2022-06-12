import { Text,View,StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function MainText() {
    return (
      <View style={styles.container}>
              <Text style={styles.text}>Welcome to Live Healthy</Text>
              <Text style={styles.text}>Enter Your Basic Info</Text>
              <Text style={styles.text}>Enter Your Body Shape Goal</Text>
              <Text style={styles.text}>Adjust Your Meals and Start your Diet Plan</Text>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.mainBackGround,
      marginLeft:RFValue(5,65),
      marginVertical:RFValue(5,65),
      alignItems: 'center',
      transform: [{ rotate: '30deg'}]
    },
    text:{
        color:colors.mainTextColor,
        fontWeight:'bold',
        marginTop:RFValue(1,65),
    }
  });