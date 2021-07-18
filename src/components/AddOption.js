import React from 'react'

class AddOption extends React.Component{
    state = {
        error: undefined
    }

    add = (e) => {
        e.preventDefault()
        const val = e.target.elements.option.value.trim()
        const error = this.props.handleAddOption(val)
        e.target.elements.option.value = ''
        this.setState(() => ({
            error
        }))
    }
    render() {
        return (
            <div>
                {this.state.error && <p className="add-option-error">{this.state.error}</p>}
                <form className="add-option" onSubmit={this.add}>
                    <input className="add-option__input" type="text" name="option" />
                    <button className="button">Add Option</button>
                </form>    
            </div>
        )
    }
}

export default AddOption