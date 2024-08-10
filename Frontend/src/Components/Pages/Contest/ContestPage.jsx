import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import axios from "axios";
import styles from "./Contest.module.css";

const ContestPage = () => {
  const [contests, setContests] = useState([]);
  const navigate = useNavigate();  // Initialize useNavigate

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
    const date = new Date(unixTime * 1000);
    return date.toLocaleString();
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes} minutes and ${seconds} seconds`;
  };

  const handleClick = (contest) => {
    navigate("/contest-detail", { state: { contest } });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.subHeader}>Current or Upcoming Contest</h2>
      <ul className={styles.contestList}>
        <div className={styles.contestWrap}>
          {contests &&
            contests.map((contest) => (
              <li 
                key={contest.contest_id} 
                className={styles.contestItem}
                onClick={() => handleClick(contest)}
              >
                <h3 className={styles.contestName}>{contest.contest_name}</h3>
                <div className={styles.contestDetails}>
                  <p>Start Time: {formatTime(contest.contest_start_time)}</p>
                  <p>Duration: {formatDuration(contest.contest_duration)}</p>
                </div>
              </li>
            ))}
        </div>
      </ul>
    </div>
  );
};

export default ContestPage;
