/* eslint-disable react/prop-types */
import classes from './Problem.module.css';


const Problem = ({prob}) => {

  return (
    <div className={classes.problemCont}>
      <div className={classes.titleCont}>
        <h1 className={classes.title}>{prob?.title}</h1>
        <div className={classes.metaData}>
          <p><strong>Memory Limit:</strong> {prob?.memoryLimit}</p>
          <p><strong>Time Limit:</strong> {prob?.timeLimit}</p>
        </div>
      </div>
      <p className={classes.description}>{prob?.description}</p>
      <div className={classes.section}>
        <h3 className={classes.sectionTitle}>Input Format</h3>
        <div className={classes.inputCont}>
          <p>{prob?.inputFormat}</p>
        </div>
      </div>
      <div className={classes.section}>
        <h3 className={classes.sectionTitle}>Output Format</h3>
        <div className={classes.outputCont}>
          <p>{prob?.outputFormat}</p>
        </div>
      </div>
      <div className={classes.section}>
        <h3 className={classes.sectionTitle}>Constraints</h3>
        <div className={classes.constraintsCont}>
          <p>{prob?.constraints}</p>
        </div>
      </div>
      <div className={classes.section}>
        <h3 className={classes.sectionTitle}>Sample</h3>
        <div className={classes.exampleCont}>
          <h4>Input</h4>
          <pre className={classes.sampleInput}>{prob?.sample?.input}</pre>
        </div>
        <div className={classes.exampleCont}>
          <h4>Output</h4>
          <pre className={classes.sampleOutput}>{prob?.sample?.output}</pre>
        </div>
      </div>
    </div>
  );
}

export default Problem;
