import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const Day = ({ date, isCurrentMonth, isToday, hasTasks, onPress }) => {
    const { isDarkMode } = React.useContext(ThemeContext);

    return (
        <TouchableOpacity
            style={[
                styles.day,
                isCurrentMonth ? styles.currentMonthDay : styles.otherMonthDay,
                isToday && styles.today,
                isDarkMode && (isCurrentMonth ? styles.darkCurrentMonthDay : styles.darkOtherMonthDay)
            ]}
            onPress={onPress}
        >
            <Text style={[
                isCurrentMonth ? styles.currentMonthText : styles.otherMonthText,
                isDarkMode && (isCurrentMonth ? styles.darkCurrentMonthText : styles.darkOtherMonthText)
            ]}>
                {date.getDate()}
            </Text>
            {hasTasks && <View style={styles.dot} />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    day: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', margin: 5 },
    currentMonthDay: { backgroundColor: '#fff' },
    otherMonthDay: { backgroundColor: '#ddd' },
    darkCurrentMonthDay: { backgroundColor: '#444' },
    darkOtherMonthDay: { backgroundColor: '#555' },
    currentMonthText: { color: '#000' },
    otherMonthText: { color: '#888' },
    darkCurrentMonthText: { color: '#fff' },
    darkOtherMonthText: { color: '#aaa' },
    today: { backgroundColor: '#f00', borderRadius: 20 },
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#007bff', position: 'absolute', bottom: 5 },
});

export default Day;