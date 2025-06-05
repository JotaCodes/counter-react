import React, { useState, useEffect } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isSecondCounterActive, setIsSecondCounterActive] = useState(false);
  const [startCounting, setStartCounting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleIncrement = () => {
    if (!startCounting) {
      setStartCounting(true);
    }

    if (isPaused) {
      setCount(0);
      setSeconds(0);
      setIsPaused(false);
    }

    setCount((prev) => prev + 1);
  };

  const toggleSecondCounter = () => {
    setIsSecondCounterActive((prev) => !prev);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isSecondCounterActive && startCounting && !isPaused) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSecondCounterActive, startCounting, isPaused]);

  const isEven = count !== 0 && count % 2 === 0;

  return (
    <div style={styles.container}>
      <h1 style={{ color: isEven ? "green" : "black" }}>Contador: {count}</h1>
      <h2>Segundos: {seconds}</h2>

      <div style={styles.buttonGroup}>
        <button style={styles.fancyButton} onClick={handleIncrement}>
          Contar
        </button>
        <button onClick={toggleSecondCounter} style={styles.fancyButton}>
          {isSecondCounterActive
            ? "Desativar contador de segundos"
            : "Ativar contador de segundos"}
        </button>

 
      </div>
      {startCounting && !isPaused && (
          <div style={styles.pauseContainer}>
            <button onClick={handlePause} style={styles.redButton}>
              Parar contador
            </button>
          </div>
        )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
    textAlign: "center" as const,
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginTop: "20px",
  },
  fancyButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 25px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "6px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0,123,255,0.3)",
    transition: "background-color 0.3s ease",
  } as React.CSSProperties,
  redButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "10px 25px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "6px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(255, 0, 0, 0.3)",
    transition: "background-color 0.3s ease",
  } as React.CSSProperties,
  pauseContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "15px",
  },
};

export default Counter;
