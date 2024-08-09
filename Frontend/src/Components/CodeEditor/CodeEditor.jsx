import { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import InputComponent from '../InputComponent/InputComponent';
import OutputComponent from '../OutputComponent/OutputComponent';
import classes from './CodeEditor.module.css';
import axios from 'axios';

const languageTemplates = {
  cpp: `#include <iostream>
#include <string>

int main() {
    std::string name;
    std::getline(std::cin, name);
    std::cout << "Hello, " << name << "!" << std::endl;
    return 0;
}`,
  javascript: `const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('', name => {
  console.log(\`Hello, \${name}!\`);
  readline.close();
});`,
  python: `name = input()
print(f"Hello, {name}!")`,
  java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String name = scanner.nextLine();
        System.out.println("Hello, " + name + "!");
        scanner.close();
    }
}`
};

function CodeEditor() {
  const [language, setLanguage] = useState('cpp');
  const [theme, setTheme] = useState('vs-dark');
  const [code, setCode] = useState(languageTemplates.cpp);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    setCode(languageTemplates[language]);
  }, [language]);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const handleRunCode = async () => {
    const payload= {
      code,
      language,
      input,
    };
    try{
      const response = await axios.post('http://localhost:5000/run', payload);
      setOutput(response.data.output);
    }
    catch(error){
      console.error('Error running code:', error);
    }
  };

  return (
    <div className={classes.codeEditorCont}>
      <div className={classes.editControls}>
        <select value={language} onChange={handleLanguageChange} className={classes.selectInput}>
          <option value="cpp">C++</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
        <select value={theme} onChange={handleThemeChange} className={classes.selectInput}>
          <option value="vs-light">Light</option>
          <option value="vs-dark">Dark</option>
        </select>
        <button onClick={handleRunCode} className={classes.runButton}>Run Code</button>
      </div>
      <MonacoEditor
        height="400px"
        language={language}
        theme={theme}
        value={code}
        options={{
          automaticLayout: true,
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          padding: { top: 10 },
        }}
        onChange={handleEditorChange}
        className={classes.monacoEditor}
      />
      <div className={classes.ioContainer}>
        <InputComponent input={input} setInput={setInput} />
        <OutputComponent output={output} />
      </div>
    </div>
  );
}

export default CodeEditor;