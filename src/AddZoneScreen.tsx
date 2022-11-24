import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, StatusBar, View, FlatList, Text, TouchableOpacity, TextInput, ListRenderItem } from "react-native";
import moment from "moment-timezone";

interface PropsAZS {
  zones: string[];
  addZone: (zone: string, nickname: string) => void;
}

interface PropsCO {
  city: string;
  setZone: React.Dispatch<React.SetStateAction<string>>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
  filterInput: {
    margin: 20,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  flatList: {
    backgroundColor: "white",
  },
  itemSeparator: {
    borderBottomWidth: 1,
    borderColor: "#dddddd",
    borderStyle: "dotted",
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  bold: {
    fontWeight: "bold",
  },

  modalWrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 999,
  },
  dialogBox: {
    backgroundColor: "white",
    alignSelf: "stretch",
    marginHorizontal: 20,
    padding: 20,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: "#eeeeee",
    borderRadius: 20,
    elevation: 25,
  },
  dialogTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  nicknameInput: {
    borderRadius: 5,
    padding: 0,
    paddingBottom: 2,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    backgroundColor: "white",
  },
  button: {
    textAlign: "right",
    marginTop: 15,
    fontWeight: "bold",
  },
});

const names = moment.tz.names();

export default function AddZoneScreen({ zones, addZone }: PropsAZS) {
  const filterRef = useRef<TextInput>(null);
  const nicknameRef = useRef<TextInput>(null);
  const [filter, setFilter] = useState("");
  const [zone, setZone] = useState("");
  const [nickname, setNickname] = useState("");
  const unselectedNames = names.filter((name) => !zones.includes(name));
  const filteredNames = unselectedNames.filter((name) => {
    const nameLower = name.toLowerCase();
    const filterLower = filter.toLowerCase();
    const UTC = moment.tz(name).format("Z");
    return nameLower.includes(filterLower) || UTC.includes(filterLower);
  });

  useEffect(() => {
    setTimeout(() => filterRef !== null && filterRef.current?.focus(), 100);
  }, [filterRef]);

  useEffect(() => {
    setTimeout(() => zone !== "" && nicknameRef.current?.focus(), 100);
    setNickname(zone);
  }, [zone]);

  const onSubmit = () => {
    addZone(zone, nickname);
  };

  const renderItem: ListRenderItem<string> = ({ item }) => <CityOption city={item} setZone={setZone} />;

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <TextInput
        ref={filterRef}
        style={styles.filterInput}
        value={filter}
        onChangeText={setFilter}
        placeholder="Filter..."
      />
      <FlatList
        data={filteredNames}
        renderItem={renderItem}
        contentContainerStyle={styles.flatList}
        ItemSeparatorComponent={ItemSeparatorComponent}
        keyboardShouldPersistTaps={"always"}
      />
      {zone !== "" && (
        <View style={styles.modalWrapper}>
          <View style={styles.dialogBox}>
            <Text style={styles.dialogTitle}>Name</Text>
            <TextInput
              ref={nicknameRef}
              style={styles.nicknameInput}
              value={nickname}
              onChangeText={setNickname}
              selectTextOnFocus
              placeholder={"Name"}
            />
            <TouchableOpacity onPress={onSubmit}>
              <Text style={styles.button}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const CityOption = React.memo(({ city, setZone }: PropsCO) => {
  const UTC = moment.tz(city).format("Z");
  const select = () => setZone(city);

  return (
    <TouchableOpacity style={styles.option} onPress={select}>
      <Text>
        <Text style={styles.bold}>{city}</Text> (UTC {UTC})
      </Text>
    </TouchableOpacity>
  );
});

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;
