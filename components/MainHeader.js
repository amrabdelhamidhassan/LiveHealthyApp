import { StyleSheet, Text, View ,Image} from 'react-native';
import { icons } from '../constants/icons';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { colors } from '../constants/colors';
export default function MainHeader() {
    return (
      <View style={styles.container}>
        <Image        
             style={styles.icon} source={icons.mainIcon}
        />
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
        marginTop:RFValue(1,65),
      flexDirection: 'row',
      backgroundColor: colors.mainThemeColor,
      alignItems: 'flex-end',
      justifyContent: 'flex-start'
    },
    icon:
    {
      height: RFValue(40, 650),
      width: RFValue(40, 650),
      marginHorizontal:RFValue(5, 650),
      alignSelf: 'center',
      resizeMode: 'contain',
      backgroundColor:'#fff',
      marginHorizontal:RFValue(3,65),
      marginVertical:RFValue(1,65),
    }
  });