let id = 1

export default function getJSONP(url) {
    return new Promise((resolve, reject) => {
        if (url.indexOf('?') === -1) {
            url += `?callback=jsonpcb${id}`;
        } else {
            url += `&callback=jsonpcb${id}`;
        }
    
        var script = document.createElement('script');
        script.onerror = (err) => {
            delete window[cbFnName]
            script.parentNode.removeChild(script);
            reject(err)
        }
        
        const cbFnName = `jsonpcb${id}`
        window[cbFnName] = resp => {
            delete window[cbFnName];
            script.parentNode.removeChild(script);
            resolve(resp);
        }

        script.setAttribute('src', url)
        document.body.appendChild(script);
        id++;
    })
}
