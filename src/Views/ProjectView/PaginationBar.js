import React from 'react'
import Button from '../../Components/Button/Button'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';
import {faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons';
import './PaginationBar.css'
import {getPageNumbers} from '../../Utils/PaginationBarFunction.js';


const PaginationBar = ({projectsPerPage, amountOfProjects, amountOfPages, onClickFunction, currentPage}) => {

    const pageNumbers = getPageNumbers(amountOfPages, currentPage);

    const renderPageNumber = (number) => {
            if(number === 0 || number === (amountOfPages + 1))
                return ("")
            return(number)
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
                            className = {`PaginationItem 
                                ${currentPage === number ? "CurrentNumber" 
                                : number === 0 ? "ThreeDotMinus" 
                                : number === (amountOfPages + 1) ? "ThreeDotPlus" : "" } `}
                                
                            //style = {{width: "calc(100% / " + (maxPage + 2) + ")" }}
                            
                            onClick = {(event) => {
                                if(number === 0){
                                    onClickFunction(currentPage - 3)
                                }
                                else{
                                    if(number === (amountOfPages + 1))
                                        onClickFunction(currentPage + 3)
                                    else
                                        onClickFunction(number)
                                }
                                event.preventDefault()
                            }}>
                                {renderPageNumber(number)}                                    
                        </div>
                    )
                 })
            }
                
                <Button 
                    buttonClass = {`PaginationButton 
                                    ${currentPage > (amountOfPages - 1) ? "NotProper" : "Proper"} `}
                    disabledProperties = {currentPage > (amountOfPages - 1) }
                    buttonText = {<FontAwesomeIcon icon = {faArrowAltCircleRight} />}
                    onClickFunction = { (event) => {
                        onClickFunction(currentPage + 1)
                        event.preventDefault()
                    }}
                />
            </div>
            
        )
}

export default PaginationBar