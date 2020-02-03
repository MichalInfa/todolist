import React from 'react'
import Button from '../Button/Button'
//import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';
import {faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons';
import './PaginationBar.css'
import {getPageNumbers} from '../../Utils/PaginationBarFunction.js';
import {useSelector} from 'react-redux'

const PaginationBar = ({onClickFunction, reload}) => {
    
    const currentPage = useSelector(state => state.project[state.project.length - 3]) 
    const amountOfPages = useSelector(state => state.project[state.project.length - 1]) 

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
                disabledProperties = {(currentPage < 2) || (reload === false)}
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
            disabledProperties = {(currentPage > (amountOfPages - 1)) || (reload === false)}
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