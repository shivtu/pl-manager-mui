import { PROJECT_STAGE, PROJECT_STATUS, PROJECT_TYPE } from './enums';

export interface IUser {
  _id: string;
  userEmail: string;
  isActive: boolean;
  userRole: string;
}

interface ICurrentOwner {
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
  projectRequirement: string[];
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

export interface IDesign {
  projectId: string;
  components: IProjectResponseData[];
  status: PROJECT_STATUS;
  createdAt: Date;
  completedAt: Date;
  currentOwner: string;
}

export interface IAppState {
  token?: string;
  projects?: IProjectResponseData[];
  designs?: IDesign[];
}

export interface IAppStateAction {
  type: string;
  payload: IAppState;
}
