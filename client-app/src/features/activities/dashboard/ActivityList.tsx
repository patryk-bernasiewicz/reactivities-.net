import { Button, Item, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import { useStore } from "../../../app/store/store";

const ActivityList = observer(() => {
  const { activityStore } = useStore();

  return (
    <Segment>
      <Item.Group divided>
        {activityStore.sortedActivities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => activityStore.selectActivity(activity)}
                />
                <Button
                  floated="right"
                  content="Delete"
                  color="red"
                  onClick={() => activityStore.deleteActivity(activity)}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});

export default ActivityList;
