import React , {useEffect} from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserScreen from './src/screens/UserScreen';
import TodoListScreen from './src/screens/TodoListScreen';
import AddItemScreen from './src/screens/AddItemScreen';
import * as SQLite from 'expo-sqlite';

global.db = SQLite.openDatabase('db.todoDatabase ');

const Stack = createNativeStackNavigator();
function TodoList() {
  return(
    <Stack.Navigator>
      <Stack.Screen name='Todo' component={TodoListScreen} options={{title:"To-Do List"}} />
      <Stack.Screen name = 'AddItem' component={AddItemScreen} />
    </Stack.Navigator>
  )
  
}
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="User" component={UserScreen} options={{headerShown:false}}/>
        <Stack.Screen name = "TodoList" component={TodoList} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
