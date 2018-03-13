const RANGES = [
    { base: 1000, suffix: 'k' },
    { base: 1000000, suffix: 'M' }
];

export default function videoViewsCountFilter() {
    return function videoViewsCount(count, fallback = '') {
        const num = typeof count === "number" ? count : parseInt(count, 10);
        return isNaN(num) ? fallback : fitToRange(num);
    }
}

function fitToRange(num) {
    const range = RANGES.reduce((result, range) => num >= range.base ? range : result, undefined);
    if (range) {
        const integer = Math.floor(num / range.base);
        const fraction = Math.round((num % range.base) / range.base * 10);
        return fraction > 0 ?
            (fraction < 10 ?
                `${integer}.${fraction}${range.suffix}`:
                fitToRange((integer + 1) * range.base)):
            `${integer}${range.suffix}`;
    } else {
        return num.toString(10);
    }
}
