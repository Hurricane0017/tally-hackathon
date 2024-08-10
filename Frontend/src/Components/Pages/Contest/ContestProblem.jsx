import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./ContestDetail.module.css";

const ContestDetailPage = () => {
  const location = useLocation();
  const { contest } = location.state || {};
  if (!contest) {
    return <p>No contest data available</p>;
  }

  const formatTime = (unixTime) => {
    const date = new Date(unixTime * 1000);
    return date.toLocaleString();
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes} minutes and ${seconds} seconds`;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.subHeader}>{contest.contest_name}</h2>
      <div className={styles.contestDetails}>
        <p>Start Time: {formatTime(contest.contest_start_time)}</p>
        <p>Duration: {formatDuration(contest.contest_duration)}</p>
        <p>Contest ID: {contest.contest_id}</p>
        {/* Add more details here as needed */}
      </div>
    </div>
  );
};

export default ContestDetailPage;
