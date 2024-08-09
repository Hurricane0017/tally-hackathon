import classes from './OutputComponent.module.css';

// eslint-disable-next-line react/prop-types
function OutputComponent({ output }) {
  return (
    <div className={classes.ioComp}>
      <h3>Output</h3>
      <pre className={classes.ioPre}>{output}</pre>
    </div>
  );
}

export default OutputComponent;