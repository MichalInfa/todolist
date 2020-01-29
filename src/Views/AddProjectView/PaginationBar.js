import React from 'react'
import Button from '../../Components/Button/Button'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';
import {faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons';
import './PaginationBar.css'

const PaginationBar = ({projectsPerPage, amountOfProjects, onClickFunction, currentPage}) => {

    const maxPage = Math.ceil(amountOfProjects / projectsPerPage);
    const pageNumbers = [];
        for(let i = 1; i <= maxPage; i++){
            pageNumbers.push(i);
        }
        return (
            <div className = "PaginationBar">
                 <Button 
                    buttonClass = {`PaginationButton ${currentPage < 2 ? "NotProper" : "Proper"} `}
                    disabledProperties = {currentPage < 2}
                    buttonText = {<FontAwesomeIcon icon = {faArrowAltCircleLeft} />}
                    onClickFunction = { (event) => {
                        onClickFunction(currentPage - 1)
                        event.preventDefault()
                    }}
                />
            {
                pageNumbers.map (number => {
                    return (
                        <div 
                            key = {number} 
                            className = {`PaginationItem ${currentPage === number ? "CurrentNumber" : "" } `}
                            /*style = {{width: "calc(100% / " + (maxPage + 2) + ")" }}
                            
                            */
                            onClick = {(event) => {
                                onClickFunction(number)
                                event.preventDefault()
                            }}>{number}</div>
                    )
                 })
            }
                
                <Button 
                    buttonClass = {`PaginationButton 
                                    ${currentPage > (maxPage - 1) ? "NotProper" : "Proper"} `}
                    disabledProperties = {currentPage > (maxPage - 1) }
                    buttonText = {<FontAwesomeIcon icon = {faArrowAltCircleRight} />}
                    onClickFunction = { (event) => {
                        onClickFunction(currentPage + 1)
                        event.preventDefault()
                    }}
                />

                {/*<div className ="ArrowLeft">
                    <Button 
                        buttonClass = {`PaginationButton ${currentPage < 2 ? "NotProper" : "Proper"} `}
                        disabledProperties = {currentPage < 2}
                        buttonText = {<FontAwesomeIcon icon = {faArrowAltCircleLeft} />}
                        onClickFunction = { (event) => {
                            onClickFunction(currentPage - 1)
                            event.preventDefault()
                            }
                        }
                    />
                </div>
                <div className = "ArrowRight">
                    <Button 
                        buttonClass = {`PaginationButton 
                            ${currentPage > (maxPage - 1) ? "NotProper" : "Proper"} `}
                        disabledProperties = {currentPage > (maxPage - 1) }
                        buttonText = {<FontAwesomeIcon icon = {faArrowAltCircleRight} />}
                        onClickFunction = { (event) => {
                            onClickFunction(currentPage + 1)
                            event.preventDefault()
                            }
                        }
                    />
                    </div>*/}
            </div>
            
        )
}

export default PaginationBar