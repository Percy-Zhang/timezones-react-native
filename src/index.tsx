import React from "react";
import { StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function () {
  return (
    <View style={styles.container}>
      <Text>Timezones</Text>
    </View>
  );
}
