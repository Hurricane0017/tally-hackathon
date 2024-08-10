import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import styles from "./Contest.module.css";

const ContestPage = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get("/getcontestlist");
        setContests(response.data);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };

    fetchContests();
  }, []);

  const formatTime = (unixTime) => {
    const date = new Date(unixTime * 1000); // Convert to milliseconds
    return date.toLocaleString(); // Convert to readable string
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes} minutes and ${seconds} seconds`;
  };
  console.log(contests);
  return (
    <div className={styles.container}>
      {/* <h1 className={styles.header}>Contest Page</h1> */}

      <h2 className={styles.subHeader}>Current or Upcomming contest</h2>
      <ul className={styles.contestList}>
        <div className={styles.contestWrap}>
          {contests &&
            contests.map((contest) => (
              <li key={contest.contest_id} className={styles.contestItem}>
                <h3 className={styles.contestName}>{contest.contest_name}</h3>
                <div className={styles.contestDetails}>
                  <p>Start Time: {formatTime(contest.contest_start_time)}</p>
                  <p>Duration: {formatDuration(contest.contest_duration)}</p>
                  {/* <p>Problems: {contest.contest_problem.join(', ')}</p> */}
                </div>
              </li>
            ))}
        </div>
      </ul>
    </div>
  );
};

export default ContestPage;
