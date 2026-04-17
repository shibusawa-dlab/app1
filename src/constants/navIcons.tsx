import type { ComponentType, SVGProps } from 'react';
import {
  FiBookOpen,
  FiSearch,
  FiCalendar,
  FiUsers,
  FiShare2,
  FiMap,
  FiBarChart2,
  FiDatabase,
  FiInfo,
  FiBell,
  FiFileText,
} from 'react-icons/fi';
import type { NavKey } from './site';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const NAV_ICONS: Record<NavKey, IconComponent> = {
  about: FiInfo,
  fulltext: FiFileText,
  fulltextSearch: FiSearch,
  ad: FiBookOpen,
  calendar: FiCalendar,
  personPlace: FiUsers,
  network: FiShare2,
  map: FiMap,
  ngram: FiBarChart2,
  dataset: FiDatabase,
  news: FiBell,
};
