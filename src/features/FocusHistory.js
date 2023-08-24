import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '../utils/color';
import { fontSizes, spacing } from '../utils/size';

export const FocusHistory = ({ history }) => {
  if (!history || !history.length)
    return (
      <Text style={styles.beforeTitle}>Haven't focused on anything yet</Text>
    );

  const renderItem = ({ item }) => <Text style={styles.item}>- {item}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Things Focused on: </Text>
      <FlatList data={history} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    paddingLeft: spacing.lg,
    flex: 1,
  },
  beforeTitle: {
    color: colors.lightBlue,
    fontSize: fontSizes.md,
    padding: spacing.md,
    paddingLeft: spacing.lg,
    fontWeight: 'bold',
  },
  item: {
    fontSize: fontSizes.md,
    color: colors.lightBlue,
    padding: spacing.sm,
  },
  title: {
    color: colors.lightBlue,
    fontSize: fontSizes.md,
    fontWeight: 'bold',
  },
});
