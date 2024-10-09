import { useEffect, useState } from "react";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import { Header, List } from "semantic-ui-react";

import "./App.css";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/activities")
      .then((response) => setActivities(response.data))
      .catch((err) => console.error("Err!", err));
  }, []);

  return (
    <div>
      <Header as="h2" icon="users" content="Reactivities" />
      <List>
        {activities.map((activity) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
