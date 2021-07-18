import React from 'react' 
import Action from './Action'
import Header from './Header'
import Options from './Options'
import AddOption from './AddOption'
import ShowOption from './ShowOption'

class IndecisionApp extends React.Component{
    state = {
        options: [],
        open: undefined
    }
    clearModal = () => {
        this.setState(() => ({
            open: undefined
        }))
    }
    handleShow = () => {
        const random = Math.floor(Math.random() * this.state.options.length)
        const option = this.state.options[random]
        this.setState(() => ({
            open: option
        }))
    }
    handleRemove = () => {
        this.setState(() => ({
            options: []
        }))
    }  
    handleRemoveOption = (optionTo) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => option !== optionTo) 
        }))
    }
    handleAddOption = (option) => {
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
                <div className="container">
                     <Action 
                         dis={this.state.options.length > 0}
                         handleShow={this.handleShow} 
                     />
                     <div className="widget">
                        <Options 
                            options={this.state.options}
                            handleRemove={this.handleRemove}
                            handleRemoveOption={this.handleRemoveOption}
                        />
                        <AddOption handleAddOption={this.handleAddOption} />
                     </div>
                </div>
                <ShowOption clearModal={this.clearModal} open={this.state.open} />
            </div>
        )
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
    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options',json)
        }  
    }
    componentWillUnmount() {
        console.log('Component unmount')
    }
  
}

export default IndecisionApp