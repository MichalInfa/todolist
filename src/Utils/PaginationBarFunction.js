function getPageNumbers(amountOfPages, currentPage){
        const pageNumbers = [];
        if(amountOfPages > 6){
            if(currentPage <= 3){
                for(let i = 1; i <= 5; i++){
                    pageNumbers.push(i);
                }
                pageNumbers.push(amountOfPages + 1)
                pageNumbers.push(amountOfPages)
            }
            else {
                if(currentPage > (amountOfPages - 4)){
                    pageNumbers.push(1); // zawsze dodanie pierwszego elementu
                    pageNumbers.push(0)
                    for(let i = amountOfPages - 4; i <= amountOfPages; i++){
                        pageNumbers.push(i);
                    }
                }
                else{
                    pageNumbers.push(1); // zawsze dodanie pierwszego elementu
                    pageNumbers.push(0)
                    for(let i = currentPage - 1; i <= currentPage + 1; i++){
                        pageNumbers.push(i)
                    }
                    pageNumbers.push(amountOfPages + 1)
                    pageNumbers.push(amountOfPages)
                }
            }
        }
        else {
            for(let i = 1; i <= amountOfPages; i++){
                pageNumbers.push(i);
            }
        }
        return pageNumbers;
    }

export {getPageNumbers};
