// @flow

function loadScript(source: string): Promise<any> {
    const bodyTag = document.getElementsByTagName('body')[0];
    const scriptTag = document.createElement('script');

    scriptTag.src = source;

    bodyTag.appendChild(scriptTag);

    return new Promise((resolve, reject) => {
        scriptTag.onload = resolve;
    });
}

function loadStyle(source: string): Promise<any> {
    const headTag = document.getElementsByTagName('head')[0];

    const styleTag = document.createElement('link');
    
    styleTag.setAttribute('rel', 'stylesheet');
    
    styleTag.href = source;

    headTag.appendChild(styleTag);

    return new Promise((resolve, reject) => {
        styleTag.onload = resolve;
    });
}

export function load(): Promise<any> {
    return new Promise((resolve, reject) => {
         document.addEventListener('DOMContentLoaded', () => {
             Promise.all([
                loadStyle('https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.8.0/css/flag-icon.css'),
                loadStyle('/dist/app.css'),
            ]).then(resolve);
         });
    });
}