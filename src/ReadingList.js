import React from 'react'
import { useState, useEffect } from 'react'
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

    var stopwords = ". , ? ! ' \" \'' ` `` * - / + a about above according across after afterwards again against albeit all almost alone along already also although always am among amongst an and another any anybody anyhow anyone anything anyway anywhere apart are around as at av be became because become becomes becoming been before beforehand behind being below beside besides between beyond both but by can cannot canst certain cf choose contrariwise cos could cu day do does doesn't doing dost doth double down dual during each either else elsewhere enough et etc even ever every everybody everyone everything everywhere except excepted excepting exception exclude excluding exclusive far farther farthest few ff first for formerly forth forward from front further furthermore furthest get go had halves hardly has hast hath have he hence henceforth her here hereabouts hereafter hereby herein hereto hereupon hers herself him himself hindmost his hither hitherto how however howsoever i ie if in inasmuch inc include included including indeed indoors inside insomuch instead into inward inwards is it its itself just kind kg km last latter latterly less lest let like little ltd many may maybe me meantime meanwhile might moreover most mostly more mr mrs ms much must my myself namely need neither never nevertheless next no nobody none nonetheless noone nope nor not nothing notwithstanding now nowadays nowhere of off often ok on once one only onto or other others otherwise ought our ours ourselves out outside over own per perhaps plenty provide quite rather really round said sake same sang save saw see seeing seem seemed seeming seems seen seldom selves sent several shalt she should shown sideways since slept slew slung slunk smote so some somebody somehow someone something sometime sometimes somewhat somewhere spake spat spoke spoken sprang sprung stave staves still such supposing than that the thee their them themselves then thence thenceforth there thereabout thereabouts thereafter thereby therefore therein thereof thereon thereto thereupon these they this those thou though thrice through throughout thru thus thy thyself till to together too toward towards ugh unable under underneath unless unlike until up upon upward upwards us use used using very via vs want was we week well were what whatever whatsoever when whence whenever whensoever where whereabouts whereafter whereas whereat whereby wherefore wherefrom wherein whereinto whereof whereon wheresoever whereto whereunto whereupon wherever wherewith whether whew which whichever whichsoever while whilst whither who whoa whoever whole whom whomever whomsoever whose whosoever why will wilt with within without worse worst would wow ye yet year yippee you your yours yourself yourselves 0 1 2 3 4 5 6 7 8 9 "
    var stop_array = stopwords.split (" ");
    // Adds URL to list
    function addURL(e) {

        //  GET'S THE CONTENT ON THE PAGE
        chrome.tabs.executeScript(null, {
            code: `document.all[0].innerText`,
            allFrames: false, // this is the default
            runAt: 'document_start', // default is document_idle. See https://stackoverflow.com/q/42509273 for more details.
        },
            function (results) {
                // results.length must be 1
                var result = results[0];
                //const n_result = result.filter(result => result.length > 6);

                console.log("most repeated word is:"); // Result: "do"
                var new_result = findMostRepeatedWord(result);
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
                        if (occurances[word] > max && !stop_array.includes(word) && word.length >= 2) {
                            max = occurances[word];
                            mostRepeatedWord = word;
                        }
                    }

                    return mostRepeatedWord;
                }

                // new result printing on the extension
                var htmlString = '<head><title>most common word: ' + new_result + '</title></head><body><p>Some text, in a paragraph!</p></body>',
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

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const newItem = {
                titleText2: fragment_2.firstChild.getElementsByTagName('title')[0].textContent || fragment_2.firstChild.getElementsByTagName('title')[0].innerText,
                shorturl: shortenURL(tabs[0].url),
                url: tabs[0].url,
                title: tabs[0].title,
                fav: "http://www.google.com/s2/favicons?domain=" + tabs[0].url,
            }

            if (!(myLeads.map(a => a.url)).includes(newItem.url)) {
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
        setMyLeads(myLeads.filter(function (v) {
            return v.url !== e.target.value
        })
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
                                    <img className="favicon-img" src={item.fav} />
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