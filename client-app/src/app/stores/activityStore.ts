import { v4 as uuid } from "uuid";
import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore {
  activities: Activity[] = [];
  selectedActivity: Activity | undefined = undefined;
  editMode: boolean = false;
  loading: boolean = false;
  loadingInitial: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadActivities = async () => {
    this.setLoadingInitial(true);
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        this.activities.push(activity);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find((x) => x.id === id);
  };

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  setLoading = (state: boolean) => {
    this.loading = state;
  };

  addActivityToList = (activity: Activity) => {
    this.activities.push(activity);
  };

  updateActivityToList = (activity: Activity) => {
    this.activities = [
      ...this.activities.filter((x) => x.id !== activity.id),
      activity,
    ];
  };

  createActivity = async (activity: Activity) => {
    this.setLoading(true);
    try {
      activity.id = uuid();
      await agent.Activities.create(activity);
      this.addActivityToList(activity);
      this.selectActivity(activity.id);
      this.closeForm();
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  updateActivity = async (activity: Activity) => {
    this.setLoading(true);
    try {
      await agent.Activities.update(activity);
      this.updateActivityToList(activity);
      this.selectActivity(activity.id);
      this.closeForm();
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };
}
