export const fetcher = async ({url, method, body, json=true}) => {
    const res = await fetch(url, {
        method,
        // body: body && JSON.stringify(body)
        ...(body && {body: JSON.stringify(body)}), //add body field and set it to "body" IF body is true / else do not add the field 
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })

    if( ! res.ok ){
        //handle errors
        throw new Error('API error');
    } 

    if(json){
        const data = await res.json();
        return data.data;
    }

}

export const register = async (user) => {
    return fetcher({url: "/api/register", method: "post", body: user})
}

export const signin = async (user) => {
    return fetcher({url: "/api/signin", method: "post", body: user})
}

export const createNewHabit = async (name) => {
    return fetcher({
        url: '/api/habit',
        method: 'POST',
        body: {name},
        json: true
    })
}