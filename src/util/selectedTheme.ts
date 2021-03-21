// eslint-disable @typescript-eslint/no-unused-vars
import { whitelabelTheme, ThemeType } from '../themes'

const currentTheme = "whitelabel" // temp. until we implement more themes
const themes = {
    whitelabel: whitelabelTheme,
} as { [key: string]: ThemeType }

const selectedTheme = themes[currentTheme]
export default selectedTheme
