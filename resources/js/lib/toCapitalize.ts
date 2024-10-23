export function toCapitalize(str: string) {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}
