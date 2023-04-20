import {
  Text,
  SafeAreaView,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hooks/useFetch";

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: params.id,
  });
  const tabs = ["About", "Qualification", "Responsibilities"];

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActive] = useState(tabs[0]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, []);

  const displayTabContent = () => {
    switch(activeTab){
      case "Qualification":
        return <Specifics title="Qualification" points={data.data[0].job_highlights?.Qualifications ?? ['N/A']} />
      case "About":
        return <JobAbout info={data.data[0].job_description ?? ['No data provided']} />
      case "Responsibilities":
        return <Specifics title="Responsibilities" points={data.data[0].job_highlights?.Responsibilities ?? ['N/A']} />
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: `Job Details`,
        }}
      ></Stack.Screen>
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong...</Text>
          ) : data.length === 0 ? (
            <Text>No data...</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data.data[0].employer_logo}
                jobTitle={data.data[0].job_title}
                companyName={data.data[0].employer_name}
                location={data.data[0].job_country}
              />
              <JobTabs tabs={tabs} activeTab={activeTab} setActive={setActive} />
              {displayTabContent()}
            </View>
          )}
        </ScrollView>
        <JobFooter url={data[0]?.job_google_link ?? 'https://carrers.google.com/jobs/results'} />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
