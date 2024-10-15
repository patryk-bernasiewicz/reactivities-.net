import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import "semantic-ui-css/semantic.min.css";

import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useStore } from "../store/store";

import Navbar from "./Navbar";
import AppLoader from "./AppLoader";
import "./styles.css";

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <AppLoader content="Loading app" />;
  }

  return (
    <div style={{ paddingTop: "6rem" }}>
      <Navbar />
      <Container>
        <ActivityDashboard />
      </Container>
    </div>
  );
}

const ObservedApp = observer(App);

export default ObservedApp;
