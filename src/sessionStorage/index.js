export const loadState = key => {
    try {
        const serialized = window.sessionStorage.getItem(key);
        if (serialized === null) {
            return undefined
        }
        return JSON.parse(serialized);
    } catch {
        return undefined;
    }
};

export const updateState = (key, state) => {
    try {
        const serialized = JSON.stringify(state);
        window.sessionStorage.setItem(key, serialized);
    } catch (err) {
        console.log(err)
    }
};
