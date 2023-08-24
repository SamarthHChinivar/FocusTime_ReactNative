import React, { useState } from 'react';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { fontSizes, spacing } from '../utils/size';
import { SafeAreaView, View, Text, StyleSheet, Vibration } from 'react-native';
import { colors } from '../utils/color';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { Timing } from './Timing';

const ONE_SECOND_IN_MS = 1000;

// PATTERN = WAIT, VIBRATE
const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
];

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState();

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          /* here minutes attribute of Countdown component takes the minutes state */
          minutes={minutes}
          isPaused={!isStarted}
          /* Without Destructuring:
            onProgress = {(progress) => setProgress(progress)}*/
          onProgress={setProgress}
          onEnd={onEnd}
        />

        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        {/* here progress attribute of ProgressBar component takes the progress state */}
        <ProgressBar
          progress={progress}
          color={colors.lightBlue}
          style={{ height: spacing.sm }}
        />
      </View>

      {/* Without Destructuring: onChangeTime ={' '}
      {(minutes) => setMinutes(minutes)}*/}
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>

      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        ) : (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style={styles.clearSubjectWrapper}>
        {/* similar to onPress={(value) => clearSubject(value)} */}
        <RoundedButton size={50} title="clear" onPress={clearSubject} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearSubjectWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timingWrapper: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: spacing.xxl,
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.lightBlue,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: fontSizes.lg,
  },
  task: {
    color: colors.lightBlue,
    textAlign: 'center',
    fontSize: fontSizes.xl,
  },
});
