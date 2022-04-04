import AnalyticsPage from './analytics/AnalyticsPage';
import PendingDesignsPage from './designs/PendingDesignsPage';
import CreateNewProjectPage from './projects/CreateNewProjectPage';
import CurrentProjectsPage from './projects/CurrentProjectsPage';

interface IRoutes {
  path: string;
  element: JSX.Element;
  allowedRoles: string[];
}

export const routes: IRoutes[] = [
  {
    path: '/analytics',
    element: <AnalyticsPage />,
    allowedRoles: ['admin'],
  },
  {
    path: '/projects',
    element: <CurrentProjectsPage />,
    allowedRoles: ['admin'],
  },
  {
    path: '/new-project',
    element: <CreateNewProjectPage />,
    allowedRoles: ['admin'],
  },
  {
    path: '/pending-designs',
    element: <PendingDesignsPage />,
    allowedRoles: ['admin'],
  },
];
