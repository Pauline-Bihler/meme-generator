import './styles.css';
import { saveAs } from 'file-saver';
import { useCallback, useEffect, useState } from 'react';

export default function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [memeImageUrl, setMemeImageUrl] = useState('');
  const [templateImageUrl, setTemplateImageUrl] = useState('');

  // Fetch the data
  useEffect(() => {
    fetch('https://api.memegen.link/templates/')
      .then((response) => response.json())
      .then((data) => {
        setTemplates(
          data.map((item) => item.blank.split('.png')[0].split('/')[4]),
        );
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  // Function to update the meme template and the preview image
  const updateMemeTemplate = (template) => {
    setSelectedTemplate(template);
    setTemplateImageUrl(`https://api.memegen.link/images/${template}.png`);
  };

  // Function to generate the meme
  const generateNewMeme = useCallback(() => {
    if (selectedTemplate) {
      let memeUrl = `https://api.memegen.link/images/${selectedTemplate}`;

      if (topText) {
        memeUrl += `/${encodeURIComponent(topText)}`;
      }

      if (bottomText) {
        memeUrl += `/${encodeURIComponent(bottomText)}`;
      } else {
        memeUrl += '/_'; // Use underscore as a placeholder for missing bottom text
      }

      memeUrl += '.png';

      console.log('Generated Meme URL:', memeUrl);
      setMemeImageUrl(memeUrl);
    }
  }, [selectedTemplate, topText, bottomText]);

  // Function to download the new meme
  function saveMemeImage() {
    if (memeImageUrl) {
      // Use the saveAs function to save the meme image
      saveAs(memeImageUrl, 'meme.png');
    }
  }

  useEffect(() => {
    // Set an initial template for the preview image when the templates are fetched
    if (templates.length > 0) {
      updateMemeTemplate(templates[0]);
    }
  }, [templates]);

  // Update memeImageUrl when topText changes
  useEffect(() => {
    generateNewMeme();
  }, [generateNewMeme]);

  // Update memeImageUrl when topText or bottomText changes
  useEffect(() => {
    generateNewMeme();
  }, [generateNewMeme, topText, bottomText]);

  return (
    <main>
      <br />
      <div className="section-1">
        <h1>Meme Generator</h1>
        <br />
        <p>
          Wondering how to create your own meme and make it trend?
          <br /> It's easy! Try these easy steps and generate your own meme.
        </p>
        <br />
      </div>
      <br />
      <br />
      <br />
      <div className="section-2">
        <form onSubmit={(event) => event.preventDefault()}>
          {/* Choose a Meme Template */}
          <div className="template-preview">
            <label htmlFor="memeTemplate">Meme Template</label>
            <select
              id="memeTemplate"
              onChange={(event) => updateMemeTemplate(event.target.value)}
              value={selectedTemplate}
            >
              {templates.map((template) => (
                <option key={`user-${template.id}`} value={template}>
                  {template}
                </option>
              ))}
            </select>
            {/* Display Template Image Preview */}
            {templateImageUrl ? (
              <div className="template-image">
                <img
                  src={templateImageUrl}
                  alt="Selected Template"
                  style={{ maxWidth: '300px', maxHeight: '300px' }}
                  data-test-id="meme-image"
                />
              </div>
            ) : null}
          </div>
        </form>
        <br />
        <br />
        <br />
        <form onSubmit={(event) => event.preventDefault()}>
          {/* Add Text */}
          <label htmlFor="topText">Top text</label>
          <input
            value={topText}
            id="topText"
            onChange={(event) => setTopText(event.target.value)}
          />
          <br />
          <br />
          <br />
          <br />
          <label htmlFor="bottomText">Bottom text</label>
          <input
            value={bottomText}
            id="bottomText"
            onChange={(event) => setBottomText(event.target.value)}
          />
          <br />
          <br />
          <br />
          <br />
          {/* <button data-test-id="generate-meme" onClick={generateNewMeme}>
            Generate Meme
          </button> */}
        </form>
        {/* Display Generated Meme */}
        {memeImageUrl ? (
          <div>
            <h2>Generated Meme</h2>
            <img
              src={memeImageUrl}
              alt="Generated Meme"
              data-test-id="meme-image"
              style={{ maxWidth: '300px', maxHeight: '300px' }}
            />
          </div>
        ) : null}
        <br />
        <br />
        <br />
        <div className="download">
          <button onClick={saveMemeImage}>Download</button>
        </div>

        <br />
      </div>
    </main>
  );
}

//   return (
//     <main>
//       <br />
//       <section>
//         <h1>Meme Generator</h1>
//         <br />
//         <p>
//           Wondering how to create your own meme and make it trend?
//           <br /> Its easy! Try these easy steps and generate your own meme.
//         </p>
//         <br />
//       </section>
//       <br />
//       <br />
//       <br />
//       <section>
//         <form onSubmit={(event) => event.preventDefault()}>
//           <button>Meme Template</button>
//         </form>
//         <br />
//         <br />
//         <br />
//         <form onSubmit={(event) => event.preventDefault()}>
//           <div>Top Text:{label}</div>
//           <input
//             value={topText}
//             onChange={(event) => setTopText(event.target.value)}
//           />
//           <br />
//         </form>
//         <br />
//         <br />
//         <br />
//         <form onSubmit={(event) => event.preventDefault()}>
//           <div>Bottom Text:{label}</div>
//           <input
//             value={bottomText}
//             onChange={(event) => setBottomText(event.target.value)}
//           />
//         </form>
//       </section>
//       <br />
//       <br />
//       <br />
//       <form onSubmit={(event) => event.preventDefault()}>
//         <button>Download</button>
//       </form>
//       <br />
//       <br />
//       <br />
//     </main>
//   );
// }

// import './styles.css';
// import { useEffect, useState } from 'react';

// export default function App() {
//   const [topText, setTopText] = useState(''); // Top text input field
//   const [bottomText, setBottomText] = useState(''); // Bottom text input field
//   const [label, setLabel] = useState(''); // To see the label text on top of the input field
//   const [templates, setTemplates] = useState([]); // Store meme templates
//   const [selectedTemplate, setSelectedTemplate] = useState(''); // Store selected template
//   const [memeImageUrl, setMemeImageUrl] = useState(''); // Store generated meme image URL
//   const [templateImageUrl, setTemplateImageUrl] = useState(''); // Store selected template image URL

//   // Fetch the data
//   useEffect(() => {
//     fetch('https://api.memegen.link/templates/')
//       .then((response) => response.json())
//       .then((data) =>
//         setTemplates(
//           data.map((item) => item.blank.split('.png')[0].split('/')[4]),
//         ),
//       )
//       .catch((error) => console.error('Error:', error));
//   }, []);

//   // Function to update the meme template and the preview image
//   const updateMemeTemplate = (template) => {
//     setSelectedTemplate(template);
//     setTemplateImageUrl(`https://api.memegen.link/images/${template}.png`);
//   };

//   // Function to generate the meme by clicking the 'Generate Meme' button
//   const generateNewMeme = () => {
//     if (selectedTemplate && topText && bottomText) {
//       const memeUrl = `https://api.memegen.link/images/${selectedTemplate}/${topText}/${bottomText}.png`;
//       setMemeImageUrl(memeUrl);
//     }
//   };

//   return (
//     <main>
//       <br />
//       <div className="section-1">
//         <h1>Meme Generator</h1>
//         <br />
//         <p>
//           Wondering how to create your own meme and make it trend?
//           <br /> Its easy! Try these easy steps and generate your own meme.
//         </p>
//         <br />
//       </div>
//       <br />
//       <br />
//       <br />
//       <div className="section-2">
//         <form onSubmit={(event) => event.preventDefault()}>
//           {/* Choose a Meme Template */}
//           <label htmlFor="meme-template-select">Meme Template:</label>
//           <select
//             id="meme-template-select"
//             onChange={(event) => updateMemeTemplate(event.target.value)}
//           >
//             <option value="">Select a Template</option>
//             {templates.map((template) => (
//               <option key={`template-${template}.id`} value={template}>
//                 {template}
//               </option>
//             ))}
//           </select>
//           {/* Display Template Image Preview */}
//           {templateImageUrl ? (
//             <img
//               src={templateImageUrl}
//               alt="Selected Template"
//               style={{ maxWidth: '300px', maxHeight: '300px' }}
//             />
//           ) : null}
//         </form>
//         <br />
//         <br />
//         <br />
//         <form onSubmit={(event) => event.preventDefault()}>
//           {/* Add Text */}
//           <label>
//             <div>Top Text:{label}</div>
//             <input
//               value={topText}
//               onChange={(event) => setTopText(event.target.value)}
//             />
//           </label>
//           <br />
//           <br />
//           <br />
//           <br />
//           <label>
//             <div>Bottom Text:{label}</div>
//             <input
//               value={bottomText}
//               onChange={(event) => setBottomText(event.target.value)}
//             />
//           </label>
//           <br />
//           <br />
//           <br />
//           <br />
//           <button onClick={generateNewMeme}>Generate Meme</button>
//         </form>
//         {/* Display Generated Meme */}
//         {memeImageUrl ? (
//           <div>
//             <h2>Generate Meme</h2>
//             <img
//               src={memeImageUrl}
//               alt="Generated Meme"
//               style={{ maxWidth: '300px', maxHeight: '300px' }}
//               data-test-id="meme-image"
//             />
//           </div>
//         ) : null}
//         <br />
//         <br />
//         <br />
//         {/* <label> */}
//         <form onSubmit={(event) => event.preventDefault()}>
//           <button>Download</button>
//         </form>
//         {/* </label> */}
//         <br />
//       </div>
//     </main>
//   );
// }

// before download works
// import './styles.css';
// import { useEffect, useState } from 'react';

// export default function App() {
//   const [topText, setTopText] = useState(''); // Top text input field
//   const [bottomText, setBottomText] = useState(''); // Bottom text input field
//   const [templates, setTemplates] = useState([]); // Store meme templates
//   const [selectedTemplate, setSelectedTemplate] = useState(''); // Store selected template
//   const [memeImageUrl, setMemeImageUrl] = useState(''); // Store generated meme image URL
//   const [templateImageUrl, setTemplateImageUrl] = useState(''); // Store selected template image URL

//   // Fetch the data
//   useEffect(() => {
//     fetch('https://api.memegen.link/templates/')
//       .then((response) => response.json())
//       .then((data) =>
//         setTemplates(
//           data.map((item) => item.blank.split('.png')[0].split('/')[4]),
//         ),
//       )
//       .catch((error) => console.error('Error:', error));
//   }, []);

//   // Function to update the meme template and the preview image
//   const updateMemeTemplate = (template) => {
//     setSelectedTemplate(template);
//     setTemplateImageUrl(`https://api.memegen.link/images/${template}.png`);
//   };

//   // Function to generate the meme by clicking the 'Generate Meme' button
//   const generateNewMeme = () => {
//     if (selectedTemplate && topText && bottomText) {
//       const memeUrl = `https://api.memegen.link/images/${selectedTemplate}/${topText}/${bottomText}.png`;
//       setMemeImageUrl(memeUrl);
//     }
//   };

//   // Function to handle the download when the "Download" button is clicked
//   const handleClick = () => {
//     if (memeImageUrl) {
//       // Create an anchor element
//       const a = document.createElement('a');
//       a.href = memeImageUrl; // Set the image URL as the href
//       a.download = 'meme.png'; // Specify the desired filename for the downloaded image
//       a.style.display = 'none'; // Hide the anchor element
//       document.body.appendChild(a); // Append the anchor to the document body
//       a.click(); // Trigger a click event on the anchor element
//       document.body.removeChild(a); // Remove the anchor from the document body (clean up)
//     }
//   };

//   return (
//     <main>
//       <br />
//       <div className="section-1">
//         <h1>Meme Generator</h1>
//         <br />
//         <p>
//           Wondering how to create your own meme and make it trend?
//           <br /> Its easy! Try these easy steps and generate your own meme.
//         </p>
//         <br />
//       </div>
//       <br />
//       <br />
//       <br />
//       <div className="section-2">
//         <form onSubmit={(event) => event.preventDefault()}>
//           {/* Choose a Meme Template */}
//           <div className="template-preview">
//             <label htmlFor="meme-template-select">Meme Template:</label>
//             <select
//               id="meme-template-select"
//               onChange={(event) => updateMemeTemplate(event.target.value)}
//             >
//               <option value="">Select a Template</option>
//               {templates.map((template) => (
//                 <option key={`template-${template}.id`} value={template}>
//                   {template}
//                 </option>
//               ))}
//             </select>
//             {/* Display Template Image Preview */}
//             {templateImageUrl ? (
//               <div className="template-image">
//                 <img
//                   src={templateImageUrl}
//                   alt="Selected Template"
//                   style={{ maxWidth: '300px', maxHeight: '300px' }}
//                 />
//               </div>
//             ) : null}
//           </div>
//         </form>
//         <br />
//         <br />
//         <br />
//         <form onSubmit={(event) => event.preventDefault()}>
//           {/* Add Text */}
//           <label>
//             <div>Top Text: </div>
//             <input
//               value={topText}
//               onChange={(event) => setTopText(event.target.value)}
//             />
//           </label>
//           <br />
//           <br />
//           <br />
//           <br />
//           <label>
//             <div>Bottom Text: </div>
//             <input
//               value={bottomText}
//               onChange={(event) => setBottomText(event.target.value)}
//             />
//           </label>
//           <br />
//           <br />
//           <br />
//           <br />
//           <button onClick={generateNewMeme}>Generate Meme</button>
//         </form>
//         {/* Display Generated Meme */}
//         {memeImageUrl ? (
//           <div>
//             <h2>Generated Meme</h2>
//             <img
//               src={memeImageUrl}
//               alt="Generated Meme"
//               style={{ maxWidth: '300px', maxHeight: '300px' }}
//               data-test-id="meme-image"
//             />
//           </div>
//         ) : null}
//         <br />
//         <br />
//         <br />
//         {/* <label> */}
//         {/* <div className="downloadButton">
//           <a
//             href={memeImageUrl} // Set the image URL as the href
//             download="meme.png" // Specify the desired filename for the downloaded image
//           >
//             <form onSubmit={(event) => event.preventDefault()}>
//               <button id="downloadButton" value="download">
//                 Download
//               </button>
//             </form>
//           </a>
//         </div> */}
//         <div className="download">
//           <a
//             href={memeImageUrl} // Set the image URL as the href
//             download="meme.png" // Specify the desired filename for the downloaded image
//           >
//             <form onSubmit={(event) => event.preventDefault()}>
//               <button onClick={handleClick}>Download</button>
//             </form>
//           </a>
//         </div>
//         <br />
//       </div>
//     </main>
//   );
// }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// // Function to generate the meme by clicking the 'Generate Meme' button
// const generateNewMeme = () => {
//   if (selectedTemplate && topText && bottomText) {
//     const memeUrl = `https://api.memegen.link/images/${selectedTemplate}/${topText}/${bottomText}.png`;
//     console.log('Generated Meme URL:', memeUrl);
//     setMemeImageUrl(memeUrl);
//   }
// };

// // Update memeImageUrl when topText or bottomText changes
// useEffect(() => {
//   if (selectedTemplate && topText && bottomText) {
//     const memeUrl = `https://api.memegen.link/images/${selectedTemplate}/${topText}/${bottomText}.png`;
//     setMemeImageUrl(memeUrl);
//   }
// }, [selectedTemplate, topText, bottomText]);
