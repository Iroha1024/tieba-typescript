//防抖

export default function debounce(self: object, fn: Function, delay: number) {
    let timeout: number;
    return function () {
        clearTimeout(timeout);
        timeout = window.setTimeout(() => {
            fn.apply(self, arguments);
        }, delay);
    }
};
