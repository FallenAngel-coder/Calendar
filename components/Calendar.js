import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCalendarDays } from '../utils/calendarUtils';
import Header from './Header';
import Day from './Day';
import { ThemeContext } from '../context/ThemeContext';

const Calendar = ({ navigation }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [tasks, setTasks] = useState({});
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
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

    const days = getCalendarDays(currentDate);

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <Header currentDate={currentDate} onPrevMonth={handlePrevMonth} onNextMonth={handleNextMonth} />
            <FlatList
                data={days}
                numColumns={7}
                keyExtractor={(item) => item.date.toString()}
                renderItem={({ item }) => {
                    const dateKey = item.date.toDateString();
                    const hasTasks = tasks[dateKey] && tasks[dateKey].length > 0;
                    return (
                        <Day
                            date={item.date}
                            isCurrentMonth={item.isCurrentMonth}
                            isToday={item.isToday}
                            hasTasks={hasTasks}
                            onPress={() => navigation.navigate('Завдання', { date: item.date })}
                        />
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
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5
    },
    darkButton: { backgroundColor: '#555' },
});

export default Calendar;