export const initialState = {
    brand: null,
    model: null,
    fuel: null,
};

export default (state = initialState, {type, value, newState}) => {
    switch (type) {
        case 'BRAND':
            if (value === '') return initialState;
            return {
                ...initialState,
                brand: value,
            };
        case 'MODEL':
            const model = value === '' ? null : value;
            return {
                ...state,
                model,
                fuel: null,
            };
        case 'FUEL':
            const fuel = value === '' ? null : value;
            return {
                ...state,
                fuel,
            };
        case 'UPDATE_ALL':
            return newState;
        default:
            return state
    }
}
