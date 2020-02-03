function getFetchData(url){
   fetch(url)
    .then(resp => {
        if(resp.status !== 200){
            return null;
        }else{
            console.log(resp)
            return resp.json();
        }})  
    .then(resp => {
        return (resp.meta.total_count)
    })
    .catch(error => {
        return alert("Failed GET request from ListCard. \nDetailed error: \"" + error + "\"");
        });
}

export {getFetchData}