import {
  CrossCircledIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";

export const roles = [
  {
    value: "USER",
    label: "USER",
    class: "text-yellow-600 bg-yellow-100",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "RECEPTIONNAIRE",
    label: "RECEPTIONNAIRE",
    class: "text-green-600 bg-green-100",
    icon: CrossCircledIcon,
  }
];