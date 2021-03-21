const whitelabelTheme = Object.freeze({
    font: {
        title: {
            fontFamily: 'Arial',
            fontSize: '28px',
            lineHeight: '28px',
        },
        default: {
            fontFamily: 'Arial',
            fontSize: '16px',
            lineHeight: '1.4'
        },
        medium: {
            fontSize: '20px',
            lineHeight: '1.5'
        },
    },
    spacer: {
        xs: 10,
        s: 15,
        m: 25,
        l: 50,
        side: 100
    },
    button: {
        width: 56,
        height: 32,
        large: {
            height: 38
        },
        small: {
            width: 24,
            height: 24
        }
    },
    logo: {
        filename: 'logo-whitelabel.png',
        width: 418,
        height: 80
    },
    palette: {
        common: {
            black: '#222831',
            fontDefault: '#333333',
            dark: '#333333',
            white: '#ffffff',
        },
        interactive: {
            softBackground: '#fcfdfc',
            background: '#f2f4f3',
            border: '#ddd',
            active: '#e8e9eb',
            focus: '#f89406'
        },
        signal: {
            red: '#cc0033',
            green: '#03a525'
        },
        primary: {
        },
        secondary: {
        },
    },
})

export type ThemeType = typeof whitelabelTheme
export default whitelabelTheme
