import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

interface PropsAZB {
  onPress: () => void;
}

const styles = StyleSheet.create({
  wrapper: {
    width: "50%",
    alignItems: "stretch",
  },
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100,
    margin: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 5,
  },
  plus: {
    marginTop: -10,
    fontWeight: "200",
    fontSize: 50,
  },
});

export default function TimeCard({ onPress }: PropsAZB) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
