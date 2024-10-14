import { Grid } from "semantic-ui-react";

import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  setSelectedActivity: (activity: Activity) => void;
  cancelSelectedActivity: () => void;
  handleCreateOrEditActivity: (activity: Activity) => void;
  handleDeleteActivity: (activity: Activity) => void;
  editMode?: boolean;
  openForm: (activity?: Activity) => void;
  closeForm: () => void;
}

const ActivityDashboard = ({
  activities,
  selectedActivity,
  setSelectedActivity,
  cancelSelectedActivity,
  handleCreateOrEditActivity,
  handleDeleteActivity,
  editMode,
  openForm,
  closeForm,
}: Props) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          setSelectedActivity={setSelectedActivity}
          handleDeleteActivity={handleDeleteActivity}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && (
          <ActivityDetails
            activity={selectedActivity}
            onCancelActivity={cancelSelectedActivity}
            handleDeleteActivity={handleDeleteActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm
            activity={selectedActivity}
            handleCreateOrEditActivity={handleCreateOrEditActivity}
            closeForm={closeForm}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
