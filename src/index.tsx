import React, { useState } from "react";
import { StyleSheet, StatusBar, View, ScrollView, Modal, Text } from "react-native";

import AddZoneScreen from "./AddZoneScreen";
import AddZoneButton from "./components/AddZoneButton";
import TimeCard from "./components/TimeCard";
import CurrentTime from "./components/CurrentTime";
import useZones from "./utils/useZones";

const backgroundColor = "#eeeeee";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: backgroundColor,
  },
  title: {
    textAlign: "center",
    color: "#cccccc",
    fontSize: 10,
  },
  scrollView: {
    paddingBottom: 100,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [offset, setOffset] = useState<number>(0);

  const toggleModal = () => setModalVisible((visible) => !visible);

  const { zones, nicknames, addZone, removeZone } = useZones(toggleModal);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={backgroundColor} barStyle={"dark-content"} />
      <Text style={styles.title}>Made by Percy</Text>
      <ScrollView contentContainerStyle={styles.scrollView} fadingEdgeLength={100}>
        <View style={styles.cardsContainer}>
          {zones.map((zone) => (
            <TimeCard key={zone} zone={zone} offset={offset} name={nicknames[zone]} removeZone={removeZone} />
          ))}
          <AddZoneButton onPress={toggleModal} />
        </View>
      </ScrollView>
      <CurrentTime offset={offset} setOffset={setOffset} />
      <Modal visible={modalVisible} onRequestClose={toggleModal} transparent>
        <AddZoneScreen zones={zones} addZone={addZone} />
      </Modal>
    </View>
  );
}
