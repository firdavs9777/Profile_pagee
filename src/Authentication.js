import  React,{useState,useRef,useEffect} from 'react';
import { Button, View, Text, StyleSheet,KeyboardAvoidingView} from 'react-native';
import { FlatList, TextInput,TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Countries} from './Countries';


export function Authentication({ navigation }) {
    let textInput = useRef(null);
    const defaultCodeCountry = "+82";
    const defaultMaskCountry = "125 45 47 ";
    const [phoneNumber,setPhoneNumber] = useState();
    const [focusInput,setFocusInput] = useState(true);
    const [modalVisible,setModalVisible] = useState(false);
    const [dataCountries,setDataCountries] = useState(Countries);
    const [codeCountry,setCodeCountry] = useState(defaultCodeCountry);
    const [placeholder,setPlaceHolder] = useState(defaultMaskCountry);
 
 
    const onShowHideModal = () =>{
        setModalVisible(!modalVisible);
    }
 
    const filterCountries = (value) =>{
     if(value){
         const countryData = dataCountries.filter((obj)=>
         (obj.en.indexOf(value) > -1 || obj.dialCode.indexOf(value)>- 1 ))
         setDataCountries(countryData)
     }
     else 
     {
         setDataCountries(Countries)
     }
    }
 
    const onchangePhone = (number) =>{
        setPhoneNumber(number)
    }
 
    const onPressContinue = ()=>{
    if(phoneNumber)
    {
        navigation.navigate('InputOTP')
    }
    }
 
    const onCountryChange = (item) =>{
        setCodeCountry(item.dialCode);
        setPlaceHolder(item.mask);
        onShowHideModal()
    }
 
 
    useEffect(() => {
        textInput.focus();
       },[])
 
   const OnChangeFocus  = ()=>{
        setFocusInput(true)
    }
    const OnChangeBlur = () =>{
        setFocusInput(false)
    }
    
 
       let renderModal = () =>{
        return(
            <Modal animationType="slide" transparent={false} visible={modalVisible}>
             <SafeAreaView style={{flex:1}}>
  <View style={styles.modalContainer}>
  <View style={styles.filterInputContainers}>
<TextInput
    autoFocus={true}
    onChangeText={filterCountries}
    placeholder={'Filter'}
    focusable={true}
    style={styles.filterInputStyle}
/>
</View>


  <FlatList
      style={{flex:1}}
        data={dataCountries}
          extraData={dataCountries}
            keyExtractor={(item,index)=>index.toString()}
               renderItem={
                  ({item}) =>(
                  <TouchableWithoutFeedback onPress={()=> onCountryChange(item)}>
   <View style={styles.countryModalStyle}>
<View style={styles.modalContainer}>
<Text style={styles.modalItemName}>{item.en}</Text>
<Text style={styles.modalItemDialCode}>{item.dialCode}</Text>
   </View>
  </View>        
</TouchableWithoutFeedback>
 )
}
/>
</View>

<TouchableOpacity onPress={onShowHideModal} style={styles.closeButtonStyle}>
    <Text style={styles.closeTextStyle}>{'CLOSE'}</Text>
</TouchableOpacity>

             </SafeAreaView>       
    </Modal> 
 )
}
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={styles.containerAvoidingView}
        >
        <Text style={styles.textTitle}>Registration</Text>
         <View style={[styles.containerInput,
         {
             borderBottomColor:focusInput? '#244DB7' : '#ffffff'
         } 
         ]}>
           <TouchableOpacity onPress={onShowHideModal}>
           <View styles={styles.openDialogView}>
              <Text>{codeCountry + " |"}</Text>
                 </View>
           </TouchableOpacity>
           
                 <TextInput style={styles.phoneInputStyle}
                 ref={(input)=> textInput = input}
                          placeholder={placeholder}
                                 keyboardType="numbers-and-punctuation"
                                   value={phoneNumber}
                                     onChangeText={onchangePhone}
                                        secureTextEntry={false}
                                            onFocus={OnChangeFocus}
                                              onBlur={OnChangeBlur}
                                              autoFocus={focusInput}
                                               
                                        />
                
         </View>
<View style={styles.viewBottom}>
<TouchableOpacity onPress={onPressContinue}>
<View style={styles.btnContinue,
{
    backgroundColor:phoneNumber? '#244DB7' : 'gray'
}

}>
    <Text style={{color:'#ffffff', alignItems:'center'}}>
        Continue
    </Text>
</View>
</TouchableOpacity>
</View>

        </KeyboardAvoidingView>
      </View>
    );
}
  const styles = StyleSheet.create({
    container :{
        flex:1
    },
    containerAvoidingView:{
        flex: 1,
        alignItems:'center',
        padding:8
    },
    textTitle:{
        marginBottom:50,
        marginTop:50,
        fontSize:15
    },
    containerInput:{
        flexDirection:'row',
        paddingHorizontal:10,
        borderRadius:10,
        backgroundColor:'white',
        alignItems:'center',
        borderBottomWidth:1.5
    },
    openDialogView:{
        flexDirection:'row',
        alignItems:'center',
      justifyContent:'center'
    },
    phoneInputStyle:{
        marginLeft:5,
        flex:1,
        height:50
    },
    viewBottom:{
        flex:1,
        justifyContent:'flex-end',
        margin:50,
        alignItems:'center'
    },
    btnContinue:{
        alignItems:'center',
        width:150,
        height:50,
        borderRadius:10,
        justifyContent:'center',
        backgroundColor: '#244DB7'
    },
    modalContainer:{
        paddingTop:15,
        paddingLeft:25,
        paddingRight:25,
        flex:1,
        backgroundColor:'white'
    },
    filterInputStyle:{
        flex:1,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#fff',
        color:'#424242'
    },
    countryModalStyle:{
        flex:1,
        borderColor:'black',
        borderTopWidth:1,
        padding:12,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    modalContainer:{
        flex:1,
        paddingLeft:5,
        flexDirection:'row'
    },
    modalItemName:{
        flex:1,
        fontSize:16,
    },
    modalItemDialCode:{
        fontSize:16,

    },
    filterInputContainers:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    closeButtonStyle:{
        padding:12,
        alignItems:'center',
    },
    closeTextStyle:{
        padding:5,
        fontSize:20,
        color:'black',
        fontWeight:'bold',

    }
  });