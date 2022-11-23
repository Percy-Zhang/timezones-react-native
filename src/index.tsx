import React, { useEffect, useState } from "react";
import { StyleSheet, StatusBar, View, ScrollView, Modal, BackHandler } from "react-native";

import AddZoneScreen from "./AddZoneScreen";
import AddZoneButton from "./components/AddZoneButton";
import TimeCard from "./components/TimeCard";
import CurrentTime from "./components/CurrentTime";
import AsyncStorage from "@react-native-async-storage/async-storage";

const backgroundColor = "#eeeeee";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: backgroundColor,
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
  const [zones, setZones] = useState<string[]>([]);
  const [nicknames, setNicknames] = useState<Record<string, any>>({});
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    getSavedZones();
  }, []);

  const toggleModal = () => setModalVisible((visible) => !visible);

  const getSavedZones = async () => {
    const [stringifiedSavedZones, stringifiedSavedNicknames] = await Promise.all([
      AsyncStorage.getItem("saved_zones"),
      AsyncStorage.getItem("saved_nicknames"),
    ]);
    if (stringifiedSavedZones !== null) {
      const savedZones = JSON.parse(stringifiedSavedZones);
      setZones(savedZones);
    }
    if (stringifiedSavedNicknames !== null) {
      const savedNicknames = JSON.parse(stringifiedSavedNicknames);
      setNicknames(savedNicknames);
    }
  };

  const addZone = (zone: string, nickname?: string) => {
    setZones((oldZones) => {
      let newZones = [...oldZones];
      if (newZones.includes(zone)) return oldZones;
      newZones.push(zone);
      AsyncStorage.setItem("saved_zones", JSON.stringify(newZones));
      return newZones;
    });
    setNicknames((oldNicknames) => {
      let newNicknames = { [zone]: nickname, ...oldNicknames };
      AsyncStorage.setItem("saved_nicknames", JSON.stringify(newNicknames));
      return newNicknames;
    });
    toggleModal();
  };

  const removeZone = (zone: string) => {
    setZones((oldZones) => {
      let newZones = [...oldZones];
      if (!newZones.includes(zone)) return oldZones;
      newZones.splice(newZones.indexOf(zone), 1);
      AsyncStorage.setItem("saved_zones", JSON.stringify(newZones));
      return newZones;
    });
    setNicknames((oldNicknames) => {
      const newNicknames = { ...oldNicknames };
      delete newNicknames[zone];
      AsyncStorage.setItem("saved_nicknames", JSON.stringify(newNicknames));
      return newNicknames;
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={backgroundColor} barStyle={"dark-content"} />
      <CurrentTime offset={offset} setOffset={setOffset} />
      <ScrollView contentContainerStyle={styles.scrollView} fadingEdgeLength={100}>
        <View style={styles.cardsContainer}>
          {zones.map((zone) => (
            <TimeCard key={zone} zone={zone} offset={offset} name={nicknames[zone]} removeZone={removeZone} />
          ))}
        </View>
      </ScrollView>
      <AddZoneButton onPress={toggleModal} />
      <Modal visible={modalVisible} onRequestClose={toggleModal} transparent>
        <AddZoneScreen zones={zones} addZone={addZone} />
      </Modal>
    </View>
  );
}
