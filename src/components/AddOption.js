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
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="txtOptionText" autoFocus/>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}
