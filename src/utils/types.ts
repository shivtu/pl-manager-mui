import { PROJECT_STAGE, PROJECT_STATUS, PROJECT_TYPE } from './enums';

export interface IUser {
  _id: string;
  userEmail: string;
  isActive: boolean;
  userRole: string;
}

export interface ICurrentOwner {
  userId: string;
  name: string;
  email: string;
  phoneNumber: number;
}

export interface IProjectResponseData {
  projectRequirements: string[];
  _id: string;
  projectName: string;
  summary: string;
  description: string;
  projectType: PROJECT_TYPE;
  currentOwner: ICurrentOwner;
  stage: PROJECT_STAGE;
  status: PROJECT_STATUS;
  createdAt: string;
}

export interface IProjectResponse {
  success: boolean;
  count: number;
  data: IProjectResponseData[];
}

export interface INewProjectData {
  projectRequirements: string[];
  projectName: string;
  summary: string;
  description?: string;
  projectType: PROJECT_TYPE;
  currentOwner: ICurrentOwner;
  stage: PROJECT_STAGE;
  status: PROJECT_STATUS;
}

export interface IDesign {
  projectId: string;
  components: IProjectResponseData[];
  status: PROJECT_STATUS;
  createdAt: Date;
  completedAt: Date;
  currentOwner: string;
}

export interface ILoggedInUser {
  email: string;
  isActive: boolean;
  name: string;
  phoneNumber: number;
  userId: string;
  userRole: string;
}

export interface IAppState {
  token?: string;
  loggedInUser?: ILoggedInUser;
  projects?: IProjectResponseData[];
  designs?: IDesign[];
}

export interface IAppStateAction {
  type: string;
  payload: IAppState;
}

export type ProjectType =
  | PROJECT_TYPE.EXISTING_MACHINE
  | PROJECT_TYPE.RD_NEW_MACHINE
  | PROJECT_TYPE.OTHERS;
