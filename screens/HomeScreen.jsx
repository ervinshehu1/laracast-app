import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

import AntDesign from "@expo/vector-icons/AntDesign";
import axiosConfig from "../helpers/axiosConfig";

import RenderItem from "../components/Renderitem";

export default function HomeScreen({ route, navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isAtEndOfScrolling, setIsAtEndOfScrolling] = useState(false);
  const flatListRef = useRef();

  useEffect(() => {
    getAllTweets();
  }, [page]);

  useEffect(() => {
    if (route.params?.newTweetAdded) {
      getAllTweetsRefresh();
      flatListRef.current.scrollToOffset({
        offset: 0,
      });
    }
  }, [route.params?.newTweetAdded]);

  function getAllTweetsRefresh() {
    setPage(1);
    setIsLoading(false);
    setIsRefreshing(false);

    axiosConfig
      .get(`/tweets`)
      .then((response) => {
        setData(
          response.data.data.map((tweet) => ({
            ...tweet,
            isLiked: false, 
            likeCount: tweet.likeCount || 0, 
          }))
        );
        setIsLoading(false);
        setIsRefreshing(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setIsRefreshing(false);
      });
  }

  function getAllTweets() {
    axiosConfig
      .get(`/tweets?page=${page}`)
      .then((response) => {
        const newTweets = response.data.data.map((tweet) => ({
          ...tweet,
          isLiked: tweet.isLiked || false,
          likeCount: tweet.likeCount || 0,
        }));

        if (page == 1) {
          setData(newTweets);
        } else {
          setData([...data, ...newTweets]);
        }

        if (!response.data.next_page_url) {
          setIsAtEndOfScrolling(true);
        }

        setIsLoading(false);
        setIsRefreshing(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setIsRefreshing(false);
      });
  }

  function handleRefresh() {
    setPage(1);
    setIsAtEndOfScrolling(false);
    setIsRefreshing(true);
    getAllTweets();
  }

  function handleEnd() {
    setPage(page + 1);
  }

  function gotoNewTweet() {
    navigation.navigate("NewTweet");
  }


  function toggleLike(tweetId) {
    setData((prevData) =>
      prevData.map((tweet) =>
        tweet.id === tweetId
          ? {
              ...tweet,
              isLiked: !tweet.isLiked,
              likeCount: tweet.isLiked ? tweet.likeCount - 1 : tweet.likeCount + 1,
            }
          : tweet
      )
    );
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 8 }} size="large" color="gray" />
      ) : (
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={({ item }) => <RenderItem item={item} toggleLike={toggleLike} />}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.tweetSeperator}></View>}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          onEndReached={handleEnd}
          onEndReachedThreshold={0}
          ListFooterComponent={() =>
            !isAtEndOfScrolling && <ActivityIndicator size="large" color="gray" />
          }
        />
      )}
      <TouchableOpacity style={styles.floatingButton} onPress={gotoNewTweet}>
        <AntDesign name="plus" size={26} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  tweetSeperator: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d9bf1",
    position: "absolute",
    bottom: 20,
    right: 12,
  },
});
