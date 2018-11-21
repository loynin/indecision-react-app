import React from 'react';

export default class AddOption extends React.Component{
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }

    handleAddOption(e){
        e.preventDefault();
        const strInput = e.target.txtOptionText.value.trim();
        const error = this.props.handleAddOption(strInput);
        this.setState(() =>{
            return {
                error
            }
        })
        if (!error){
            e.target.txtOptionText.value = '';
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p className="add-option-error">{this.state.error}</p>}
                <form className="add-option" onSubmit={this.handleAddOption}>
                    <input className="add-option__input" type="text" name="txtOptionText" autoFocus/>
                    <button className="button">Add Option</button>
                </form>
            </div>
        );
    }
}
