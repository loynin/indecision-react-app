console.log('App.js is running');

const app = {
    title: 'Indecision App',
    subtitle: 'Put your life in the hands of a computer',
    options: []
}

const onFormSubmit = (e) => {
    e.preventDefault();
    const option = e.target.elements.option.value;
    if (option){
        app.options.push(option);
        e.target.elements.option.value = '';
        renderApp();
    }
}

const removeAllOptions = () => {
    app.options = [];
    renderApp();
}

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    const option = app.options[randomNum];
    console.log(option);
}

let appRoot = document.getElementById('app');

const renderApp = () => {
    let template = (
        <div>
            <h2>{app.title}</h2>
            {app.subtitle && <p>{app.subtitle}</p>}
            {(app.options && app.options.length > 0) ? <p>Here are your options</p> : <p>No option</p>}
            <p>{app.options.length}</p>
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
            {app.options.length > 0 && <button onClick={removeAllOptions}>Remove All</button>}
            <ol>
            {
                app.options.map((option) =>  <li key={option}>{option}</li>)
            }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"/>
                <button>Add Option</button>
            </form>
        </div>
    );
    ReactDOM.render(template, appRoot);
}

renderApp();