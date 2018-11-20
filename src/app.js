class IndecisionApp extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            options : props.options
        }
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.onActionClick = this.onActionClick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
    }

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
        console.log(option);
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

    render(){
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';
        return (
            <div>
                <Header title={title} subtitle={subtitle}/>
                <Action 
                hasOption={this.state.options.length > 0}
                onActionClick={this.onActionClick}
                />
                <Options 
                options = {this.state.options}
                handleDeleteOptions = {this.handleDeleteOptions}
                />
                <AddOption 
                handleAddOption = {this.handleAddOption}
                />
            </div>
        )
    }
}

IndecisionApp.defaultProps = {
    options: []
}

const Header = (props) => {
        return (
            <div>
                <h1>{props.title}</h1>
                {props.subtitle && <h2>{props.subtitle}</h2>}

            </div>
        )
    }

Header.defaultProps = {
    title: 'Indecision'
}

const Action = (props) => {
        return (
            <div>
                <button 
                onClick={props.onActionClick}
                disabled={!props.hasOption}
                >
                What should I do
                </button>
            </div>
        );
    }

    
const Options = (props) => {
        return (
            <div>
                <button onClick={props.handleDeleteOptions}>Remove All</button>
                {props.options.map((option) =>{
                    return <Option key={option} optionText={option} />
                })}
                
                
            </div>
        );
    }

const Option = (props) => {
        return (
            <div>
                <p>{props.optionText}</p>
            </div>
        );
}

class AddOption extends React.Component{
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
        e.target.txtOptionText.value = '';

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


ReactDOM.render(<IndecisionApp/>, document.getElementById('app'));