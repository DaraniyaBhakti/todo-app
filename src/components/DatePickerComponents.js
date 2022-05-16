import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DatePickerComponent = (props) => {

    const [date, setDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(!isDatePickerVisible);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date);
        let tempDate = date.toString().split(' ');
        let finalDate = date !== ''  ? `${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`: '';
        props.onChange(props.name,finalDate )
        hideDatePicker();
    };

    const getDate = () => {
        let tempDate = date.toString().split(' ');
        return date !== ''
            ? `${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
            : '';
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                value={getDate()}
                placeholder={props.placeholder}
                onChange={(event)=>props.onChange(props.name,event )}
            />
            <TouchableOpacity onPress={showDatePicker}>
                <MaterialIcons style={styles.icon} name="date-range" size={28} color="#335599" />
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: '5%',
        marginTop:'3%',  
        borderWidth:1,
        borderRadius:8,
        borderColor:'#e2e2e2',
        backgroundColor:'white',
        justifyContent: 'space-between',
        paddingHorizontal:'6%',
        alignItems:'center',
        paddingVertical:'4%'
    },
    icon: {
       
    },
    textInput: {
        fontSize:15,
        width:'80%'
    }

})
export default DatePickerComponent;