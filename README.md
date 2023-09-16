## React Meme Generator

Create a web app with React that allows for users to generate and download memes using the https://memegen.link/ website.

It should allow the user to:

- [x] Enter text for the top and bottom of the meme
  - [x] The top text box needs to have a label element associated with it containing the text `Top text`
  - [x] The bottom text box needs to have a label element associated with it with the text `Bottom text`
  - [x] Both text boxes should be empty when the page first loads
- [ ] Preview the generated meme
  - [ ] The image element needs to have an html attribute set as follows: `data-test-id="meme-image"`
    - [ ] This image element should show a working image when the page first loads
- [x] Change the meme template (the background image)
  - [ ] The meme template selector element needs to have a label element associated with it containing the text `Meme template`
  - [x] If the user follows the steps below, the `doge` meme template needs to be selected:
    1. Click on the label of the meme template selector
    2. Clear any existing value (eg. with a text box)
    3. Type the text `doge`
    4. Hit enter
- [ ] Download the meme by clicking on a button
  - [ ] The button element needs to contain the text `Download`

Resources used:

- Google

-How to fetch data using API in React js:

- https://www.guvi.in/blog/how-to-fetch-data-using-api-in-react/
- https://dmitripavlutin.com/react-useeffect-explanation/
- https://maxrozen.com/fetching-data-react-with-useeffect

- Drop down option to show the meme templates(Select Element, Change event):
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
- https://developer.mozilla.org/en-US/docs/Web/API/Event

-
- https://legacy.reactjs.org/docs/forms.html
- https://legacy.reactjs.org/docs/handling-events.html
