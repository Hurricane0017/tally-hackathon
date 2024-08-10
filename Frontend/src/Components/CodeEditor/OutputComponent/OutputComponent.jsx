import { useEffect } from 'react';
import classes from './OutputComponent.module.css';

// eslint-disable-next-line react/prop-types
function OutputComponent({ output }) {
  useEffect(() => {
    console.log(output);
  }, [output]);
  // console.log(output);
  return (
    <div className={classes.ioComp}>
      <h3>Output</h3>
      <textarea
        value={output}
        className={classes.ioPre}
      />
      {/* <textarea className={classes.ioPre}>{output}</textarea> */}
    </div>
  );
}

export default OutputComponent;