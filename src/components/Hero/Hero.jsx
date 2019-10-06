import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import logo from '../../assets/logo.png';

const circleRatio = 1.24;

const useStyles = makeStyles(({size, spacing, font, color}) => ( {
    wrapper: {
        position: 'relative',
        minHeight: `${size.hero.height}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        overflow: 'hidden',
        '&:after': {
            content: '""',
            bottom: 0,
            display: 'block',
            position: 'absolute',
            height: `${circleRatio * 100}vw`,
            width: `${circleRatio * 100}vw`,
            maxWidth: `${circleRatio * size.wrapper.width}px`,
            maxHeight: `${circleRatio * size.wrapper.width}px`,
            borderRadius: '100%',
            background: color.gray40,
            zIndex: -1,
        },
    },
    logo: {
        maxWidth: '131px',
    },
    title: {
        fontFamily: font.redHatDisplay,
        fontWeight: 700,
        fontSize: '1rem',
        textTransform: 'uppercase',
        textAlign: 'center',
        padding: spacing(1),
    },
} ));

const Hero = () => {

    const classes = useStyles();

    return <section className={classes.wrapper}>
        <img src={logo} className={classes.logo} alt='Mfind logo'/>
        <h1 className={classes.title}>
            Oszczędź nawet <br/> 580 złotych na oc
        </h1>
    </section>
};

export default Hero
