import { StyleSheet, Text, View ,Image,Modal,TouchableOpacity,SafeAreaView,FlatList} from 'react-native';
import { useState } from 'react';
import { colors } from '../constants/colors';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useEffect } from 'react';
export default function DropDown({data=[],initialValue=null,onSelect=()=>{},OptionStyle={
  borderRadius: 20,
  padding: 10,
  margin:5,
  elevation: 2,
  backgroundColor: colors.mainThemeColor,
}
,OptionTextStyle={
  color: colors.mainTextColor,
  fontWeight: "bold",
  textAlign: "center"
}
}) {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem,setSelctedItem]=useState(initialValue==null? data[0].data :initialValue);
    const SelectOption = ({ title }) => (
      <TouchableOpacity
          style={OptionStyle}
          onPress={() => {setModalVisible(!modalVisible);setSelctedItem(title);onSelect(title)}}
        >
          <Text style={OptionTextStyle}>{title}</Text>
    </TouchableOpacity>
    );
    const renderSelectOption = ({ item }) => (
      <SelectOption title={item.data} />
    );
    useEffect(()=>
    {
    },[]);

    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <SafeAreaView style={styles.modalView}>
                <FlatList
                  data={data}
                  renderItem={renderSelectOption}
                  keyExtractor={item => item.id}
                  listKey={item => (Math.random*1000).toString()+(item.id).toString()}

                />
          </SafeAreaView>
          </View>
        </Modal>
        <TouchableOpacity
          style={OptionStyle}
          onPress={() => setModalVisible(true)}
        >
          <Text style={OptionTextStyle}>{selectedItem}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    centeredView: {
      flexGrow: 1,
      marginLeft:2,
      justifyContent: "center",
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 5,
      alignItems: "center",
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
    }
  });