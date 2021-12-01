import React from 'react'
import {useState, useEffect} from 'react'
import './ReadingList.scss'
/*globals chrome*/

export default function Site() {
  
    let myLeads = []
    const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

    // Gets previously stored links and renders it
    window.addEventListener("load", function (){
        if (leadsFromLocalStorage) {
            myLeads = leadsFromLocalStorage
            render(myLeads)
        }
    })

    //TO DO: find document summary/most frequent words, description, extracting important content from pages bookmarked



    useEffect(() => {
        const queryInfo = {active: true, lastFocusedWindow: true};
    });

        // Adds URL to list
    function addURL(){    
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            const newItem = {
                url: tabs[0].url,
                title: tabs[0].title,
                fav: "http://www.google.com/s2/favicons?domain="+tabs[0].url,
            }
            myLeads.push(newItem)
            localStorage.setItem("myLeads", JSON.stringify(myLeads) )
            render(myLeads)
        })
    }

    // Deletes all URLs in list
    function deleteAllURL() {
        localStorage.clear()
        myLeads = []
        render(myLeads)
    }
    
    // Render function
    function render(leads) {
        let listItems = ""
        for (let i = 0; i < leads.length; i++) {
            listItems += `
            <div className="ent">
                <a className="hyperlink" target='_blank' href='${leads[i].url}'>
                    <div className="entry">
                        <div className="prof">
                            <b className="title"> ${leads[i].title} </b>
                        </div>
                        <p> ${leads[i].url} </p>
                    </div>
                </a>
                <button type="button" class="btn-close float-end" aria-label="Close">X</button>
            </div>
            `
        }
        document.getElementById("ul-el").innerHTML = listItems   
    }

    return (
        <div>
            <button onClick={addURL} className="save-button" type="submit" >+</button>
            <button onClick={deleteAllURL} id="delete-btn" type="button" >DELETE ALL</button>
            <ul id="ul-el" class="list-group"></ul>
        </div>
    );
}
