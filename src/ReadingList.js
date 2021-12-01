import React from 'react'
import {useState, useEffect} from 'react'
import './ReadingList.scss'
/*globals chrome*/

export default function Site() {
    
    const [myLeads, setMyLeads] = useState([])
    const [site, setSite] = useState();

    const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

    // Gets previously stored links and renders it
    window.addEventListener("load", function (){
        console.log("leadfromloc ", leadsFromLocalStorage)
        if (leadsFromLocalStorage) {
            setMyLeads(leadsFromLocalStorage)
        }
    })

    useEffect(() => {
        const queryInfo = {active: true, lastFocusedWindow: true};

        chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
            const url = tabs[0].url;
            const title = tabs[0].title;
            const fav="http://www.google.com/s2/favicons?domain="+url;
            if (url) {
                const newItem = {
                    url: url,
                    title: title,
                    fav: fav
                }
                setSite(newItem);
            }
        });
    }, []);

    // Adds URL to list
    function addURL(e) {    
        setMyLeads([...myLeads, site] , console.log(myLeads))
        // console.log("currleads ", myLeads)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        e.preventDefault();
    }

    // Deletes all URLs in list
    function deleteAllURL() {
        localStorage.clear()
        setMyLeads([])
    }
    
    // Render function
    // function render(leads) {
    //     let listItems = ""
    //     for (let i = 0; i < leads.length; i++) {
    //         listItems += `
    //         <div className="ent">
    //             <a className="hyperlink" target='_blank' href='${leads[i].url}'>
    //                 <div className="entry">
    //                     <div className="prof">
    //                         <b className="title"> ${leads[i].title} </b>
    //                     </div>
    //                     <p> ${leads[i].url} </p>
    //                 </div>
    //             </a>
    //             <button type="button" class="btn-close float-end" aria-label="Close">X</button>
    //         </div>
    //         `
    //     }
    //     document.getElementById("ul-el").innerHTML = listItems   
    // }

    return (
        <div>
            <button onClick={addURL} className="save-button" type="submit" >+</button>
            <button onClick={deleteAllURL} id="delete-btn" type="button" >DELETE ALL</button>
            <div className="ent">
                {myLeads && myLeads.map((item, id) => (
                    <a className="hyperlink" target='_blank' href={item.url}>
                        <div onClick={item.url} className="entry" key={id}>
                            <div className="prof">
                                <img className="favicon-img" src={item.fav}/>
                                <b className="title"> {item.title} </b>
                            </div>
                            {/* <p> {item.url} </p> */}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
