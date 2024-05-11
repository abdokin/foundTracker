import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
  } from "@radix-ui/react-icons"
  
  export const labels = [
    {
      value: "bug",
      label: "Bug",
    },
    {
      value: "feature",
      label: "Feature",
    },
    {
      value: "documentation",
      label: "Documentation",
    },
  ]
  
  export const statuses = [
    {
      value: "PENDING",
      label: "PENDING",
      icon: QuestionMarkCircledIcon,
    },
    {
      value: "REJECTED",
      label: "REJECTED",
      icon: CircleIcon,
    },
    {
      value: "APPROVED",
      label: "APPROVED",
      icon: StopwatchIcon,
    },
  ]
  
  
  