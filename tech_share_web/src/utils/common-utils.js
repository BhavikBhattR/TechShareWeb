

export const getAccessToken = () => {
    return sessionStorage.getItem('accessToken')
}

export const getType = (value, body) => {
    if(value.params){
        return {params: body};
    }else if(value.query){
        if(typeof body === 'object'){
            const formData = body;
            const id = formData.get('_id');
            console.log(body, 'body sent')
            console.log(body)
            console.log('id in extra fun is ', id)
            return { query: id}
        }else{
            return {query: body}
        }
    }
    return {};
}