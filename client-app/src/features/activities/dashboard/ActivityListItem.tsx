import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

function ActivityListItem({ activity }: { activity: Activity }) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item key={activity.id}>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>Hosted By Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {activity.date}
          <Icon name="marker" /> {activity.venue}
        </span>
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          floated="right"
          content="View"
          color="teal"
        />
      </Segment>
    </Segment.Group>
  );
}
export default ActivityListItem;
