import styled from "styled-components"
import Card from "@material-ui/core/Card"

const PropertyCard = styled(Card)`
  && {
    width: 100%;
    margin: 8px;
    @media (min-width: 480px) {
      width: 480px;

      /* width: 380; */
    }
    @media (min-width: ${props => props.theme.breakpoints.values.md}px) {
      /* width: 380; */
    }
  }
`

export default PropertyCard
