import React, { useState, useRef, useEffect } from 'react';
import styles from './style.module.css';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale, LinearScale, BarElement, BarController } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, BarController);

const Timer = () => {
  const [timer, setTimer] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [topic, setTopic] = useState('');
  const [timeEntries, setTimeEntries] = useState([]);
  const [sessionData, setSessionData] = useState({});
  const [elapsedTime, setElapsedTime] = useState(0);

  const topicInputRef = useRef(null);

  useEffect(() => {
    if (timer) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(elapsed);
        updateProgress(elapsed);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, startTime]);

  const startTimer = () => {
    if (!topic.trim()) {
      alert('Please enter a topic before starting the timer.');
      return;
    }

    setStartTime(Date.now());
    setTimer(true);
  };

  const restartTimer = () => {
    clearInterval(timer);
    setTimer(null);
    setTopic('');
    setStartTime(null);
    setElapsedTime(0);
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTimer(null);
    setStartTime(null);
  };

  const updateProgress = (elapsed) => {
    if (topic) {
      setSessionData(prevData => ({ ...prevData, [topic]: elapsed }));
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${remainingSeconds}s`;
  };

  const chartData = {
    labels: Object.keys(sessionData),
    datasets: [
      {
        label: 'Time',
        backgroundColor: 'rgba(185, 84, 247,0.2)',
        borderColor: 'rgba(185, 84, 247,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: Object.values(sessionData),
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        type: 'linear',
        ticks: {
          stepSize: 1800, // 30 minutes in seconds
          max: 8 * 3600, // 8 hours in seconds
          callback: (value) => {
            const hours = Math.floor(value / 3600);
            const minutes = Math.floor((value % 3600) / 60);
            return `${hours}h ${minutes}m`;
          },
        },
        scaleLabel: {
          display: true,
          labelString: 'Time Spent',
        },
      },
      x: {
        type: 'category',
        labels: Object.keys(sessionData),
        scaleLabel: {
          display: true,
          labelString: 'Subjects',
        },
      },
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.time}>
        {/* Display current time */}
        {formatTime(elapsedTime)}
        <br/><div className={styles.focus}>Stay Focused</div>
      </div>
      <div className={styles.flexContainer}>
        {/* Component 1: Buttons and text area */}
        <div className={styles.component1}>
          <div className={styles.buttons}>
            <button onClick={startTimer} style={{ backgroundColor: '#a44ed9', color: 'white', borderRadius: '5px', padding: '8px 16px', border: 'none' }}>Start Timer</button>
            <button onClick={restartTimer} style={{ backgroundColor: '#a44ed9', color: 'white', borderRadius: '5px', padding: '8px 16px', border: 'none' }}>Switch Subject</button>
            <button onClick={stopTimer} style={{ backgroundColor: '#a44ed9', color: 'white', borderRadius: '5px', padding: '8px 16px', border: 'none' }}>Stop Timer</button>
          </div>
          <textarea
            ref={topicInputRef}
            rows="4"
            cols="50"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter your subject/topic ..."
          />
        </div>
        
        {/* Component 2: Bar graph */}
        <div className={styles.component2}>
          <div className={styles.barGraph}>
            
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
        
        {/* Component 3: Progress so far table */}
        <div className={styles.component3}>
          <div className={styles.rectangle}>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Time Spent</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(sessionData).map(([subject, time]) => (
                  <tr key={subject}>
                    <td>{subject}</td>
                    <td>{formatTime(time)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer
