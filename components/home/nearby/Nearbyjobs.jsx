import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./nearbyjobs.style";
import { COLORS, icons, SIZES } from "../../../constants";
import useFetch from '../../../hooks/useFetch'
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

const Nearbyjobs = () => {
  const router = useRouter();

  const {data, isLoading, error} = useFetch("search", {query:"React Developer", num_pages: 1});

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity style={styles.headerBtn}><Text>Show all</Text></TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ):error?(
          <Text>Something went wrong</Text>
        ):(
            data.data?.map((job)=>(
              <NearbyJobCard job={job} key={job.job_id} handleNavigate={()=>router.push(`job-details/${job_id}`)} />
            ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
