import React from 'react'
import {useState, useEffect} from 'react'
import './ReadingList.scss'
/*globals chrome*/

export default function Site() {
    
    const [site, setSite] = useState();
    const [urlList, seturlList] = useState([]);
    const [urlTitle, seturlTitle] = useState([]);

    useEffect(() => {
        const queryInfo = {active: true, lastFocusedWindow: true};

        chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
            const url = tabs[0].url;
            const title = tabs[0].title;
            if (url) {
                const newItem = {
                    url: url,
                    title: title
                }
                setSite(newItem);
            }
        });
    }, []);

    function addURL(e) {
        if (urlList.filter(function(v) {return v.url !== site.url})) {
            seturlTitle([...urlTitle, site]);
            seturlList([...urlList, site]);
        }
        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit={addURL}>
                <button type="submit" className="save-button">+</button>
            </form>
            <ul>
                {urlList && urlList.map((item,id) => (
                    <div key={id}>
                        <li>{item.title} {item.url}</li>
                    </div>
                ))}
            </ul>
        </div>
    );  
};
