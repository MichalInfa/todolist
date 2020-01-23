import React from 'react'
import './AddNewTask.css'
import Button from '../../Components/Button/Button'

const AddNewTask = (props) => {
    return (
        <div className = "FormWrapper">
            <form onSubmit = {(event) => event.preventDefault()}>
                <div className = "TopFormContainter">
                    <label className = "Box">
                        <input className = "CheckboxPosition" type = "checkbox" 
                        checked = {props.inputDoneStatus} onChange = {props.onDoneStatusChange}/>
                        <span className = "WhiteBox"></span> 
                    </label>
                    <div className = "MiddleText">
                        <label>
                            <input className = "TextPosition" type = "text" placeholder = "Describe this to-do..."
                            value = {props.inputText} onChange = {props.onInputChange}/>
                        </label>
                    </div>
                </div>

                <hr className="Line"/>
                <div className = "FormContainer">
                    <div className = "FormText">
                        Due on
                    </div>
                    <div className = "FormTextLine">
                        <label>          
                            <input className = "TextPosition" type = "text" placeholder = "Select a date..."
                            value = {props.dateText} onChange = {props.onDateChange}/>
                        </label> 
                    </div>
                </div>

                <hr className="Line"/>
                <div className = "FormContainer">
                    <div className = "FormText">
                        Notes
                    </div>
                    <div className = "FormTextLine">
                        <label>          
                            <input className = "TextPosition" type = "text" placeholder = "Add extra details.."
                            value = {props.inputDescription} onChange = {props.onDescriptionChange}/>
                        </label> 
                    </div>
                </div>

                <div className = "ButtonAddFormPosition">
                <Button
                    disabledProperties = {props.inputText.length < 6}
                    buttonClass = {props.inputText.length > 5 ? "Proper" : "NotProper"}
                    buttonText = {"Add this to-do"}
                    onClickFunction = {props.onClickAddTaskEvent}
                />
                </div> 
                <div className = "ButtonCancelFormPosition">
                <Button 
                    buttonText = {"Cancel"}
                    buttonClass = {"Button. Cancel"}
                    onClickFunction = {props.onClickCancelButton}
                />
                </div>
            </form>
        </div>
    )

}

export default AddNewTask