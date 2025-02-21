import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
  Pressable,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";

import axiosConfig from "../helpers/axiosConfig";
import { format } from "date-fns";
import { AuthContext } from "@/context/AuthProvider";

export default function TweetScreen({ route, navigation }) {
  const { user } = useContext(AuthContext);
  const [tweet, setTweet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    getTweet();
  }, []);

  function getTweet() {
    axiosConfig
      .get(`/tweets/${route.params.tweetId}`)
      .then((response) => {
        const tweetData = response.data;
        setTweet(tweetData);
        setLikeCount(tweetData.likes.length || 0);
        setIsLiked(tweetData.isLikedByUser || false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  function gotoProfile(userId) {
    navigation.navigate("Profile Screen", { userId });
  }

  function toggleLike() {
    if (isLiked) {
      disLikeTweet(tweet.id);
    } else {
      likeTweet(tweet.id);
    }

    
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  }

  function likeTweet(tweetId) {
    axiosConfig.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    axiosConfig
      .post(`/like/${user.id}/${tweetId}`)
      .then((response) => console.log("Liked tweet", response.data))
      .catch((error) => console.log("Error liking tweet", error));
  }
  
  function disLikeTweet(tweetId) {
    axiosConfig.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    axiosConfig
      .post(`/dislike/${user.id}/${tweetId}`)
      .then((response) => console.log("Unliked tweet", response.data))
      .catch((error) => console.log("Error unliking tweet", error));
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 8 }} size="large" color="gray" />
      ) : (
        <>
          <View style={styles.ProfileContainer}>
            <TouchableOpacity
              style={styles.flexRow}
              onPress={() => gotoProfile(tweet.user.id)}
            >
              <Image style={styles.avatar} source={{ uri: tweet.user.avatar }} />
              <View>
                <Text style={styles.tweetName}>{tweet.user.name}</Text>
                <Text style={styles.tweetHandle}>@{tweet.user.username}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="dots-three-vertical" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <View style={styles.tweetContentContainer}>
            <Text style={styles.tweetContent}>{tweet.body}</Text>
            <View style={styles.tweetTimestampContainer}>
              <Text style={styles.tweetTimestampText}>
                {format(new Date(tweet.created_at), "h:mm a")}
              </Text>
              <Text style={styles.tweetTimestampText}>&middot;</Text>
              <Text style={styles.tweetTimestampText}>
                {format(new Date(tweet.created_at), "d MMM.yy")}
              </Text>
              <Text style={styles.tweetTimestampText}>&middot;</Text>
              <Text style={[styles.tweetTimestampText, styles.linkColor]}>
                Twitter for iPhone
              </Text>
            </View>
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
              <Text style={styles.tweetEngagementNumber}>{likeCount}</Text>
              <Text style={styles.tweetEngagementLabel}>Likes</Text>
            </View>
          </View>

          <View style={[styles.tweetEngagement, styles.spaceAround]}>
            <Pressable>
              <EvilIcons name="comment" size={32} color="gray" />
            </Pressable>
            <Pressable>
              <EvilIcons name="retweet" size={32} color="gray" />
            </Pressable>
            <Pressable onPress={toggleLike}>
              <EvilIcons name="heart" size={32} color={isLiked ? "red" : "gray"} />
            </Pressable>
            <Pressable>
              <EvilIcons
                name={Platform.OS === "ios" ? "share-apple" : "share-google"}
                size={32}
                color="gray"
              />
            </Pressable>
          </View>
        </>
      )}
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
  flexRow: { flexDirection: "row" },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 8,
    borderRadius: 25,
  },
  tweetName: { fontWeight: "bold", color: "#222222" },
  tweetHandle: { color: "gray", marginTop: 4 },
  tweetContentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tweetContent: { fontSize: 20, lineHeight: 30 },
  tweetEngagement: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tweetEngagementNumber: { fontWeight: "bold" },
  tweetEngagementLabel: { color: "gray", marginLeft: 6 },
  tweetTimestampContainer: { flexDirection: "row", marginTop: 12 },
  tweetTimestampText: { color: "gray", marginRight: 6 },
  linkColor: { color: "#1d9bf1" },
  ml4: { marginLeft: 16 },
  spaceAround: { justifyContent: "space-around" },
});
