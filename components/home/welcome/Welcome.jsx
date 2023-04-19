import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

const Welcome = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.userName}>Hello Arshad</Text>
      <Text style={styles.welcomeMessage}>Find Your Perfect Job</Text>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput style={styles.searchInput} value="" onChange={()=>{}} placeholder="Search the jobs" />
        </View>
        <TouchableOpacity>
          <Image/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
