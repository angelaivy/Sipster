  // https://www.thecocktaildb.com/api.php
  // Docs allows 1 for development.
  const apiKey = '1',
        baseUrl = `https://www.thecocktaildb.com/api/json/v1/${apiKey}/`;
 
  const doApiRequest = async (pathWithQuery = '') => {
    let endpoint = '';
    (baseUrl && pathWithQuery) ? endpoint = `${baseUrl}${pathWithQuery}` : endpoint = '';
    try {
      let response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`API call failed. Status: ${response.status}`)
      }
     
      return response.json();
  
    } catch(e) {
      console.error(e)
      return e;
    }
  }

export {doApiRequest }