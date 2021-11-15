import React from 'react'
import {useState, useEffect} from 'react'
import './ReadingList.scss'
/*globals chrome*/

export default function Site() {
    
    const [site, setSite] = useState();
    const [urlList, seturlList] = useState([]);

    useEffect(() => {
        const queryInfo = {active: true, lastFocusedWindow: true};

        chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
            const url = tabs[0].url;
            if (url) {
                const newItem = {
                    url: url
                }
                setSite(newItem);
            }
        });
    }, []);

    function addURL(e) {
        if (urlList.filter(function(v) {return v.url !== site.url}) ) {
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
                    <li> {item.url} </li>
                    </div>
                ))}
            </ul>
        </div>
    );  
};
