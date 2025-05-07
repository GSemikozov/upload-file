export const arrayToCsv = (value: string[]): string => {
    if (!Array.isArray(value) || value.length === 0) {
        return '';
    }

    return value.join(',');
};
