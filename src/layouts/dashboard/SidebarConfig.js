import React from "react";
import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import lockFill from "@iconify/icons-eva/lock-fill";
import personAddFill from "@iconify/icons-eva/person-add-fill";

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: getIcon(pieChart2Fill),
  },
  {
    title: "login",
    path: "/login",
    icon: getIcon(lockFill),
  },
  {
    title: "register",
    path: "/register",
    icon: getIcon(personAddFill),
  },
];

export default sidebarConfig;
