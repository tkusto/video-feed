export function uniq(array) {
    return Object.keys(array.reduce((map, item) => {
        map[item] = true;
        return map;
    }, {}));
}
