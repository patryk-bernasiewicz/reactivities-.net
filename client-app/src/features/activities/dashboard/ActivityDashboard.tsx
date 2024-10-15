import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/store/store";

const ActivityDashboard = observer(() => {
  const { activityStore } = useStore();

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        {activityStore.selectedActivity && <ActivityDetails />}
        {activityStore.editMode && <ActivityForm />}
      </Grid.Column>
    </Grid>
  );
});

export default ActivityDashboard;
