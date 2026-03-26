import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { useEffect, useState } from "react";
import { Divider } from "@rneui/themed";

const getMemberDetails = async (id: string) => {
  const response = await fetch(
    `https://api.lagtinget.ax/api/persons/${id}.json`,
  );
  return response.json();
};

interface Member {
  id: number;
  name: string;
  image?: {
    url: string;
  };
  birthday?: string;
  email?: string;
  phone?: string;
}

export default function SpecificMemberScreen() {
  const { id } = useLocalSearchParams();
  const [member, setMember] = useState<Member | null>(null);
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    if (id) {
      getMemberDetails(Array.isArray(id) ? id[0] : id).then(setMember);
    }
  }, [id]);

  const onPicturePress = () => {
    setIsLarge(!isLarge);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{member?.name}</Text>
      <TouchableOpacity onPress={onPicturePress}>
        <Image
          source={
            member?.image?.url
              ? { uri: member.image.url }
              : require("../assets/avatar.webp")
          }
          style={[
            styles.image,
            isLarge ? { width: 300, height: 300 } : { width: 100, height: 100 },
          ]}
        />
      </TouchableOpacity>
      <Divider style={{ marginVertical: 20, width: "80%" }} />
      {member?.birthday ? (
        <Text>Birthday: {member.birthday}</Text>
      ) : (
        <Text>Birthday: Not available</Text>
      )}
      <Divider style={{ marginVertical: 20, width: "80%" }} />
      {member?.email ? (
        <Text>Email: {member.email}</Text>
      ) : (
        <Text>Email: Not available</Text>
      )}
      <Divider style={{ marginVertical: 20, width: "80%" }} />
      {member?.phone ? (
        <Text>Phone: {member.phone}</Text>
      ) : (
        <Text>Phone: Not available</Text>
      )}
      <Divider style={{ marginVertical: 20, width: "80%" }} />
      <Link href="/members" dismissTo style={styles.link}>
        <Text style={styles.link}>Back to Members</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    marginTop: 40,
    fontWeight: "bold",
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
  image: {
    borderRadius: 10,
  },
});
