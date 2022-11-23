import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface PropsAZB {
  onPress: () => void;
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 25,
    right: 20,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 999,
    elevation: 15,
  },
  icon: {
    marginTop: -3,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default function AddZoneButton({ onPress }: PropsAZB) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.icon}>ADD</Text>
    </TouchableOpacity>
  );
}
