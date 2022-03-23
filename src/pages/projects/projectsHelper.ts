import { IProjectResponseData } from '../../utils/types';

export const createTableData = (
  data: IProjectResponseData[] | undefined
): (object | string[] | number[])[] => {
  if (!data) return [];
  return data.map((projects) => [
    projects.projectName,
    projects.summary,
    projects.stage,
    projects.currentOwner.userName,
  ]);
};
