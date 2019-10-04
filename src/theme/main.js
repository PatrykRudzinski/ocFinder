import { createMuiTheme } from '@material-ui/core/styles';
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
        gray20: '#F8F8F8',
        gray40: '#F5F5F5',
        gray60: '#EDEDED',
        yellow20: '#FBE59D',
        yellow40: '#F8CC38',
    },
    typography: {
        fontSize: 15,
      },
    font: (() => {
        const result = {};
        Object.entries(fonts).forEach(([key, val]) => {
           result[key] = `${val.name}, ${val.fallback}`
        });
        return result;
    })(),
})