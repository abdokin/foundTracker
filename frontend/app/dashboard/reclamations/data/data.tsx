import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const statuses = [
  {
    value: "PENDING",
    label: "PENDING",
    class: "text-yellow-600 bg-yellow-100",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "REJECTED",
    label: "REJECTED",
    class: "text-red-600 bg-red-100",
    icon: CrossCircledIcon,
  },
  {
    value: "APPROVED",
    label: "APPROVED",
    class: "text-green-600 bg-green-100",
    icon: CheckCircledIcon,
  },
];