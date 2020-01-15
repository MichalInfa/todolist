import React from 'react'
import './AddNewTask.css'
import Button from '../../Components/Button/Button'
const AddNewTask = (props) => {

    return (
        <div className = "FormWrapper">
            <form onSubmit = {(event) => event.preventDefault()}>
                <label className = "Box">
                    <input className = "CheckboxPosition" type = "checkbox"/>
                    <span className = "WhiteBox"></span> 
                </label>
                <label className = "BoxDescript">
                    <input className = "TextPosition" type = "text" placeholder = "Describe this to-do..."
                    value = {props.inputText} onChange = {props.onInputChange}/>
                </label>
                <label className = "BoxDescript">
                    <hr className="Line"/>
                    <input className = "TextPosition" type = "text" placeholder = "Details.."
                    value = {props.inputDescription} onChange = {props.onDescriptionChange}/>
                </label> 
                
                <Button
                    disabledProperties = {props.inputText.length < 6}
                    buttonClass = {props.inputText.length > 5 ? "Proper" : "NotProper"}
                    buttonText = {"Add a to-do"}
                    onClickFunction = {props.onClickAddTaskEvent}
                />
                    
                <Button 
                    buttonText = {"Cancel"}
                    buttonClass = {"Button. " + "Cancel"}
                    onClickFunction = {props.onClickCancelButton}
                />
            </form>
        </div>
    )

}

export default AddNewTask