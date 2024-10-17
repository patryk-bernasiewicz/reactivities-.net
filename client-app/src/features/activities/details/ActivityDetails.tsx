import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import { useStore } from "../../../app/store/store";
import AppLoader from "../../../app/layout/AppLoader";

import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

const ActivityDetails = observer(() => {
  const { id = "" } = useParams();
  const { activityStore } = useStore();
  const { selectedActivity, loadSingleActivity } = activityStore;

  useEffect(() => {
    loadSingleActivity(id);
  }, [id, loadSingleActivity]);

  if (!selectedActivity) {
    return <AppLoader />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={selectedActivity} />
        <ActivityDetailedInfo activity={selectedActivity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
});

export default ActivityDetails;
