class IndecisionApp extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            options : props.options
        }
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.onActionClick = this.onActionClick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOneOption = this.handleDeleteOneOption.bind(this);
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
                <Action 
                hasOption={this.state.options.length > 0}
                onActionClick={this.onActionClick}
                />
                <Options 
                options = {this.state.options}
                handleDeleteOptions = {this.handleDeleteOptions}
                handleDeleteOneOption = {this.handleDeleteOneOption}
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
                {props.options.length === 0 && <p>Please add an option</p>}
                {props.options.map((option) => (
                    <Option 
                        key={option} 
                        optionText={option}
                        handleDeleteOneOption={props.handleDeleteOneOption}
                        />
                    )
                )}
                
                
            </div>
        );
    }

const Option = (props) => {
        return (
            <div>
                {props.optionText}
                <button 
                    onClick = { (e) => {
                        props.handleDeleteOneOption(props.optionText);
                    }}
                >
                    remove
                </button>
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


ReactDOM.render(<IndecisionApp/>, document.getElementById('app'));