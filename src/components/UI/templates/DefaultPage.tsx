import React from 'react'
import styled from 'styled-components'
import { InternalNavLink } from '../../links'

export type DefaultPageProps = {
    children: React.ReactNode
    backLink?: string
}

const DefaultPage = ({
    backLink,
    children,
}: DefaultPageProps): React.ReactElement => (
    <>
        {backLink && (<InternalNavLink to={backLink}>back</InternalNavLink>)}
        <StyledContainer>
            {children}
        </StyledContainer>
    </>
)

const StyledContainer = styled.div`
    padding: 0 20px;
`

export default DefaultPage
