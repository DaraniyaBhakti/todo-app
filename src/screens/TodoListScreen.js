import React, { useEffect, useState } from 'react';
import { View, FlatList} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import ListItem from '../components/ListItemComponents';
const TodoListScreen = ({ route,navigation }) => {
    // console.log(route.params)
     
    const {id} = route.params;
    // console.log(id+"  routeee")
    const [todoItems, setTodoItems] = useState([])
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Entypo name="add-to-list" size={27} color="#335599" 
                    onPress={() => navigation.navigate('TodoList',{
                        screen : 'AddItem',
                        params : {id : id, add:1}
                    })} />

            ),
        })
    }, [navigation])
    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                "create table if not exists TodoList "
                + "(id integer primary key not null, "
                + " title text, "
                + " description text, "
                + " startDate text, "
                + " dueDate text, "
                + " createdDate text, "
                + " updatedDate text, "
                + " status text, "
                + " userId int "
                + ");"
            );
        });
    }, []);

    useEffect(() => {
    
        db.transaction((tx) => {
            tx.executeSql("select * from TodoList where userId=?", [id],
                (txObj, { rows: { _array } }) => setTodoItems(_array)
            );
        });


    })

    const renderItem = ({ item }) => (
        <ListItem item={item} navigation={navigation}/>
    );
    return (
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