export function getCommentsList(url){
    const respond = fetch(url)
        .then(response => {
            return response.json(url)
        })
        .catch(error => {
            return alert("Failed GET request for Comments. \nDetailed error: \"" + error + "\"");
        });
    return respond;
}

export function deleteCommentFromList(url = '', listElement = {}){
     fetch(url, {
         method: "DELETE",
         headers: {
             "Content-type": "application/json; charset=UTF-8"
         },
         body: JSON.stringify(listElement)
     })
     .catch(error => {
         return alert("Failed DELETE request for Comments. \nDetailed error: \"" + error + "\"");
     }); 
 }