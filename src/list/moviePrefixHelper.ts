export const movieIdCleaner = (ID: string): string => {
    const idPrefix = /^(fw|cw)/;
    return ID.replace(idPrefix, '');
}
