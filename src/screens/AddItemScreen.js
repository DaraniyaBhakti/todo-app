import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import StatusRadioButtonComponent from '../components/StatusRadioButtonComponent';
import ButtonComponent from '../components/ButtonComponents';
import DatePickerComponent from '../components/DatePickerComponents';

const AddItemScreen = ({navigation}) => {

    const [itemData, setItemData] = useState()

    useEffect(() => {
        generateItemData();
    }, [])
    const generateItemData = () => {
        setItemData((old) => ({
            title: "",
            description: "",
            status: "",
            startDate: "",
            dueDate: ""
        })
        )
    }

    const isValidItem = () => {
        let isValid
        Object.keys(itemData).map((field) => {
            switch (field) {
                case 'title':
                case 'description':
                case 'status':
                case 'startDate':
                case 'dueDate':
                    {
                        if (!!itemData[field]) {
                            isValid = true
                        } else {
                            isValid = false
                        }
                    }
                    break;


            }
        })

        if (isValid) {
            return true
        } else {
            return false
        }


    }

    const buttonClick = () => {

        if (isValidItem()) {
            insertItem()
            // navigation.navigate('Todo');
            console.log('inserted data')
        } else {
            console.log('data not ok')
        }
    }

    const insertItem = () => {
        let dateCreated=new Date()
        let tempDate = dateCreated.toString().split(' ');
        let finalDate = dateCreated !== ''  ? `${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`: '';
        db.transaction((tx) => {
            tx.executeSql("insert into TodoList (title,description,startDate,dueDate,createdDate,updatedDate,status,userId) values (?,?,?,?,?,?,?,?)",
                [itemData.title, itemData.description, itemData.startDate, itemData.dueDate, finalDate, 'xcvybub', itemData.status, 3]);
        },
        null,
        );

        db.transaction((tx) => {
                    tx.executeSql("select * from TodoList where userId = ?", [3], (_, { rows }) =>
                        console.log(JSON.stringify({rows}))
                      );
                    //   tx.executeSql("select * from TodoList where userId = ?", [2], 
                    //     (txObj, { rows: { _array } }) => setTodoItems({ _array }) 
                    // //    =>
                    // //   console.log(JSON.stringify(rows))
                    // );
                  });
                  
    }
    const handleOnChange = (name, event) => {

        setItemData((old) => ({
            ...old,
            [name]: event
        })
        )
    }
    return (

        <View style={styles.container}>
            <Text style={styles.heading}>What is to do be done?</Text>

            <TextInput
                placeholder='Title'
                onChangeText={(event) => handleOnChange('title', event)}
                style={styles.textInput} />
            <TextInput
                placeholder='Description'
                style={styles.textInput}
                onChangeText={(event) => handleOnChange('description', event)}
                multiline={true} />

            <Text style={styles.statusHeading}>Status</Text>
            <StatusRadioButtonComponent onChange={handleOnChange} />

            <Text style={styles.statusHeading}>Schedule</Text>
            <DatePickerComponent placeholder="Select start date" onChange={handleOnChange} name="startDate" />
            <DatePickerComponent placeholder="Select due date" onChange={handleOnChange} name="dueDate" />

            <ButtonComponent title="Add" onPress={() => buttonClick()} />
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