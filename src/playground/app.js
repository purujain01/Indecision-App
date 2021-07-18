class IndecisionApp extends React.Component{
    constructor(props) {
        super(props)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.handleRemoveOption = this.handleRemoveOption.bind(this)
        this.state = {
            options: []
        }
    }
    componentDidMount() {
        try{
            const options = JSON.parse(localStorage.getItem('options'))
            if(options){
                this.setState(() => ({ options }))
            }
        } catch(e){
        }
    }
    componentDidUpdate(prevState, prevProps) {
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options',json)
        }
    }
    componentWillUnmount() {
        console.log('Component unmount')
    }
    handleShow() {
        const random = Math.floor(Math.random() * this.state.options.length)
        alert(this.state.options[random])
    }
    handleRemove() {
        this.setState(() => ({
            options: []
        }))
    }  
    handleRemoveOption(optionTo) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => option !== optionTo) 
        }))
    }
    handleAddOption(option) {
        if(!option){
            return 'Enter the value'
        }
        else if(this.state.options.indexOf(option)>-1){
            return 'Value is already added'
        }
        this.setState((prevState) => ({
            options: prevState.options.concat(option)
        }))
    }
    render() {
        const subtitle = 'This is first time'
        return (
            <div>
                <Header subtitle={subtitle} />
                <Action 
                   dis={this.state.options.length > 0}
                   handleShow={this.handleShow} 
                />
                <Options 
                options={this.state.options}
                handleRemove={this.handleRemove}
                handleRemoveOption={this.handleRemoveOption}
                />
                <AddOption handleAddOption={this.handleAddOption} />
            </div>
        )
    }
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
    title: 'Indecision App'
}

const Action = (props) => {
    return (
        <div>
            <button 
            onClick={props.handleShow}
            disabled={!props.dis}
            >
                 Click here!
            </button>
        </div>
    )
}

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleRemove}>Remove All</button>
            {props.options.length === 0 && <p>Enter the value</p>}
            {
                props.options.map((option) => 
                <Option 
                key={option} 
                text={option}
                handleRemoveOption={props.handleRemoveOption} 
                />
                )
            }
        </div>
    )
}

const Option = (props) => {
    return (
        <div>
           {props.text}
           <button onClick={(e) => {
               props.handleRemoveOption(props.text)
            }}
            >
            remove
            </button>
        </div>
    )
}

class AddOption extends React.Component{
    constructor(props) {
        super(props)
        this.add=this.add.bind(this)
        this.state={
            error: undefined
        }
    }
    add(e){
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
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.add}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>    
            </div>
        )
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('ps'))