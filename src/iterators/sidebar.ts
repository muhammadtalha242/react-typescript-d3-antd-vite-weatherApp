import { BsHouse, BsMap, BsFillPinMapFill, BsCalendar3 } from "react-icons/bs";

export interface ISideBarItem {
  label: string;
  key: string;
  link?: string;
  icon?: React.ReactNode;
}


export const SIDEBAR_ITEMS: ISideBarItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    // icon: BsHouse,
  },
  {
    key: "map",
    label: "Map",
    // icon: BsMap,
  },
  {
    key: "saved-locations",
    label: "Saved locations",
    // icon: BsFillPinMapFill,
  },
  {
    key: "calendar",
    label: "Calendar",
    // icon: BsCalendar3,
  },
];
