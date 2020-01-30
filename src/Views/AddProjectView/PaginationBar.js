import React from 'react'
import Button from '../../Components/Button/Button'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';
import {faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons';
import './PaginationBar.css'

const PaginationBar = ({projectsPerPage, amountOfProjects, onClickFunction, currentPage}) => {

    const maxPage = Math.ceil(amountOfProjects / projectsPerPage);
    const pageNumbers = [];

    if(maxPage > 6){
        if(currentPage <= 3){
            for(let i = 1; i <= 5; i++){
                pageNumbers.push(i);
            }
            pageNumbers.push(maxPage + 1)
            pageNumbers.push(maxPage)
        }
        else {
            if(currentPage > (maxPage - 4)){
                pageNumbers.push(1); // zawsze dodanie pierwszego elementu
                pageNumbers.push(0)
                for(let i = maxPage - 4; i <= maxPage; i++){
                    pageNumbers.push(i);
                }
            }
            else{
                pageNumbers.push(1); // zawsze dodanie pierwszego elementu
                pageNumbers.push(0)
                for(let i = currentPage - 1; i <= currentPage + 1; i++){
                    pageNumbers.push(i)
                }
                pageNumbers.push(maxPage + 1)
                pageNumbers.push(maxPage)
            }
        }
    }
    else {
        for(let i = 1; i <= maxPage; i++){
            pageNumbers.push(i);
        }
    }

    const render = (number) => {
            if(number === 0 || number === (maxPage + 1))
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
                                : number === (maxPage + 1) ? "ThreeDotPlus" : "" } `}
                                
                            //style = {{width: "calc(100% / " + (maxPage + 2) + ")" }}
                            
                            onClick = {(event) => {
                                if(number === 0){
                                    onClickFunction(currentPage - 3)
                                }
                                else{
                                    if(number === (maxPage + 1))
                                        onClickFunction(currentPage + 3)
                                    else
                                        onClickFunction(number)
                                }
                                event.preventDefault()
                            }}>
                                {render(number)}                                    
                        </div>
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
            </div>
            
        )
}

export default PaginationBar