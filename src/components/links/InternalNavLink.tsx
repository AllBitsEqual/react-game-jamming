import React from 'react'
import { NavLink } from 'react-router-dom'

export type InternalNavLinkProps = {
  to: string
  children: React.ReactNode
  className?: string
}

const InternalNavLink = ({ to, children, className }: InternalNavLinkProps): React.ReactElement =>
    <NavLink exact={to === '/'} className={className} activeClassName="active" to={to}>{children}</NavLink>

export default InternalNavLink
