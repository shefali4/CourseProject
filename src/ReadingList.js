import { Tune } from '@material-ui/icons'
import React from 'react'
import { useState, useEffect } from 'react'
// import { text } from './stopwords.js';
import './ReadingList.scss'

/*globals chrome*/

export default function Site() {

    const [myLeads, setMyLeads] = useState([])
    const [frag, setFrag] = useState([])

    const stopwords = ". , ? ! ' \" \'' ` `` * - / + a about above according across after afterwards again against albeit all almost alone along already also although always am among amongst an and another any anybody anyhow anyone anything anyway anywhere apart are around as at av be became because become becomes becoming been before beforehand behind being below beside besides between beyond both but by can cannot canst certain cf choose contrariwise cos could cu day do does doesn't doing dost doth double down dual during each either else elsewhere enough et etc even ever every everybody everyone everything everywhere except excepted excepting exception exclude excluding exclusive far farther farthest few ff first for formerly forth forward from front further furthermore furthest get go had halves hardly has hast hath have he hence henceforth her here hereabouts hereafter hereby herein hereto hereupon hers herself him himself hindmost his hither hitherto how however howsoever i ie if in inasmuch inc include included including indeed indoors inside insomuch instead into inward inwards is it its itself just kind kg km last latter latterly less lest let like little ltd many may maybe me meantime meanwhile might moreover most mostly more mr mrs ms much must my myself namely need neither never nevertheless next no nobody none nonetheless noone nope nor not nothing notwithstanding now nowadays nowhere of off often ok on once one only onto or other others otherwise ought our ours ourselves out outside over own per perhaps plenty provide quite rather really round said sake same sang save saw see seeing seem seemed seeming seems seen seldom selves sent several shalt she should shown sideways since slept slew slung slunk smote so some somebody somehow someone something sometime sometimes somewhat somewhere spake spat spoke spoken sprang sprung stave staves still such supposing than that the thee their them themselves then thence thenceforth there thereabout thereabouts thereafter thereby therefore therein thereof thereon thereto thereupon these they this those thou though thrice through throughout thru thus thy thyself till to together too toward towards ugh unable under underneath unless unlike until up upon upward upwards us use used using very via vs want was we week well were what whatever whatsoever when whence whenever whensoever where whereabouts whereafter whereas whereat whereby wherefore wherefrom wherein whereinto whereof whereon wheresoever whereto whereunto whereupon wherever wherewith whether whew which whichever whichsoever while whilst whither who whoa whoever whole whom whomever whomsoever whose whosoever why will wilt with within without worse worst would wow ye yet year yippee you your yours yourself yourselves 1 2 3 4 5 6 7 8 9 0 a b c d e f g h i j k l m n o p q r s t u v w x y z"
    const stop_array = stopwords.split(" ");

    window.addEventListener("load", function () {
        setMyLeads(JSON.parse(localStorage.getItem('myLeads')) || [])
    })

    useEffect(() => {
        window.localStorage.setItem("myLeads", JSON.stringify(myLeads))

        chrome.tabs.executeScript(null, {
            code: `document.all[0].innerText`,
            allFrames: false, // this is the default
            runAt: 'document_start', // default is document_idle
        },
            function (results) {
                // results.length must be 1
                var result = results[0];
                var new_result = findMostRepeatedWord(result);

                function findMostRepeatedWord(result) {
                    let words = result.match(/\w+/g);

                    let occurances = {};

                    for (let word of words) {
                        if (occurances[word]) {
                            occurances[word]++;
                        } else {
                            occurances[word] = 1;
                        }
                    }

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
                // var htmlString = '<head><title>main word/topic: ' + new_result + '</title></head>',
                //     html = document.createElement('html'),
                //     f = document.createDocumentFragment();

                // html.innerHTML = htmlString;
                // f.appendChild(html);

                // setFrag(f)
                setFrag(new_result)
            });

    }, [myLeads]);

    // Adds URL to list
    function addURL(e) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const newItem = {
                titleText2: [frag],
                shorturl: shortenURL(tabs[0].url),
                url: tabs[0].url,
                title: tabs[0].title,
                fav: "http://www.google.com/s2/favicons?domain=" + tabs[0].url,
            }

            if (!(myLeads.map(a => a.url)).includes(newItem.url)) {
                setMyLeads([...myLeads, newItem])
            }
        })
    }

    // Deletes all URLs in list
    function deleteAllURL() {
        localStorage.clear()
        setMyLeads([])
    }

    function deleteSingle(e) {
        setMyLeads(myLeads.filter(function (v) {
            return v.url !== e.target.value
        }))
    }

    function shortenURL(url) {
        return (new URL(url)).hostname;
    }

    function deleteTopic(e, tit) {
        e.preventDefault()

        let path = e.target.value
        
        let newArr = [...myLeads]
        let ind = newArr.findIndex((obj => obj.url === path));

        let indInd = (newArr[ind].titleText2).indexOf(tit);
        if (indInd > -1) {
            (newArr[ind].titleText2).splice(indInd, 1);
        }

        setMyLeads(newArr)
    }

    function handleSubmit(e) {
        e.preventDefault()
        let top = e.target.topic.value
        let path = e.target.url.value
        
        let newArr = [...myLeads]
        let ind = newArr.findIndex((obj => obj.url === path));
        if (!(newArr[ind].titleText2.includes(top))) {
            newArr[ind].titleText2.push(top)
        }
        setMyLeads(newArr)
    }

    return (
        <div>
            <button onClick={addURL} className="save-button" type="submit" >+</button>
            <button onClick={deleteAllURL} id="delete-btn" type="button" >DELETE ALL</button>
            <div className="ent">
                {myLeads && myLeads.map((item, id) => (
                    <div className="witht" >
                        <div className="withb" id='curtab'>
                            <div className="hyperlink">
                                <div onClick={item.url} className="entry" key={id}>
                                    <div className="prof">
                                        <img className="favicon-img" src={item.fav} />
                                        <a className="hyperlink" target='_blank' href={item.url}>
                                            <div className="ti">
                                                <b className="title"> {item.title} </b>
                                                <p> {item.shorturl} </p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <button value={item.url} onClick={deleteSingle} type="button" className="but" aria-label="Close">X</button>
                        </div>
                        {item.titleText2 && item.titleText2.map((tit, idtit) => (
                            <div className="top-but">
                                <button value={item.url} onClick={(e) => deleteTopic(e,tit)} type="button" className="but-top" aria-label="Close">{tit + " x"} </button>
                            </div>
                        ))}
                        <form onSubmit={handleSubmit} className="textbox">
                            <input type="text" name="topic" placeholder="Add Topic"/>
                            <button type="submit" value={item.url} name="url">add</button>
                        </form>
                    </div>
                ))}
            </div>
        </div >
    );
}