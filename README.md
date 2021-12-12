# CourseProject

## Documentation

Project Code: https://github.com/shefali4/CourseProject/tree/main

Documentation: Included in ReadMe

Presentation: https://youtu.be/y7x3Copbp-M


### 1) Overview

In general, our group’s chrome extension serves the purpose to allow users to save and bookmark articles with topic/text analysis for later viewing. There are two buttons which control a large portion of the chrome extension. First, the “+” button adds an entry to the list containing information like the article’s title, a hyperlinked url, and the tab icon. The second button is the delete all button which deletes all the entries in the list. Other functionalities include deleting individual entries from the list, preventing repeated urls, and displaying the domain name of the larger URL. The most common word which can be understood as the topic of an article is also automatically calculated from the bookmarked article, and users can add or delete their own topics.


### 2) Software Implementation

One of the main important components of a chrome extension are the inclusions in the public folder, specifically the manifest.json. As described by the docs, the manifest.json is a JSON file in the extension that tells the browser about the extension on the user's desktop. Chrome extensions require the manifest to be able to add the extension to chrome.  While developing this app we used manifest_version 2, and made sure to include all the necessary permissions and naming required by the extension.
The next major files are the files that are automatically in React apps once created. The files that we added logic to include the App.js, App.scss, ReadingList.js, and ReadingList.scss. Important files to understand in the React app are the package.json and index.js. The index.js in the hierarchy of files, is at the top and calls the App.js and renders the whole project from all the other functions that we return html code from. The package.json is important because it includes information about dependencies - like defining project properties, description, author & license information, scripts, etc. It records important metadata about a project which is required before publishing to NPM, and also defines functional attributes of a project that npm uses to install dependencies, run scripts, and identify the entry point to our package. So when first downloading a react/node app, rather than always inducing the hundreds of files in the node_modules folder, the package.json includes the necessary libraries and developers simply have to run npm install.
App.js is generally used as the overview App function that calls the different pages/components that build the app. So here you see the name of the app and the call to the ReadingList component. Styling for the html returned can be found in the App.scss file. If one would want to expand on this project they would be able to add additional components and call them in App.js. For our focused project Reading,js is where we have all our logic for the bookmark functionality of the project. 

We have the functions:
* addUrl() : function that saves objects containing attributes such a shortened URL, the original URL, the article title, and the tab’s icon image link. Then these objects are added to a list. Parameter: nothing. Returns: nothing
* deleteAllURL() : function that deletes all URL’s stored in the chrome extension pop-up. The button on the pop-up triggers the function, which erases the history of the URL’s. Parameter: nothing. Returns: nothing
* deleteSingle(e) :function that the URL stored in the chrome extension pop-up. The button on the pop-up triggers the function, which erases the history of the specific URL needed to be deleted. Parameter: nothing. Returns: all the URLs except the deleted one
* shortenURL(url) : function that displays the shortened version of the URL to be displayed on the chrome extension pop-up. Removes unnecessary characters from the original link at the end. Parameter: URL. Returns: shortened URL.
* deleteTopic(e, topic) : Function that deletes the topic option in the chrome extension pop-up. It allows users to select which topic they want to delete (whether it be the original topic, or one that they manually added). Parameter: Event e, topic. Returns: nothing
* handleSubmit(e) :  function controls the functionality when the input text box submit button is clicked. Parameter: Event e. Returns: nothing
* findMostRepeatedWord(result): function that takes in the web scraped words as a single string and parses through the words to find the main topic of the page. Parameter: String result. Return: nothing. 
And the useEffect running important code for the storage of the user’s information and scraping of the webpage with the extension.



### 3) Instructions to Run/Install

In order to install the software onto your local machine, first locate the github repository which can be found here: https://github.com/shefali4/CourseProject/tree/main. Next, locate the “Code” dropdown menu and click the option that says “Download ZIP.” Unzip that folder, and now open the same directory in VSCode. Run npm install and npm run build which will create a build folder within the downloaded directory.

Now, open a new tab and navigate to chrome://extensions. Turn on "Developer Mode" and click the "Load unpacked" button in the top left corner. Now, locate and select the newly created build folder. Once you do this, you will be able to see our chrome extension in your extension list. You can also pin the extension for easy access as well.

Watch this video presentation on the full process to download and implement this chrome extension:  youtube link
Here is the example article we use in the video https://coronavirus.medium.com/five-facts-about-covid-vaccines-8c04e0edde05


### 4) Description of Contribution
Shefali - My contributions started with creating an algorithm to append URLs to the list on the back end. Once my team member helped to render this on the front end, I improved the user interface by creating boxes for each entry and adding logic to the chrome extension to display the URL’s title, icon, and a hyperlinked box. Additionally, I contributed by working to save the data in the chrome extension using local storage. I also collaborated with my teammate to create a URL shortening function to only display the domain name and created an algorithm to prevent a user from repeating a URL in the list.

Ashwini - For this project I was mainly in charge of assignment of tasks and making sure everyone was able to finish their parts for the project. I create the project in react in the beginning and spend a lot of time researching how it works then working with my team on all parts of the project trying to help troubleshoot whenever they run into problems. With my teammate I was able to help render the addition of URLS to help jumpstart the frontend. And helped clean up the backend logic for this functionality. For the ranking of topic analysis, I helped with figuring out how to scrape the website for text and aiding in cleaning  the backend with creating useState variables. In regards to adding and editing the topic tags, I aided in the css styling as well as the backend logic of inputting, saving, and deleting.

Mounika - My contribution to the project was implementing the resulting words from the scraped text from the webpage. After Ashwini was able to scrape the webpage and store it in the String object I went in to parse the string to print out the main topic of the page. I made a sample dummy function that counts the occurrence of the words to be able to test if I can pass through the string. Once it worked, I made another property to the item object and added a TextTitle attribute that renders the backend word to be able to display on the chrome extension. I was able to add the words under the tab that displayed the topic of the webpage. And adjusted the UI such that it is in the correct position and size of the display.

Chi- My contribution to the project was mainly to think up an idea of function and project in general. I proposed the idea of the personalized page marker to help improve the efficiency when we are having a lot of tags. By saving several key words after the user saves the link, it will be helpful to remind the user the information they have read. I also improve the result we have got from Mounika. I added a string of stopwords and parsed it into an array of words. Then I check the word we have got with the bank of stop words to make sure the word is basically meaningful.  I also worked on the creation of topic tags. Allowing users to add and delete the tags by their choice in addition to the precomputed tag.

