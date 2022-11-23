import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import moment from "moment-timezone";

interface PropsCT {
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  upper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  button: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 999,
    elevation: 5,
  },
  buttonLabel: {
    marginTop: -2,
    fontSize: 20,
    fontWeight: "bold",
  },
  minus: { fontSize: 26 },

  day: {
    fontSize: 16,
  },
  time: {
    fontSize: 36,
  },
  a: {
    position: "absolute",
    left: "105%",
    bottom: 8,
    fontSize: 12,
  },

  resetButton: {
    alignSelf: "center",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: "white",
    borderRadius: 999,
    elevation: 10,
  },
  resetLabel: {
    fontSize: 12,
  },
});

export default function CurrentTime({ offset, setOffset }: PropsCT) {
  const momentDate = moment().add(offset, "m");
  const day = momentDate.format("ddd, D MMM");
  const time = momentDate.format("hh:mm");
  const a = momentDate.format("a");

  const changeOffset = (amount: number) => {
    // round off to :00 and :30 minutes for OCD
    const ocd = moment().add(offset, "m").minute();
    setOffset((prev) => {
      return prev + amount - (ocd % amount);
    });
  };

  const addOffset = () => changeOffset(30);
  const subtractOffset = () => changeOffset(-30);
  const resetOffset = () => setOffset(0);

  const hitSlop = { left: 20, right: 20, top: 20, bottom: 20 };

  return (
    <View style={styles.container}>
      <View style={styles.upper}>
        <TouchableOpacity style={styles.button} onPress={subtractOffset} hitSlop={hitSlop}>
          <Text style={[styles.buttonLabel, styles.minus]}>-</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.day}>{day}</Text>
          <Text style={styles.time}>{time}</Text>
          <Text style={styles.a}>{a}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={addOffset} hitSlop={hitSlop}>
          <Text style={styles.buttonLabel}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetOffset} hitSlop={hitSlop}>
        <Text style={styles.resetLabel}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}
