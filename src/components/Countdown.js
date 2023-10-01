import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { fontSizes, spacing } from "../utils/size";
import { colors } from "../utils/color";

const minutesToSeconds = (min) => min * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
  const [seconds, setSeconds] = useState(minutesToSeconds(minutes));

  const reset = () => setSeconds(minutesToSeconds(minutes)); // Reset to initial value based on minutes

  useEffect(() => {
    setSeconds(minutesToSeconds(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(seconds / minutesToSeconds(minutes));
  }, [seconds]);

  useEffect(() => {
    let interval;

    if (!isPaused) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 0) {
            clearInterval(interval);
            reset(); // Reset the timer when it reaches 0
            onEnd && onEnd(); // Call the onEnd callback
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [isPaused, minutes]);

  const minute = Math.floor(seconds / 60) % 60;
  const remainingSeconds = seconds % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(remainingSeconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    color: colors.lightBlue,
    padding: spacing.lg,
    backgroundColor: "rgba(94, 132, 226, 0.3)",
  },
});
