/* eslint-disable react/prop-types */
import classes from "./ProblemPage.module.css";

export const ProblemContainer = ({ problem, serialNumber }) => {
  const { title, rating } = problem;

  return (
    <div className={classes.problemContainer}>
      <span className={classes.serialNumber}>#{serialNumber + 1}</span>
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.metaInfo}>
        <span className={classes.rating}>Rating: {rating}</span>
      </div>
    </div>
  );
};