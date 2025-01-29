import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, Platform } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export default function TweetScreen({navigation}) {
  function gotoProfile() {
    navigation.navigate("Profile Screen");
  }
  return (
    <View style={styles.container}>
      <View style={styles.ProfileContainer}>
        <TouchableOpacity style={styles.flexRow} onPress={() => gotoProfile()}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://reactjs.org/logo-og.png",
            }}
          />
          <View>
            <Text style={styles.tweetName}>Andre Madarang</Text>
            <Text style={styles.tweetHandle}>@drehimself</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.tweetContentContainer}>
        <Text style={styles.tweetContent}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae minus
          dignissimos, iusto nisi sequi quis impedit sunt aliquid voluptatem
          ipsum velit dolorum, odit consequatur iste eius numquam, deleniti
          excepturi? Similique reiciendis odio dignissimos dolore eveniet
          tempore officia delectus qui! Magni?
        </Text>
      </View>
      <View style={styles.tweetEngagement}>
        <View style={styles.flexRow}>
          <Text style={styles.tweetEngagementNumber}>628</Text>
          <Text style={styles.tweetEngagementLabel}>Retweets</Text>
        </View>
        <View style={[styles.flexRow, styles.ml4]}>
          <Text style={styles.tweetEngagementNumber}>38</Text>
          <Text style={styles.tweetEngagementLabel}>Quote Tweets</Text>
        </View>
        <View style={[styles.flexRow, styles.ml4]}>
          <Text style={styles.tweetEngagementNumber}>2,934</Text>
          <Text style={styles.tweetEngagementLabel}>Likes</Text>
        </View>
    </View>

    <View style={[styles.tweetEngagement, styles.spaceAround]}>
    <TouchableOpacity>
            <EvilIcons
              name="comment"
              size={32}
              color="gray"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <EvilIcons
              name="retweet"
              size={32}
              color="gray"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <EvilIcons
              name="heart"
              size={32}
              color="gray"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <EvilIcons
              name={Platform.OS == "ios" ? "share-apple" : "share-google"}
              size={32}
              color="gray"
            />
          </TouchableOpacity>
    </View>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  ProfileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  flexRow: {
    flexDirection: "row",
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 8,
    borderRadius: 25,
  },
  tweetName: {
    fontWeight: "bold",
    color: "#222222",
  },
  tweetHandle: {
    color: "gray",
    marginTop: 4,
  },
  tweetContentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tweetContent: {
    fontSize: 20,
    lineHeight: 30,
  },
  tweetEngagement: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tweetEngagementNumber: {
    fontWeight: 'bold',
  },
  tweetEngagementLabel: {
    color: 'gray',
    marginLeft: 6,
  },
  ml4: {
    marginLeft: 16,
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
});
