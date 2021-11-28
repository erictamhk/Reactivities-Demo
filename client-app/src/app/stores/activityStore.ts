import { v4 as uuid } from "uuid";
import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode: boolean = false;
  loading: boolean = false;
  loadingInitial: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  loadActivities = async () => {
    this.setLoadingInitial(true);
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        this.setActivity(activity);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoadingInitial(false);
    }
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectActivity(id);
    } else {
      this.setLoadingInitial(true);
      try {
        activity = await agent.Activities.details(id);
        this.setActivity(activity);
        this.selectActivity(id);
      } catch (error) {
        console.log(error);
      } finally {
        this.setLoadingInitial(false);
      }
    }
    return activity;
  };

  private setActivity = (activity: Activity) => {
    activity.date = activity.date.split("T")[0];
    this.activityRegistry.set(activity.id, activity);
  };

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
  };

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  setLoading = (state: boolean) => {
    this.loading = state;
  };

  updateActivityToList = (activity: Activity) => {
    this.activityRegistry.set(activity.id, activity);
  };

  deleteActivityToList = (id: string) => {
    this.activityRegistry.delete(id);
    if (this.selectedActivity?.id === id) {
      this.cancelSelectedActivity();
    }
  };

  createActivity = async (activity: Activity) => {
    this.setLoading(true);
    try {
      activity.id = uuid();
      await agent.Activities.create(activity);
      this.updateActivityToList(activity);
      this.selectActivity(activity.id);
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
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  deleteActivity = async (id: string) => {
    this.setLoading(true);
    try {
      await agent.Activities.delete(id);
      this.deleteActivityToList(id);
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };
}
