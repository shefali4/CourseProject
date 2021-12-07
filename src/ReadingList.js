import React from 'react'
import {useState, useEffect} from 'react'
import './ReadingList.scss'
/*globals chrome*/

export default function Site() {
    
    const [myLeads, setMyLeads] = useState([])

    window.addEventListener("load", function () {
        setMyLeads(JSON.parse(localStorage.getItem('myLeads')) || [])
    })

    useEffect(() => {
        window.localStorage.setItem("myLeads", JSON.stringify(myLeads))

    }, [myLeads]);

    var fragment_2;
    var new_result;
    

    // Adds URL to list
    function addURL(e) { 

        //  GET'S THE CONTENT ON THE PAGE
        chrome.tabs.executeScript(null, {
            code: `document.all[0].innerText`,
            allFrames: false, // this is the default
            runAt: 'document_start', // default is document_idle. See https://stackoverflow.com/q/42509273 for more details.
        }, 
        function(results) {
            // results.length must be 1
            var result = results[0];
            console.log(result)

            //const n_result = result.filter(result => result.length > 6);

            console.log("most repeated word is:"); // Result: "do"
            new_result = findMostRepeatedWord(result);
            console.log(new_result); // Result: "do"

            function findMostRepeatedWord(result) {
            let words = result.match(/\w+/g);
            //console.log(words); // [ 'How', 'do', 'you', 'do' ]

            let occurances = {};

            for (let word of words) {
                if (occurances[word]) {
                occurances[word]++;
                } else {
                occurances[word] = 1;
                }
            }

            //console.log(occurances); // { How: 1, do: 2, you: 1 }

            let max = 0;
            let mostRepeatedWord = '';

            for (let word of words) {
                if (occurances[word] > max) {
                max = occurances[word];
                mostRepeatedWord = word;
                }
            }

            return mostRepeatedWord;
            }


            var htmlString = '<head><title>most common word: '+ new_result +'</title></head><body><p>Some text, in a paragraph!</p></body>',
            html = document.createElement('html'),
            frag = document.createDocumentFragment();


            html.innerHTML = htmlString;
            frag.appendChild(html);

            var titleText2 = frag.firstChild.getElementsByTagName('title')[0].textContent || frag.firstChild.getElementsByTagName('title')[0].innerText;
            fragment_2 = frag;

            
            //console.log(titleText)

            // process_result(result); --> Call the function that does BM25 Stuff on it
        });
        //'<head><title>result</title></head><body><p>Some text, in a paragraph!</p></body>'
       
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const newItem = {
                titleText2: fragment_2.firstChild.getElementsByTagName('title')[0].textContent || fragment_2.firstChild.getElementsByTagName('title')[0].innerText,
                shorturl: shortenURL(tabs[0].url),
                url: tabs[0].url,
                title: tabs[0].title,
                fav: "http://www.google.com/s2/favicons?domain="+tabs[0].url,
            }
            
            if (!(myLeads.map(a => a.url)).includes(newItem.url)){
                setMyLeads([...myLeads, newItem])
            }
            // document.body.innerText has all the words on the page stored
            console.log(document.body.innerText)
        })
        e.preventDefault();
    }
        
        // //JAVASCRIPT parsing through the webpage 
        // const source = document.getElementById("source");
        // const textContentOutput = document.getElementById("textContentOutput");
        // const innerTextOutput = document.getElementById("innerTextOutput");
        
        // textContentOutput.value = source.textContent;
        // innerTextOutput.value = source.innerText;

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
                                <a className="titleText"> {item.titleText2} </a>
                            </div>
                        </a>
                        <button value={item.url} onClick={deleteSingle} type="button" className="but" aria-label="Close">X</button>
                    </div>
                ))}
            </div>
        </div>
    );
}