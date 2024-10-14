import { useEffect, useMemo, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import axios from "axios";
import { v4 as uuid } from "uuid";

import { Activity } from "../models/activity";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

import Navbar from "./Navbar";
import "./styles.css";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => setActivities(response.data))
      .catch((err) => console.error("Err!", err));
  }, []);

  const handleSelectedActivity = (activity: Activity) => {
    setSelectedActivity(activity);
  };

  const handleCancelSelectedActivity = () => setSelectedActivity(undefined);

  const handleCreateOrEditActivity = (submittedActivity: Activity) => {
    if (submittedActivity.id) {
      setActivities((prevState) => [
        ...prevState.filter((activity) => activity.id !== submittedActivity.id),
        {
          id: uuid(),
          ...submittedActivity,
        },
      ]);
    } else {
      setActivities((prevState) => [...prevState, submittedActivity]);
    }
  };

  const handleDeleteActivity = (deletedActivity: Activity) => {
    setActivities((prevState) =>
      prevState.filter((activity) => activity.id !== deletedActivity.id)
    );
    setSelectedActivity((prevState) => {
      if (prevState && prevState.id === deletedActivity.id) {
        return undefined;
      }
      return prevState;
    });
  };

  const handleFormOpen = (activity?: Activity) => {
    if (!activity) {
      handleCancelSelectedActivity();
    } else {
      handleSelectedActivity(activity);
    }
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const sortedActivities = useMemo(() => {
    return activities.sort((a, b) =>
      new Date(a.date) < new Date(b.date) ? 1 : -1
    );
  }, [activities]);

  return (
    <div style={{ paddingTop: "6rem" }}>
      <Navbar openForm={handleFormOpen} />
      <Container>
        <ActivityDashboard
          activities={sortedActivities}
          selectedActivity={selectedActivity}
          setSelectedActivity={handleSelectedActivity}
          cancelSelectedActivity={handleCancelSelectedActivity}
          handleCreateOrEditActivity={handleCreateOrEditActivity}
          handleDeleteActivity={handleDeleteActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
        />
      </Container>
    </div>
  );
}

export default App;
