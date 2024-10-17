import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import ActivityList from "./ActivityList";

import { useStore } from "../../../app/store/store";
import AppLoader from "../../../app/layout/AppLoader";
import { Grid } from "semantic-ui-react";
import ActivityFilters from "./ActivityFilters";

const ActivityDashboard = observer(() => {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <AppLoader content="Loading app" />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
});

export default ActivityDashboard;
