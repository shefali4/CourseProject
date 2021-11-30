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

        if ( urlList.filter(function(v) {return v.url === site.url}) ) {
            seturlList([...urlList, site]);
            // chrome.storage.local.set(urlList)
        } 
        
        e.preventDefault();
    }

    function del(e) {

        urlList.splice(urlList.findIndex(x => x.id === e.target.value), 1);

        e.preventDefault()
    }

    return (
        <div>
            <form onSubmit={addURL}>
                <button type="submit" className="save-button">+</button>
            </form>
            <div className="ent">
                {urlList && urlList.map((item, id) => (
                    <a className="hyperlink" href={item.url} target="_blank" >
                        <div onClick={item.url} className="entry" key={id}>
                            <div className="prof">
                                <img className="favicon-img" src={item.fav}/>
                                <b className="title"> {item.title} </b>
                                {/* <from onSubmit={del(e)} value={item.url}><button type="submit" className="save-button">-</button> </from> */}
                            </div>
                            <p> {item.url} </p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );  
};
