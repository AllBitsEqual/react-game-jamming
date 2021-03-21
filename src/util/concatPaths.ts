import removeTrailingSlash from './removeTrailingSlash'
import removeLeadingSlash from './removeLeadingSlash'

export default (...paths: string[]): string => `/${paths
    .map(removeTrailingSlash)
    .map(removeLeadingSlash)
    .filter(path => path.length > 0)
    .join('/')}`
