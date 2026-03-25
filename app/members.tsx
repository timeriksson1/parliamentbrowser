import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Platform,
} from "react-native";
import { SearchBar } from "@rneui/themed";
import { useState, useEffect } from "react";
import "../assets/avatar.webp";

interface Member {
  id: number;
  name: string;
  image?: {
    url: string;
  };
}

async function getMembers() {
  const members = await fetch("https://api.lagtinget.ax/api/persons.json");
  return members.json();
}

export default function ModalScreen() {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMembers().then((data) => setMembers(data));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Members of Parliament</Text>
      <SearchBar
        placeholder="Search members..."
        onChangeText={(text) => setSearch(text)}
        value={search}
        platform={Platform.OS === "ios" ? "ios" : "android"}
      ></SearchBar>
      {members.length === 0 ? <Text>No members found.</Text> : null}
      <FlatList
        data={members}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.member}>
            <Image
              source={
                item.image?.url
                  ? { uri: item.image.url }
                  : require("../assets/avatar.webp")
              }
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 15,
              }}
            />
            <Text style={styles.memberName}>{item.name}</Text>
          </View>
        )}
      />

      <Link href="/" dismissTo style={styles.link}>
        <Text style={styles.link}>Back to Home</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
  },
  member: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  memberName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
