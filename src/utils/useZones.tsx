import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useZones(toggleModal: () => void) {
  const [zones, setZones] = useState<string[]>([]);
  const [nicknames, setNicknames] = useState<Record<string, any>>({});

  useEffect(() => {
    getSavedZones();
  }, []);

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

  return {
    zones,
    nicknames,
    addZone,
    removeZone,
  };
}
