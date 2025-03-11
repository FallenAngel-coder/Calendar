import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const Header = ({ currentDate, onPrevMonth, onNextMonth }) => {
    const { isDarkMode } = React.useContext(ThemeContext);

    return (
        <View style={[styles.header, isDarkMode && styles.darkHeader]}>
            <TouchableOpacity onPress={onPrevMonth}>
                <Text style={[styles.navButton, isDarkMode && styles.darkText]}>◀</Text>
            </TouchableOpacity>
            <Text style={[styles.headerText, isDarkMode && styles.darkText]}>
                {currentDate.toLocaleString('uk-UA', { month: 'long', year: 'numeric' })}
            </Text>
            <TouchableOpacity onPress={onNextMonth}>
                <Text style={[styles.navButton, isDarkMode && styles.darkText]}>▶</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: '#007bff' },
    darkHeader: { backgroundColor: '#444' },
    headerText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
    darkText: { color: '#fff' },
    navButton: { fontSize: 20, padding: 10, color: '#fff' },
});

export default Header;