import {createMuiTheme} from '@material-ui/core/styles';
import fonts from "../constants/fonts";

export default createMuiTheme({
    size: {
        wrapper: {
            width: 480,
        },
        hero: {
            height: 210,
        }
    },
    spacing: level => `${level}rem`,
    color: {
        gray20: '#f8f8f8',
        gray40: '#f5f5f5',
        gray60: '#ededed',
        yellow20: '#fbe59d',
        yellow40: '#f8cc38',
    },
    palette: {
        primary: {
            main: '#0C2C47',
        },
    },
    typography: {
        fontSize: 15,
    },
    font: ( () => {
        const result = {};
        Object.entries(fonts).forEach(([key, val]) => {
            result[ key ] = `${val.name}, ${val.fallback}`
        });
        return result;
    } )(),
})
