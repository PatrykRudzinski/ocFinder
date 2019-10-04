const base = 'https://api-dev.mfind.pl/cars';

const argumentsAreComplete = ({data, required}) => {
    required.forEach(arg => {
        if (!data.hasOwnProperty(arg)) throw Error(`${arg} is missing!`);
    });
    return true;
};

export default {
    brands: () => base,
    models: data => {
        const {brand} = data;
        const required = ['brand'];
        if (argumentsAreComplete({data, required}))
            return `${base}/${brand}/models`
    },
    fuels: data => {
        const { brand, model } = data;
        const required = [ 'brand', 'model' ];
        if (argumentsAreComplete({data, required}))
            return `${base}/${brand}/models/${model}/fuels`
    },
    engines: data => {
        const { brand, model, fuel } = data;
        const required = ['brand', 'model', 'fuel' ];
        if (argumentsAreComplete({data, required}))
            return `${base}/${brand}/models/${model}/fuels/${fuel}/eng_caps`
    },
    years: data => {
        const { brand, model, fuel, engine } = data;
        const required = ['brand', 'model', 'fuel', 'engine'];
        if (argumentsAreComplete({data, required}))
            return `${base}/${brand}/models/${model}/fuels/${fuel}/eng_caps/${engine}/years`
    },
    carsList: data => {
        const { brand, model, fuel } = data;
        const required = ['brand', 'model', 'fuel' ];
        if (argumentsAreComplete({data, required}))
            return `${base}/${brand}/models/${model}/fuels/${fuel}/cars`
    },
    carsFullData: data => {
        const { typeCode, year } = data;
        const required = [ 'typeCode', 'year' ];
        if (argumentsAreComplete({data, required}))
            return `${base}/${typeCode}/years/${year}`
    },
};

