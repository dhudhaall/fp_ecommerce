
const ShareDataService=()=> {

return window.addEventListener('message', (event:any) => {
    if (event['data'] === 'getLocalStorageValue') {
      const value = localStorage.getItem('yourKey');
      // Send the value back to the requesting domain
      event.source.postMessage(value, event.origin);
    }
  })

}

export default ShareDataService