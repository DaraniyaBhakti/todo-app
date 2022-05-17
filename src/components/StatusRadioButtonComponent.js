import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native-expo';


const statusData = [
    {
        label: 'To-do',
        accessibilityLabel: 'todo'
    },
    {
        label: 'Completed',
        accessibilityLabel: 'completed'
    }
];
const StatusRadioButtonComponent = (props) => {

    return (
        <RadioButtonRN
            data={statusData}
            selectedBtn={(e) => props.onChange(e.label)}
            activeColor='#335599'
            initial={props.addItem === 0 ? props.statusValue : 0}
            boxStyle={styles.box}
            textStyle={{ fontSize: 16 }}
        />
    )
}
const styles = StyleSheet.create({
    box: {
        marginHorizontal: "5%",

    }
})
export default StatusRadioButtonComponent;