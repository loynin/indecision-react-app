import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            options : props.options,
            selctedOption: undefined,
        }
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.onActionClick = this.onActionClick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOneOption = this.handleDeleteOneOption.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount(){
        try{
            const data = localStorage.getItem('indecision.data');
            const options = JSON.parse(data);
            if (options){
                this.setState(() => {
                    return {
                        options
                    }
                })
            }
        }catch (e) {

        }
        
    }
    componentDidUpdate(prevProp, prevState) {
        if (prevState.options.length !== this.state.options.length){
            const jsonData = JSON.stringify(this.state.options);
            localStorage.setItem('indecision.data', jsonData);
        }
    }
    // componentWillUnmount() {

    // }


    handleDeleteOptions() {
        this.setState (() => {
            return {
                options: []
            };
        });
    }

    onActionClick() {
        const randNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randNum];
        this.setState(() => {
            return {selectedOption: option}
        })
    }
    closeModal() {
        this.setState(() => {
            return {
                selectedOption: undefined
            }
        })
    }

    handleAddOption (option){
        if (!option){
            return 'Enter valid value to add item';
        } else if ( this.state.options.indexOf(option) > -1){
            return 'This option already exists';

        }
        this.setState((prevState) =>{
            return {
                options: prevState.options.concat(option)
            }
        })
    }

    handleDeleteOneOption(selctedOption){
        this.setState((prevState) =>{
            return {
                options: prevState.options.filter((option) => option !== selctedOption)
            }
        })
    }

    render(){
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';
        return (
            <div>
                <Header title={title} subtitle={subtitle}/>
                <div className="container" >
                    <Action 
                    hasOption={this.state.options.length > 0}
                    onActionClick={this.onActionClick}
                    />
                    <div className="widget">
                        <Options 
                        options = {this.state.options}
                        handleDeleteOptions = {this.handleDeleteOptions}
                        handleDeleteOneOption = {this.handleDeleteOneOption}
                        />
                        <AddOption 
                        handleAddOption = {this.handleAddOption}
                        />
                    </div>
                    <OptionModal 
                        selectedOption={this.state.selectedOption} 
                        closeModal = {this.closeModal}
                    />
                </div>
                
            </div>
        )
    }
}

IndecisionApp.defaultProps = {
    options: []
}
