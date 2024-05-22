"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Notification, Page, Pageable } from '@/lib/types';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { openNotification } from "@/lib/notifications"

export default function NotificationsList({ notifications }: { notifications: Page<Notification> }) {
  const notificationCount = notifications.content.filter((it) => !it.opened).length;
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button size={'icon'} className="relative h-6 w-6 rounded-full bordered-none">
          <IoIosNotificationsOutline size={28} />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 py-1/2 text-xs">
              {notificationCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[400px] p-4 text-xs" align="end" forceMount>
        <Card className="shadow-none border-0">
          <CardHeader className=" p-0">
            <div className="flex items-center justify-between py-4 ">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <div>
                <Button size="icon" variant='link'>
                  <span className="sr-only">Mark all as read</span>
                  <CheckIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-0 flex flex-col gap-4 overflow-y-auto max-h-[400px]  ">


            {notifications.content.map((notification, index) => (
              <div className="flex items-start gap-4 border px-4 py-2" key={index}>
                {/* <Avatar>
                  <AvatarImage alt="@jaredpalmer" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar> */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{notification.sujet}</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(notification.receivedAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{notification.message}</p>
                  {!notification.opened && <Button size={'sm'} variant={'link'} className='ml-auto' onClick={async () => await openNotification(notification.id)}>read</Button>}

                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function BellIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}


function CheckIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}