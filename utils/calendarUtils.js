export const getCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const days = [];
    const startDayOfWeek = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    const prevMonthDays = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    const nextMonthDays = 42 - (prevMonthDays + totalDays);

    for (let i = prevMonthDays; i > 0; i--) {
        const prevDate = new Date(year, month, -i + 1);
        days.push({ date: prevDate, day: prevDate.getDate(), isCurrentMonth: false });
    }

    for (let i = 1; i <= totalDays; i++) {
        const currDate = new Date(year, month, i);
        days.push({ date: currDate, day: i, isCurrentMonth: true, isToday: isToday(currDate) });
    }

    for (let i = 1; i <= nextMonthDays; i++) {
        const nextDate = new Date(year, month + 1, i);
        days.push({ date: nextDate, day: i, isCurrentMonth: false });
    }

    return days;
};

const isToday = (date) => {
    const today = new Date();
    return today.toDateString() === date.toDateString();
};