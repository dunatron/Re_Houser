import React from "react"
import Checkbox from "@material-ui/core/Checkbox/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"

class CheckBoxSelection extends React.Component {
  // constructor(props) {
  //   super(props)

  //   // const selectionOptions = props.options.reduce(
  //   //   (ac, option) => ({ ...ac, [option.id]: option.show }),
  //   //   {}
  //   // )

  //   this.state = {
  //     ...selectionOptions,
  //   }
  // }

  handleChange = name => event => {
    this.props.handleOptionChange({ [name]: event.target.checked })
    // this.setState({ [name]: event.target.checked })
  }

  render() {
    const { options } = this.props
    return (
      <div>
        {options.map((option, idx) => {
          return (
            <FormControlLabel
              key={idx}
              control={
                <Checkbox
                  checked={option.show}
                  onChange={this.handleChange(option.id)}
                  value={option.id}
                  color="primary"
                  // indeterminate
                />
              }
              label={option.label}
            />
          )
        })}
      </div>
    )
  }
}

export default CheckBoxSelection
