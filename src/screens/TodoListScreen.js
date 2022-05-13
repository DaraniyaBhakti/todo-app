import React,{useEffect, useState} from 'react';
import {View,Text, TouchableOpacity,Button,FlatList,SafeAreaView} from 'react-native'; 
import { Entypo } from '@expo/vector-icons'; 
import ListItem from '../components/ListItemComponents';
const TodoListScreen = ({navigation}) => {
    const [todoItems, setTodoItems] = useState([])
    React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=>(
                <Entypo name="add-to-list" size={27} color="#335599" onPress={()=>navigation.navigate('AddItem')} />
              
            ),
        })
    },[navigation])
    useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql(
            "create table if not exists TodoList "
                +"(id integer primary key not null, "
                +" title text, "
                +" description text, "
                +" startDate text, "
                +" dueDate text, "
                +" createdDate text, "
                +" updatedDate text, "
                +" status text, "
                +" userId int "
                +");"
          );
        });
      },[]);

      useEffect(() => {
            
            db.transaction((tx) => {
                tx.executeSql("select * from TodoList where userId=?", [3], 
                    (txObj, { rows: { _array } }) => setTodoItems( _array ) 
                    // (txObj,{rows}) => setTodoItems({rows})
                );
          });
        
          
      },[])
  console.log(todoItems)
    // const addItem = () => {
    //     console.log("clicked")
    //     db.transaction((tx) => {
    //         tx.executeSql("insert into TodoList (title,description,startDate,dueDate,createdDate,updatedDate,status,userId) values (?,?,?,?,?,?,?,?)",
    //              ['assignment 44','datahandling storagee','10/05/2022','13/05/2022','10/0/2022','11/05/2022','ONPRress',3]);
    //       },
    //       null,
    //     //   forceUpdate
    //     );
    //     // (txObj, { rows: { _array } }) => this.setState({ data: _array }) 
    //     db.transaction((tx) => {
    //         // tx.executeSql("select * from TodoList where userId = ?", [2], (_, { rows }) =>
    //         //     console.log(JSON.stringify(rows['id']))
    //         //   );
    //           tx.executeSql("select * from TodoList where userId = ?", [2], 
    //             (txObj, { rows: { _array } }) => setTodoItems({ _array }) 
    //         //    =>
    //         //   console.log(JSON.stringify(rows))
    //         );
    //       });
          
    // }

    
    
    const renderItem = ({ item }) => (
        <ListItem item={item}/>
      );
    return(
        <View>
            <FlatList
                data={todoItems}
                renderItem={renderItem}    
                // keyExtractor={item => item.id}
            />
        </View>

    )
}

export default TodoListScreen;