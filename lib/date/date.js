export function formatDate(input) {
    const date = Date.parse(input)
    if (!isNaN(date)) {
        return new Intl.DateTimeFormat('en-US').format(date)
    } else {
        return input
    }
}