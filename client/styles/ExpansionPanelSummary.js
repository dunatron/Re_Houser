import styled from "styled-components"
import ExpansionPanelSummaryComponent from "@material-ui/core/ExpansionPanelSummary"

const ExpansionPanelSummary = styled(ExpansionPanelSummaryComponent)`

  && {
    align-items: center;
    /* margin: ${props => props.theme.spacing.unit * 3}px 0 0 0; */
    border: ${props => props.border};
    /* background: ${props => {
      if (props.highlight === true) {
        return "lightgreen"
      }
    }}; */
    background: ${props => {
      if (props.highlightReverse === true) {
        return props.theme.palette.primary.main
      }
      if (props.highlight === true) {
        return props.theme.palette.secondary.main
      }
    }};
    /* color: ${props => {
      if (props.highlight === true) {
        return props.theme.palette.secondary.light
      }
    }}; */
  }
`

export default ExpansionPanelSummary
