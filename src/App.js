import React from 'react';
import './App.css';
import {TextField} from "@material-ui/core";
import {bigram, trigram} from 'n-gram'

function App() {
  const [value, setValue] = React.useState("");
  const [characterCount, setCharacterCount] = React.useState(0)
  const [wordCount, setWordCount] = React.useState(0)
  const [sentenceCount, setSentenceCount] = React.useState(0)
  const [paragraphCount, setParagraphCount] = React.useState(0)
  const [bigramCount, setBigramCount] = React.useState(0)
  const [trigramCount, setTrigramCount] = React.useState(0)
  
  React.useEffect(()=> {
    getCharacterCount(value)
    getWordCount(value)
    getSentenceCount(value)
    getParagraphCount(value)
    getBigramCount(value)
    getTrigramCount(value)
  },[value])

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  
  const getCharacterCount = (value) => {
    let noSpaces = value.replace(/\s/g, '')
    setCharacterCount(noSpaces.length)
  }
  
  const getWordCount = (value) => {
    if (value && value !== " ") {
      let words = value.trim().split(" ")
      setWordCount(words.length)
    }
  }

  const getSentenceCount = (value) => {
    if (!value) {
      return
    }
    let sentences = value.split(/[\\.!\?]/) //looked up regular expressions for sentences 
    let notEmpty = 0
    for (var i = 0; i < sentences.length; i++) {
      let trimSentence = sentences[i].trim()
      if (trimSentence) {        
        notEmpty ++
      }
    }
    setSentenceCount(notEmpty)
  }

  const getParagraphCount = () => {
    if (!value) {
      return 
    }
    let numberParagraph = value.replace(/\n$/gm, '').split(/\n/).length;
    setParagraphCount(numberParagraph)
  }

  const getBigramCount = () => {
    let bigramWords = value.split(" ")
    let numberBigrams = (bigram(bigramWords).length)
    setBigramCount(numberBigrams)
  }

  const getTrigramCount = () => {
    let trigramWords = value.split(" ")
    let numberTrigrams = (trigram(trigramWords).length)
    setTrigramCount(numberTrigrams)
  }

  const clearEverything = () => {
    setCharacterCount(0)
    setWordCount(0)
    setSentenceCount(0)
    setParagraphCount(0)
    setBigramCount(0)
    setTrigramCount(0)
    setValue("")
  }
  
  return (
    <div className="App">
      <TextField
        value={value}
        id="first-name"
        label="Enter Text"
        multiline
        fullWidth
        style={{ margin: 8}}
        onChange={handleChange}
        margin="normal"
      />
      <div className="Counters">
      <p>The Character Count is: {characterCount}</p>
      <p>The Word Count is: {wordCount}</p>
      <p>The Sentence Count is: {sentenceCount}</p>
      <p>The Paragraph Count is: {paragraphCount}</p>
      <p>The Bigram Count is: {bigramCount}</p>
      <p>The Trigram Count is: {trigramCount}</p>

      <button onClick={clearEverything}>CLEAR DATA</button>
      </div>

    </div>
  );
}


export default App;
