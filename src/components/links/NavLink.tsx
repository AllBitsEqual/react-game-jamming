import React from 'react'
import { InternalNavLink, ExternalNavLink } from './index'

export type NavigationLinkProps = {
  to: string
  children: React.ReactNode
  className?: string
}

// if a link starts with an optional protocol followed by double slash
// or is empty
// then we consider it external
const isExternal = (to: string): boolean => !!(to.length === 0 || to.match(/^(.+:)?\/\//))

const NavigationLink = ({ to, children, className }: NavigationLinkProps): React.ReactElement => isExternal(to)
    ? <ExternalNavLink className={className} to={to}>{children}</ExternalNavLink>
    : <InternalNavLink className={className} to={to}>{children}</InternalNavLink>

export default NavigationLink
