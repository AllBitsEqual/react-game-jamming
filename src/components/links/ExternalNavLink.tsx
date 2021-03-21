import React from 'react'

export type ExternalNavLinkProps = {
  to: string
  children: React.ReactNode
  className?: string
}

const ExternalNavLink = ({ to, children, className }: ExternalNavLinkProps): React.ReactElement =>
    <a className={className} href={to}>{children}</a>

export default ExternalNavLink
