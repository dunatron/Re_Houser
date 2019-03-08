import styled, { keyframes } from "styled-components"

const DropZone = styled.div`
  /* border: ${p => `1px dashed ${p.theme.palette.primary.main}`}; */
  border: ${p =>
    p.dragging
      ? `3px dashed ${p.theme.palette.secondary.main}`
      : `1px dashed ${p.theme.palette.primary.main}`};
  height: ${p => p.theme.spacing.unit * 30 * 1.618}px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  box-sizing: border-box;
  background: ${p => (p.dragging ? `${p.theme.palette.primary.light}` : ``)};
  margin: ${p => p.theme.spacing.unit}px;
  transition: all ease 0.5s;
  ${props => {
    const { disabled, theme } = props
    if (disabled) {
      return `background: ${theme.palette.secondary.light};`
    }
  }}
  svg {
    height: 5em;
    width: 5em;
  }
`

const HiddenInput = styled.input`
  display: none;
`

const InputLabel = styled.label``

const ProgressBar = styled.div`
  margin: 20px;
`

export { DropZone, HiddenInput, InputLabel, ProgressBar }
