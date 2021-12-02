import React from 'react'
import {useState, useEffect} from 'react'
import './ReadingList.scss'
/*globals chrome*/

export default function Site() {
    
    const [myLeads, setMyLeads] = useState([])
    // const [site, setSite] = useState()

    window.addEventListener("load", function () {
        setMyLeads(JSON.parse(localStorage.getItem('myLeads')) || [])
    })

    useEffect(() => {
        window.localStorage.setItem("myLeads", JSON.stringify(myLeads))

    }, [myLeads]);

    // Adds URL to list
    function addURL(e) { 
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const newItem = {
                shorturl: shortenURL(tabs[0].url),
                url: tabs[0].url,
                title: tabs[0].title,
                fav: "http://www.google.com/s2/favicons?domain="+tabs[0].url,
            }
            
            if (!(myLeads.map(a => a.url)).includes(newItem.url)){
                setMyLeads([...myLeads, newItem])
            }
        })
        e.preventDefault();
    }

    // Deletes all URLs in list
    function deleteAllURL() {
        localStorage.clear()
        setMyLeads([])
    }

    function deleteSingle(e) {
        setMyLeads(myLeads.filter(function(v) { 
            return v.url !== e.target.value })
        )
        
    }

    function shortenURL(url) {
        return (new URL(url)).hostname;
    }

    return (
        <div>
            <button onClick={addURL} className="save-button" type="submit" >+</button>
            <button onClick={deleteAllURL} id="delete-btn" type="button" >DELETE ALL</button>
            <div className="ent">
                {myLeads && myLeads.map((item, id) => (
                    <div className="withb">
                        <a className="hyperlink" target='_blank' href={item.url}>
                            <div onClick={item.url} className="entry" key={id}>
                                <div className="prof">
                                    <img className="favicon-img" src={item.fav}/>
                                    <div className="ti">
                                        <b className="title"> {item.title} </b>
                                        <p> {item.shorturl} </p>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <button value={item.url} onClick={deleteSingle} type="button" className="but" aria-label="Close">X</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
