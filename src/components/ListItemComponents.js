import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const ListItem = ({ item }) => {

    const deleteItem = () => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM TodoList WHERE id = ? ', [item.id],
                (txObj, resultSet) => {
                    if (resultSet.rowsAffected > 0) {
                        console.log('deleted')
                        //   let newList = this.state.data.filter(data => {
                        //     if (data.id === id)
                        //       return false
                        //     else
                        //       return true
                        //   })
                        //   this.setState({ data: newList })
                    }
                }
            )
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.status}>{item.status}</Text>
                <View style={styles.buttonView}>
                    <AntDesign name={"edit"} size={25} color="#335599" style={styles.button} />
                    <AntDesign name={"delete"} size={25} color="#335599" style={styles.button} onPress={() => deleteItem()} />
                </View>
            </View>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.dateView}>
                <Text style={styles.dateLable}>Start date :</Text><Text>{item.startDate}</Text>
                <Text style={styles.dateLable}> Due date :</Text><Text> {item.dueDate}</Text>
            </View>
            <View style={styles.dateView}>
                <Text style={styles.dateLable}>Created on :</Text><Text>{item.createdDate}</Text>
                <Text style={styles.dateLable}> Updated on :</Text><Text>{item.updatedDate}</Text>
            </View>

            {/* <View style={styles.buttonView}>
                <AntDesign name={"edit"} size={25} color="#335599" style={styles.button}/>
                <AntDesign name={"delete"} size={25} color="#335599" style={styles.button} />
            </View> */}


        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e2e2e2',
        margin: '2%',
        borderRadius: 5,
        elevation: 5,
        padding: '3%'
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        color: '#335599',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: '2%'
    },
    status: {
        color: '#338833',
        fontSize: 15,
        fontWeight: '500',
        fontStyle: 'italic'
    },
    description: {
        fontSize: 14,
        marginBottom: '2%'
    },
    dateView: {
        flexDirection: 'row',
        marginBottom: '2%'
    },
    dateLable: {
        fontWeight: '500'
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 5
    }

})
export default ListItem;