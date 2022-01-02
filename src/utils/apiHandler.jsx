export default async function getApiResponse(url, method, headers, body){
    let response = await fetch(url, {
            method: method,
            headeres: headers,
            body: body,
        })
    let responseData = await response.json()
    return responseData
}