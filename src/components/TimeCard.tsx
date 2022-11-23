import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import moment from "moment-timezone";

interface PropsTC {
  zone: string;
  offset: number;
  name: string;
  removeZone: (zone: string) => void;
}

// const colors = { white: "#ffffff", gray: "#cccccc", black: "#000000" };
const colors = {
  dawn: { background: "#cccccc", foreground: "#000000" },
  morning: { background: "#eeeeee", foreground: "#000000" },
  noon: { background: "#ffffff", foreground: "#000000" },
  evening: { background: "#888888", foreground: "#ffffff" },
  night: { background: "#555555", foreground: "#ffffff" },
  midnight: { background: "#000000", foreground: "#ffffff" },
};

const styles = StyleSheet.create({
  wrapper: {
    width: "50%",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  container: {
    backgroundColor: colors.morning.background,
    margin: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 5,
  },
  heading: {
    fontSize: 13,
    fontWeight: "bold",
  },
  time: {
    marginTop: 4,
    fontSize: 22,
  },
  a: {
    fontSize: 14,
  },
  subHeading: {
    fontSize: 10,
  },
});

export default function TimeCard({ zone, offset, name, removeZone }: PropsTC) {
  const momentDate = moment.tz(moment(), zone).add(offset, "m");
  const day = momentDate.format("ddd, D MMM");
  const time = momentDate.format("hh:mm");
  const a = momentDate.format("a");
  const UTC = moment.tz(zone).format("Z");

  const color = getColorBasedOnTimeOfDay(momentDate.hour());

  const nameInAlert = name === zone ? zone : `${name} (${zone})`;
  const onPress = () => {
    Alert.alert(
      "Confirm",
      `Are you sure you want to remove ${nameInAlert}?`,
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => removeZone(zone),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity style={styles.wrapper} activeOpacity={1} onPress={onPress}>
      <View style={[styles.container, { backgroundColor: color.background }]}>
        <Text style={[styles.heading, { color: color.foreground }]}>{name}</Text>
        <Text style={[styles.heading, { color: color.foreground }]}>{day}</Text>
        <Text style={[styles.time, { color: color.foreground }]}>
          {time} <Text style={styles.a}>{a}</Text>
        </Text>
        <Text style={[styles.subHeading, { color: color.foreground }]}>UTC {UTC}</Text>
      </View>
    </TouchableOpacity>
  );
}

function getColorBasedOnTimeOfDay(hour: number) {
  if (hour < 4) {
    return colors.midnight;
  } else if (hour < 6) {
    return colors.dawn;
  } else if (hour < 11) {
    return colors.morning;
  } else if (hour < 14) {
    return colors.noon;
  } else if (hour < 18) {
    return colors.evening;
  } else if (hour <= 24) {
    return colors.night;
  }

  return colors.noon;
}
