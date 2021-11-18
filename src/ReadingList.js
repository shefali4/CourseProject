import React from 'react'
import {useState, useEffect} from 'react'
import './ReadingList.scss'
/*globals chrome*/

export default function Site() {
    
    const [site, setSite] = useState();
    const [urlList, seturlList] = useState([]);
    const [urlTitle, seturlTitle] = useState([]);
    const [urlIcon, seturlIcon] = useState([]);

    useEffect(() => {
        const queryInfo = {active: true, lastFocusedWindow: true};

        chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
            const url = tabs[0].url;
            console.log(url)
            const title = tabs[0].title;
            const fav="http://www.google.com/s2/favicons?domain="+url;
            if (url) {
                const newItem = {
                    url: url,
                    title: title,
                    fav: fav
                }
                setSite(newItem);
                console.log(newItem.fav);
            }
        });
    }, []);

    function addURL(e) {
        if (urlList.filter(function(v) {return v.url !== site.url})) {
            seturlTitle([...urlTitle, site]);
            seturlList([...urlList, site]);
            seturlIcon([...urlIcon, site]);
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
                    <a className="hyperlink" href={item.url} target="_blank" >
                        <div onClick={item.url} className="entry" key={id}>
                            <img className="favicon-img" src={item.fav}/>
                            <b className="entry-text">{item.title} </b>
                            <p className="entry-text">{item.url}</p>
                        </div>
                    </a>
                ))}
            </ul>
        </div>
    );  
};
