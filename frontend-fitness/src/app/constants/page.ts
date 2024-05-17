import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';

export const dashboardRouters = [
  {
    id: 'page_home111',
    title: 'Home',
    url: '',
    icon: HomeIcon,
  },
  {
    id: 'page_schedule111',
    title: 'My Schedule',
    url: 'schedule',
    icon: CalendarMonthIcon,
  },
  {
    id: 'page_work_out_111',
    title: 'Work Out',
    url: 'work-out',
    icon: FitnessCenterIcon,
  },
  {
    id: 'page_progress_111',
    title: 'Progress',
    url: 'progress',
    icon: BarChartIcon,
  },
];

export const dashboardUserRoutes = [
  {
    id: 'page_my_profile222',
    title: 'My Profile',
    url: 'profile',
    icon: AccountBoxIcon,
  },
];

export const dashboardAdminRoutes = [
  {
    id: 'page_create_active_333',
    title: 'Create Activity',
    url: 'activity',
    icon: SportsBaseballIcon,
  },
];
