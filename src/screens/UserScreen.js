import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useState,useEffect} from 'react';
import {View, Text, TextInput,StyleSheet} from 'react-native';
import ButtonComponent from '../components/ButtonComponents';

const UserScreen = (props) => {

    useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql(
            "create table if not exists User (id integer primary key not null, name text);"
          );
        });
      }, []);

    const [name, setName] = useState('')
    const handleOnChangeText = (text) => setName(text);

    const addUser = (text) => {
        // is text empty?
        // if (text === null || text === "") {
        //   return false;
        // }
    
        // db.transaction((tx) => {
        //     tx.executeSql("insert into User (name) values (?)", [text]);
        //   },
        //   null,
        // //   forceUpdate
        // );
        // db.transaction((tx) => {
        //   tx.executeSql("select * from User", [], (_, { rows }) =>
        //       console.log(JSON.stringify(rows))
        //     );
        // });

      props.navigation.navigate('TodoList');
        
        
      };
    
    return(
        <View style={styles.container}>
            <Text style={styles.heading}>To-Do App</Text>
            <TextInput 
                style={styles.textInput} 
                placeholder="Enter Name" 
                value={name}
                onChangeText={ handleOnChangeText}/>

            {/* { name.trim().length >=3 ? (<ButtonComponent onPress={addUser(name)}/>) : null } */}
            <ButtonComponent onPress={()=>addUser(name)} title="Start"/>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        justifyContent:'center',
    },
    heading:{
        fontSize:25,
        fontWeight:'700',
        alignSelf:'center',
        margin:10,
        paddingBottom:30,
        color:'#335599'
    },
    textInput:{
        width:'70%',
        borderRadius:3,
        borderWidth:1,
        fontSize:19,
        alignSelf:'center',
        padding:10
    }
})

export default UserScreen;