import styled from "styled-components"
import TypographyComponent from "@material-ui/core/Typography"

const Typography = styled(TypographyComponent)`

  && {
    /* margin: ${props => props.theme.spacing.unit * 3}px 0 0 0; */
    color: ${props => {
      if (props.highlightReverse === true) {
        return props.theme.palette.primary.contrastText
      }
      if (props.highlight === true) {
        return props.theme.palette.secondary.contrastText
      }
    }};
  }
`

export default Typography
