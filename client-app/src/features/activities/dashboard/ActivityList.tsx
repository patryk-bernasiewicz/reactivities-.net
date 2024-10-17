import { Header, Item, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Fragment } from "react/jsx-runtime";

import { useStore } from "../../../app/store/store";

import ActivityListItem from "./ActivityListItem";

const ActivityList = observer(() => {
  const { activityStore } = useStore();

  return activityStore.activitiesGroupedByDate.map((group) => (
    <Fragment key={group.date}>
      <Header sub color="teal">
        {group.date}
      </Header>
      <Segment>
        <Item.Group divided>
          {group.activities.map((activity) => (
            <ActivityListItem key={activity.id} activity={activity} />
          ))}
        </Item.Group>
      </Segment>
    </Fragment>
  ));
});

export default ActivityList;
