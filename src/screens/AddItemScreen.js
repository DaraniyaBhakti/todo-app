import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import StatusRadioButtonComponent from '../components/StatusRadioButtonComponent';
import ButtonComponent from '../components/ButtonComponents';
import DatePickerComponent from '../components/DatePickerComponents';

const AddItemScreen = ({ route, navigation }) => {

    const [ title, setTitle] = useState("")
    const [ description, setDescription] = useState("")
    const [ status, setStatus] = useState("")
    const [ startDate, setStartDate] = useState("")
    const [ dueDate, setDueDate] = useState("")

    const { id, add, itemId } = route.params;
    navigation.setOptions({ title: add === 1 ? "Add Item" : "Updated Item" })
    useEffect(() => {
        if (add === 0) {
            db.transaction((tx) => {
                tx.executeSql("select * from TodoList where id = ? ", [itemId], (_, { rows }) => {
                        setTitle(rows._array[0]['title'])
                        setDescription(rows._array[0]['description'])
                        setStatus(rows._array[0]['status'])
                        setStartDate(rows._array[0]['startDate'])
                        setDueDate(rows._array[0]['dueDate'])
                    
                }
                );
            })
        }

    }, [])
   
    const isValidData = () => {
        let valid=true
       
        if(!title.trim()){valid = false}
        if(!description.trim()){valid = false}
        if(!status.trim()){valid = false}
        if(!startDate.trim()){valid = false}
        if(!dueDate.trim()){valid = false}
        console.log(valid) 
        return valid;

    }
    const buttonClick = () => {
       if(isValidData()){
            if(add === 1 ){
                insertItem()
            }else{
                updateItem()
            }

            navigation.navigate('TodoList',
                {
                    screen: 'Todo',
                    params: { id: id }
                });
        }else{alert('Please enter valid data')}
        
    }

    function getCurrentDate() {
        let dateCreated = new Date()
        let tempDate = dateCreated.toString().split(' ');
        let finalDate = dateCreated !== '' ? `${tempDate[1]} ${tempDate[2]} ${tempDate[3]}` : '';
        return finalDate;
    }
    const insertItem = () => {
        
        db.transaction((tx) => {
            tx.executeSql("insert into TodoList (title,description,startDate,dueDate,createdDate,updatedDate,status,userId) values (?,?,?,?,?,?,?,?)",
                [title, description, startDate, dueDate, getCurrentDate(), '', status, id]);
        },
            null,
        );

    }

    const updateItem = () => {
        db.transaction((tx) => {
            tx.executeSql('UPDATE TodoList SET title = ?, description = ?, status = ?, startDate = ?, dueDate = ?, updatedDate =? WHERE id = ?', 
                [title,description,status,startDate,dueDate,getCurrentDate(),itemId],
              
              )
          })

          db.transaction((tx) => {
            tx.executeSql("select * from TodoList where id=?", [itemId],
                (txObj, { rows: { _array } }) => console.log(_array)
            );
        });

          
    }

    return (

        <View style={styles.container}>
            <Text style={styles.heading}>What is to do be done?</Text>

            <TextInput
                placeholder='Title'
                onChangeText = { (e) => setTitle(e)}
                value = { add ===0 ? !!title ? title : null : null}
                style={styles.textInput} />
            <TextInput
                placeholder='Description'
                style={styles.textInput}
                value = { add ===0 ? !!description ? description : null : null}
                onChangeText = { (e) => setDescription(e)}
                multiline={true} />

            <Text style={styles.statusHeading}>Status</Text>
            <StatusRadioButtonComponent
                onChange = {setStatus}
                addItem={add}
                statusValue={ add === 0 ? !!status ? (status=== 'To-do' ? 1 : 2) :null : null}
                />

            <Text style={styles.statusHeading}>Schedule</Text>
            <DatePickerComponent
                placeholder="Select start date"
                onChange={setStartDate}
                name="startDate"
                addItem={add}
                dateValue = { add ===0 ? !!startDate ? startDate : null : null}
                />
            <DatePickerComponent
                placeholder="Select due date"
                onChange={setDueDate}
                name="dueDate"
                addItem={add}
                dateValue = { add ===0 ? !!dueDate ? dueDate : null : null}
                />

            <ButtonComponent title={add == 1 ? "Add" : "Update"} onPress={() => buttonClick()} />
        </View>


    )
}

const styles = StyleSheet.create({
    container: {

    },
    heading: {
        marginHorizontal: '7%',
        marginTop: '3%',
        fontSize: 22,
        fontWeight: '500'
    },
    textInput: {
        marginHorizontal: '5%',
        marginTop: '3%',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#e2e2e2',
        backgroundColor: 'white',
        paddingVertical: '4%',
        paddingHorizontal: '6%',
        fontSize: 16
    },
    statusHeading: {
        marginHorizontal: '7%',
        marginTop: '5%',
        fontSize: 17,
        fontWeight: '400'
    }
})
export default AddItemScreen;