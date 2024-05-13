"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { Client } from '@stomp/stompjs';
import { Notification, Page } from '@/lib/types';

export function NotificationsCenter({ notifications }: { notifications: Page<Notification> }) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={'icon'} className="relative h-6 w-6 rounded-full borderd-none">
          <IoIosNotificationsOutline size={28} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] p-4" align="end" forceMount>
        <h1>Notifications</h1>
        <ul className='pt-2 text-sm'>
          {notifications.content.map((notification, index) => (
            <li className='flex gap-2 items-center' key={index}>
              <p>{notification.message} - {notification.receivedAt}</p>
              <Button size={'sm'} variant={'link'}>read</Button>
            </li>
          ))}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
