import React, { useEffect, useRef, useState, useContext } from "react";
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
import { AuthContext } from '@/context/AuthProvider';

export default function HomeScreen({ route, navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isAtEndOfScrolling, setIsAtEndOfScrolling] = useState(false);
  const flatListRef = useRef();
  const { user } = useContext(AuthContext);

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
            isLiked: tweet.isLikedByUser, 
            likeCount: tweet.likes.length || 0, 
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

  function isTweetLikedByUser(tweetId, tweetLikes) {
    return tweetLikes.some(tweetLike => tweetLike.user_id === user.id && tweetLike.tweet_id === tweetId)
  }

  function getAllTweets() {
    axiosConfig
      .get(`/tweets?page=${page}`)
      .then((response) => {
        const newTweets = response.data.data.map((tweet) => ({
          ...tweet,
          isLiked: isTweetLikedByUser(tweet.id, tweet.likes) || false,
          likeCount: tweet.likes.length || 0,
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
    setData((prevData) => prevData.map((tweet) => {
      if (tweet.id === tweetId) {
        
        if (tweet.isLiked) {
          disLikeTweet(tweetId);  
        } else {
          likeTweet(tweetId)
        }
  
        
        return {
          ...tweet,
          isLiked: !tweet.isLiked,
          likeCount: tweet.isLiked ? tweet.likeCount - 1 : tweet.likeCount + 1,
        };
      }
      return tweet;
    }));
    
  }
  function likeTweet(tweetId){
    axiosConfig.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user.token}`;
    axiosConfig
      .post(`/like/${user.id}/${tweetId}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function disLikeTweet(tweetId){
    axiosConfig.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user.token}`;
    axiosConfig
      .post(`/dislike/${user.id}/${tweetId}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
