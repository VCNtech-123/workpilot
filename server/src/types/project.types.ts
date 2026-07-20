export type ProjectStatus =
  | "active"
  | "completed"
  | "paused";

export type UpdatableProjectFields =
  | "name"
  | "description"
  | "status"
  | "deadline"
  | "budget"
  | "client";