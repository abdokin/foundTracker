import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { getAllUsers } from "@/lib/auth"

export async function RecentUsers() {
  const users = await getAllUsers({
    pageNumber: 0,
    pageSize: 10,
  })
  return (
    <div className="space-y-8">
      {users.content.map((user, index) => (
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src="/avatars/01.png"
              alt={user.firstname.slice(0, 2)}
            />
            <AvatarFallback>{user.firstname.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{user.firstname}  {user.lastname}</p>
            <p className="text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
          <div className="ml-auto font-medium">{new Date().toLocaleTimeString()}</div>
        </div>

      ))}
    </div>
  )
}
