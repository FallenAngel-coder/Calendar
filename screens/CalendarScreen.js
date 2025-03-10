import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { getCalendarDays } from '../utils/calendarUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../context/ThemeContext';

const CalendarScreen = ({ navigation }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [tasks, setTasks] = useState({});
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadTasks();
        });
        return unsubscribe;
    }, [navigation]);

    const loadTasks = async () => {
        try {
            const currentUser = await AsyncStorage.getItem('currentUser');
            if (currentUser) {
                const storedTasks = await AsyncStorage.getItem(`tasks_${currentUser}`);
                if (storedTasks) {
                    setTasks(JSON.parse(storedTasks));
                }
            }
        } catch (error) {
            console.error('Помилка завантаження задач:', error);
        }
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('currentUser');
            navigation.navigate('Вхід');
        } catch (error) {
            console.error('Помилка виходу:', error);
        }
    };

    const days = getCalendarDays(currentDate);

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <View style={[styles.header, isDarkMode && styles.darkHeader]}>
                <TouchableOpacity onPress={handlePrevMonth}>
                    <Text style={[styles.navButton, isDarkMode && styles.darkText]}>◀</Text>
                </TouchableOpacity>
                <Text style={[styles.headerText, isDarkMode && styles.darkText]}>
                    {currentDate.toLocaleString('uk-UA', { month: 'long', year: 'numeric' })}
                </Text>
                <TouchableOpacity onPress={handleNextMonth}>
                    <Text style={[styles.navButton, isDarkMode && styles.darkText]}>▶</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={days}
                numColumns={7}
                keyExtractor={(item) => item.date.toString()}
                renderItem={({ item }) => {
                    const dateKey = item.date.toDateString();
                    const hasTasks = tasks[dateKey] && tasks[dateKey].length > 0;
                    return (
                        <TouchableOpacity
                            style={[
                                styles.day,
                                item.isCurrentMonth ? styles.currentMonthDay : styles.otherMonthDay,
                                item.isToday ? styles.today : null,
                                isDarkMode && (item.isCurrentMonth ? styles.darkCurrentMonthDay : styles.darkOtherMonthDay)
                            ]}
                            onPress={() => navigation.navigate('Завдання', { date: item.date })}
                        >
                            <Text style={[
                                item.isCurrentMonth ? styles.currentMonthText : styles.otherMonthText,
                                isDarkMode && (item.isCurrentMonth ? styles.darkCurrentMonthText : styles.darkOtherMonthText)
                            ]}>
                                {item.day}
                            </Text>
                            {hasTasks && <View style={styles.dot} />}
                        </TouchableOpacity>
                    );
                }}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={handleToday}>
                    <Text style={styles.buttonText}>Сьогодні</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Вийти</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={toggleTheme}>
                    <Text style={styles.buttonText}>{isDarkMode ? "Світла тема" : "Темна тема"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#fff' },
    darkContainer: { backgroundColor: '#333' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: '#007bff' },
    darkHeader: { backgroundColor: '#444' },
    headerText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
    darkText: { color: '#fff' },
    navButton: { fontSize: 20, padding: 10, color: '#fff' },
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
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    darkButton: { backgroundColor: '#555' },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#007bff', position: 'absolute', bottom: 5 },
});

export default CalendarScreen;