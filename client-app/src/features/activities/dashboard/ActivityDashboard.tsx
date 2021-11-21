import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../forms/ActivityForm";
import ActivityList from "./ActivityList";

function ActivityDashboard({
  deleteActivity,
  submitting,
}: {
  deleteActivity: (id: string) => void;
  submitting: boolean;
}) {
  const { activityStore } = useStore();
  const { editMode, selectedActivity } = activityStore;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList deleteActivity={deleteActivity} submitting={submitting} />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && <ActivityForm />}
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDashboard);
