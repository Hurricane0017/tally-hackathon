/* eslint-disable react/prop-types */
import Resizable from 'react-resizable-layout';
import CodeEditor from '../CodeEditor/CodeEditor';
import Problem from './ProblemContainer/Problem';
import styles from './SolveProblem.module.css';

const YourSeparatorComponent = (props) => (
  <div
    {...props}
    className={styles.separator}
  />
);

const SolveProblem = ({problem}) => {

  return (
    <Resizable
      axis="x"
      style={{ overflowY: "hidden" }}
      initial={550}
      min={300}
      max={window.innerWidth - 300}
    >
      {({ position, separatorProps }) => {
        const rightWidth = `calc(100vw - ${position}px - 5px)`; // Adjust the calculation

        return (
          <div className={styles.wrapper}>
            <div
              className={styles.leftBlock}
              style={{ width: position }}
            >
              <Problem prob={problem} />
            </div>
            <YourSeparatorComponent {...separatorProps} />
            <div
              className={styles.rightBlock}
              style={{ width: rightWidth }}
            >
              <CodeEditor />
            </div>
          </div>
        );
      }}
    </Resizable>
  );
};

export default SolveProblem;
