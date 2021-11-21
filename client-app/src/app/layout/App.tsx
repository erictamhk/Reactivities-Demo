import React, { Fragment, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  async function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      await agent.Activities.update(activity);
    } else {
      activity.id = uuid();
      await agent.Activities.create(activity);
    }

    setSubmitting(false);
  }

  async function handleDeleteActivity(id: string) {
    setSubmitting(true);
    await agent.Activities.delete(id);
    setSubmitting(false);
  }

  if (activityStore.loadingInitial)
    return (
      <LoadingComponent
        content="loading app"
        inverted={activityStore.loadingInitial}
      />
    );

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

export default observer(App);
