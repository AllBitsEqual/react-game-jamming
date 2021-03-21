import {} from 'styled-components'
import { ThemeType } from './index'

declare module 'styled-components' {
    export type DefaultTheme = ThemeType
}
