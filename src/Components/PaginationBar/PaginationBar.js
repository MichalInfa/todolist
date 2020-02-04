import React from 'react'
import Button from '../Button/Button'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';
import {faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons';
import './PaginationBar.css'
import {getPageNumbers} from '../../Utils/PaginationBarFunction.js';
import {useSelector} from 'react-redux'

const PaginationBar = ({onClickFunction, position}) => {
    
    const projects = useSelector(state => state.project)
    const todolists = useSelector(state => state.todolist)

    let currentPage = 0;
    let amountOfPages = 0;

    if(position === "ProjectView" && projects && projects.projects && projects.meta)
    {
        currentPage = projects.meta.current_page
        amountOfPages = projects.meta.total_pages
    }

    if(position === "ProjectDetails" && todolists && todolists.lists && todolists.meta && position === "ProjectDetails")
    {
        currentPage = todolists.meta.current_page
        amountOfPages = todolists.meta.total_pages
    }

    const pageNumbers = getPageNumbers(amountOfPages, currentPage);

    const renderPageNumber = (number) => {
            if(number === 0 || number === (amountOfPages + 1))
                return ("")
            return(number)
    }
    return (
        <div className = "PaginationBar">
             <Button 
                buttonClass = {`PaginationButton ${currentPage < 2 ? "PaginNotProper" : "PaginProper"} `}
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
                        ${currentPage > (amountOfPages - 1) ? "PaginNotProper" : "PaginProper"} `}
            disabledProperties = {(currentPage > (amountOfPages - 1))}
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