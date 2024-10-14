import { useEffect, useMemo, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Loader } from "semantic-ui-react";
import { v4 as uuid } from "uuid";

import { Activity } from "../models/activity";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

import Navbar from "./Navbar";
import "./styles.css";
import agent from "../api/agent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list()
      .then((data) => setActivities(data))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectedActivity = (activity: Activity) => {
    setSelectedActivity(activity);
  };

  const handleCancelSelectedActivity = () => setSelectedActivity(undefined);

  const handleCreateOrEditActivity = (submittedActivity: Activity) => {
    setSubmitting(true);
    if (submittedActivity.id) {
      agent.Activities.update(submittedActivity)
        .then(() => {
          setActivities((prevState) => [
            ...prevState.filter(
              (activity) => activity.id !== submittedActivity.id
            ),
            submittedActivity,
          ]);
          setSelectedActivity(submittedActivity);
        })
        .catch((err) => console.error("[UPDATE] Error! ", err))
        .finally(() => {
          setTimeout(() => {
            setSubmitting(false);
            setEditMode(false);
          }, 2500);
        });
    } else {
      agent.Activities.create(submittedActivity)
        .then(() => {
          setActivities((prevState) => [
            ...prevState,
            { ...submittedActivity, id: uuid() },
          ]);
        })
        .catch((err) => console.error("[CREATE] Error! ", err))
        .finally(() => {
          setSubmitting(false);
          setEditMode(false);
        });
    }
  };

  const handleDeleteActivity = (deletedActivity: Activity) => {
    if (!deletedActivity.id) {
      return;
    }

    setSubmitting(true);
    agent.Activities.delete(deletedActivity.id)
      .then(() => {
        setActivities((prevState) =>
          prevState.filter((activity) => activity.id !== deletedActivity.id)
        );
        if (selectedActivity && selectedActivity.id === deletedActivity.id) {
          setSelectedActivity(undefined);
          setEditMode(false);
        }
      })
      .catch((err) => console.error("[DELETE] Error!", err))
      .finally(() => setSubmitting(false));
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

  if (loading) {
    return <Loader content="Loading app" />;
  }

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
          isSubmitting={submitting}
        />
      </Container>
    </div>
  );
}

export default App;
