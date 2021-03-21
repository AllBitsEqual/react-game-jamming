import { ThemeType as ImportedThemeType } from './whitelabel'

export { default as whitelabelTheme } from './whitelabel'

// I have not found a better way to reexport types
export type ThemeType = ImportedThemeType
