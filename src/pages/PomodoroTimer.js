import React, { useState, useEffect, useCallback } from "react";
import focusBg from "../assets/images/focus-bg.jpg";
import breakBg from "../assets/images/break-bg.jpg";

function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);//store the remaining time
  const [isRunning, setIsRunning] = useState(false);//track if the timer is active
  const [isBreak, setIsBreak] = useState(false);//track if it's break time
  const [focusAudio] = useState(new Audio(process.env.PUBLIC_URL + "/Audio/focus.mp3"));
  const [breakAudio] = useState(new Audio(process.env.PUBLIC_URL + "/Audio/break.mp3"));

  useEffect(() => {
    focusAudio.load();
    breakAudio.load();
    focusAudio.loop = true;
    breakAudio.loop = true;

    return () => {
      focusAudio.pause();
      focusAudio.currentTime = 0;
      breakAudio.pause();
      breakAudio.currentTime = 0;
    };
  }, [focusAudio, breakAudio]);

  // ✅ Wrapped playSound in useCallback to prevent unnecessary re-renders
  const playSound = useCallback((audio) => {
    audio.currentTime = 0;
    audio.play().catch((error) => console.error("Audio playback failed:", error));
  }, []);

  // ✅ Now playSound is memoized, so switchMode won’t change every render
  const switchMode = useCallback(() => {
    if (isBreak) {
      breakAudio.pause();
      breakAudio.currentTime = 0;
      playSound(focusAudio);
      setTimeLeft(25 * 60);
    } else {
      focusAudio.pause();
      focusAudio.currentTime = 0;
      playSound(breakAudio);
      setTimeLeft(5 * 60);
    }
    setIsBreak((prev) => !prev);
  }, [isBreak, playSound, focusAudio, breakAudio]);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      switchMode();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, switchMode]);//switch between focus and break sessions

  const startTimer = () => {//start the timer
    setIsRunning(true);
    if (isBreak) {
      playSound(breakAudio);
    } else {
      playSound(focusAudio);
    }
  };

  const pauseTimer = () => {//pause the timer
    setIsRunning(false);
    focusAudio.pause();
    breakAudio.pause();
  };

  const resetTimer = () => {//reset the timer
    setIsRunning(false);
    setTimeLeft(25 * 60);
    setIsBreak(false);
    focusAudio.pause();
    focusAudio.currentTime = 0;
    breakAudio.pause();
    breakAudio.currentTime = 0;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
  };

  const progressValue = (timeLeft / (isBreak ? 5 * 60 : 25 * 60)) * 100;

  const backgroundStyle = {
    backgroundImage: `url(${isBreak ? breakBg : focusBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  };

  const buttonContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginTop: "20px",
  };

  const progressWrapperStyle = {
    width: "40%",
    margin: "20px 0",
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: "#e0e0e0",
    position: "relative",
  };

  const progressBarStyle = {
    width: "100%",
    height: "20px",
    WebkitAppearance: "none",
    appearance: "none",
    border: "none",
    backgroundColor: "transparent",
  };

  return (
    <div style={backgroundStyle}>
      <h1 style={{ color: isBreak ? "#FF5733" : "#158719" }}>
        {isBreak ? "Break Time!" : "Let's Focus!"}
      </h1>
      <h2>{formatTime(timeLeft)}</h2>

      <div style={progressWrapperStyle}>
        <progress value={progressValue} max="100" style={progressBarStyle} className="custom-progress" />
      </div>

      <div style={buttonContainer}>
        <button onClick={startTimer} disabled={isRunning}>Start</button>
        <button onClick={pauseTimer} disabled={!isRunning}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>

      <style>
        {`
          .custom-progress {
            width: 100%;
            height: 100%;
            background-color: transparent;
          }

          .custom-progress::-webkit-progress-bar {
            background-color: rgb(255, 255, 255);
            border-radius: 10px;
            height: 100%;
          }

          .custom-progress::-webkit-progress-value {
            background-color: rgb(83, 192, 86);
            border-radius: 10px;
            height: 100%;
          }
        `}
      </style>
    </div>
  );
}

export default PomodoroTimer;
