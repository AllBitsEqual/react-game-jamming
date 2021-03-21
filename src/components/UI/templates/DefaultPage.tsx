import React from 'react'
import styled from 'styled-components'

export type DefaultPageProps = {
    children: React.ReactNode
}

const DefaultPage = ({ children }: DefaultPageProps): React.ReactElement => (
    <>
        <StyledContainer>
            {children}
        </StyledContainer>
    </>
)

const StyledContainer = styled.div`
    padding: 0 ${props => props.theme.spacer.side}px;
`

export default DefaultPage
