/**
 * Requests data from the specified API. 
 * @param {string} apiURL - The URL to request data from
 * @param {object} params - An optional
*/

export async function fetchAPI(apiURL, params = {}) {
    const response = await fetch(apiURL, params)
    const jsonData = await response.json()
    const {status, statusText} = response
    return {jsonData, status, statusText}
}
