"use client"
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { Notification, Page, Pageable } from '@/lib/types';

export function NotificationsCenter({ notifications }: { notifications: Page<Notification> }) {
  const formated = (m: string) => {
    const d = new Date(m);
    return d.toLocaleTimeString();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={'icon'} className="relative h-6 w-6 rounded-full bordered-none">
          <IoIosNotificationsOutline size={28} />
          {notifications.totalElements > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 py-1/2 text-xs">
              {notifications.totalElements}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[400px] p-4" align="end" forceMount>
        <h1>Notifications</h1>
        <ul className='pt-2 text-sm flex flex-col gap-2 overflow-y-auto max-h-[400px]'>
          {notifications.content.map((notification, index) => (
            <li className='flex flex-col border rounded-md px-4' key={index}>
              <div className="flex gap-2 items-center">
                <p>{notification.message} </p>
                <Button size={'sm'} variant={'link'} className='ml-auto'>open</Button>
              </div>
              <p className='pb-1'>
                {formated(notification.receivedAt)}
              </p>
            </li>
          ))}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu >
  );
}
