import { withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

const ButtonCustom = withStyles(({color, palette}) => ( {
    root: {
        borderRadius: '100px',
        textTransform: 'uppercase',
        color: palette.getContrastText(color.yellow40),
        backgroundColor: color.yellow40,
        '&:hover': {
            backgroundColor: color.yellow20,
        },
    },
} ))(Button);

export default ButtonCustom;