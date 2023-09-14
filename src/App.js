import './styles.css';
import { useEffect, useState } from 'react';

export default function App() {
  const [topText, setTopText] = useState(''); // Top text input field
  const [bottomText, setBottomText] = useState(''); // Bottom text input field
  const [label, setLabel] = useState(''); // To see the label text on top of the input field
  const [templates, setTemplates] = useState([]); // Store meme templates
  const [selectedTemplate, setSelectedTemplate] = useState(''); // Store selected template
  const [memeImageUrl, setMemeImageUrl] = useState(''); // Store generated meme image URL
  const [templateImageUrl, setTemplateImageUrl] = useState(''); // Store selected template image URL

  // Fetch the data
  useEffect(() => {
    fetch('https://api.memegen.link/templates/')
      .then((response) => response.json())
      .then((data) =>
        setTemplates(
          data.map((item) => item.blank.split('.png')[0].split('/')[4]),
        ),
      )
      .catch((error) => console.error('Error:', error));
  }, []);

  // Function to update the meme template and the preview image
  const updateMemeTemplate = (template) => {
    setSelectedTemplate(template);
    setTemplateImageUrl(`https://api.memegen.link/images/${template}.png`);
  };

  // Function to generate the meme by clicking the 'Generate Meme' button
  const generateNewMeme = () => {
    if (selectedTemplate && topText && bottomText) {
      const memeUrl = `https://api.memegen.link/images/${selectedTemplate}/${topText}/${bottomText}.png`;
      setMemeImageUrl(memeUrl);
    }
  };

  return (
    <main>
      <br />
      <div className="section-1">
        <h1>Meme Generator</h1>
        <br />
        <p>
          Wondering how to create your own meme and make it trend?
          <br /> Its easy! Try these easy steps and generate your own meme.
        </p>
        <br />
      </div>
      <br />
      <br />
      <br />
      <div className="section-2">
        <form onSubmit={(event) => event.preventDefault()}>
          {/* Choose a Meme Template */}
          <label htmlFor="meme-template-select">Meme Template:</label>
          <select
            id="meme-template-select"
            onChange={(event) => updateMemeTemplate(event.target.value)}
          >
            <option value="">Select a Template</option>
            {templates.map((template) => (
              <option key={`template-${template}.id`} value={template}>
                {template}
              </option>
            ))}
          </select>
          {/* Display Template Image Preview */}
          {templateImageUrl ? (
            <img
              src={templateImageUrl}
              alt="Selected Template"
              style={{ maxWidth: '300px', maxHeight: '300px' }}
            />
          ) : null}
        </form>
        <br />
        <br />
        <br />
        <form onSubmit={(event) => event.preventDefault()}>
          {/* Add Text */}
          <label>
            <div>Top Text: {label}</div>
            <input
              value={topText}
              onChange={(event) => {
                setTopText(event.target.value);
                setLabel(event.target.value); // Update label with the input value
              }}
            />
          </label>
          <br />
          <br />
          <br />
          <br />
          <label>
            <div>Bottom Text: {label}</div>
            <input
              value={bottomText}
              onChange={(event) => {
                setBottomText(event.target.value);
                setLabel(event.target.value); // Update label with the input value
              }}
            />
          </label>
          <br />
          <br />
          <br />
          <br />
          <button onClick={generateNewMeme}>Generate Meme</button>
        </form>
        {/* Display Generated Meme */}
        {memeImageUrl ? (
          <div>
            <h2>Generate Meme</h2>
            <img
              src={memeImageUrl}
              alt="Generated Meme"
              style={{ maxWidth: '300px', maxHeight: '300px' }}
              data-test-id="meme-image"
            />
          </div>
        ) : null}
        <br />
        <br />
        <br />
        {/* <label> */}
        <form onSubmit={(event) => event.preventDefault()}>
          <button>Download</button>
        </form>
        {/* </label> */}
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
