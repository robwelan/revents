import Loadable from 'react-loadable';
import LoadingComponent from './LoadingComponent';

export const AsyncHomePage = Loadable({
  loader: () => import('../../features/home/HomePage'),
  loading: LoadingComponent,
});

export const AsyncNavBar = Loadable({
  loader: () => import('../../features/nav/NavBar/NavBar'),
  loading: LoadingComponent,
});

export const AsyncEventDashboard = Loadable({
  loader: () => import('../../features/events/EventDashboard/EventDashboard'),
  loading: LoadingComponent,
});

export const AsyncEventDetailedPage = Loadable({
  loader: () => import('../../features/events/EventDetailed/EventDetailedPage'),
  loading: LoadingComponent,
});

export const AsyncEventForm = Loadable({
  loader: () => import('../../features/events/EventForm/EventForm'),
  loading: LoadingComponent,
});

export const AsyncModalManager = Loadable({
  loader: () => import('../../features/modals/ModalManager'),
  loading: LoadingComponent,
});

export const AsyncPeopleDashboard = Loadable({
  loader: () => import('../../features/user/PeopleDashboard/PeopleDashboard'),
  loading: LoadingComponent,
});

export const AsyncSettingsDashboard = Loadable({
  loader: () => import('../../features/user/Settings/SettingsDashboard'),
  loading: LoadingComponent,
});

export const AsyncUserDetailedPage = Loadable({
  loader: () => import('../../features/user/UserDetailed/UserDetailedPage'),
  loading: LoadingComponent,
});

export const AsyncNotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: LoadingComponent,
});
/*
  = Loadable({
    loader: () => import(),
    loading: LoadingComponent,
  });
*/
