// TODO: buat websocket untuk notifikasi

import { Bell, X } from "lucide-react";
import { Badge } from "../ui/badge";
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover";
import { Button } from "../ui/button";
import { Link } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Notifikasi({ notifications, user }: { notifications: any[], user: any }) {

    const [localNotification, setLocalNotification] = useState<any[]>(notifications);
    const [notifOpenCount, setNotifOpenCount] = useState(0);
    const [unreadCount, setUnreadCount] = useState(notifications.filter((notification) => !notification.read_at).length);


    const markAsRead = async () => {
        if (notifOpenCount % 2 === 0) {
            const { data } = await axios.get('/notifications');
            setLocalNotification(data.notifications);
            await axios.post('/notifications/read');
        } else {
            setUnreadCount(0);
            setLocalNotification(localNotification.map((notification) => {
                return {
                    ...notification,
                    read_at: new Date().toISOString()
                }
            }));
        }
        setNotifOpenCount(notifOpenCount + 1);
    }

    return (
        <Popover>
            <PopoverTrigger asChild >
                <div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full relative"
                        onClick={markAsRead}
                    >
                        <Bell className="h-6 w-6" />
                        {unreadCount > 0 && (
                            <Badge className={`w-6 -right-2 absolute top-0 aspect-square bg-[#98100A] flex hover:bg-red-700 items-center justify-center ${unreadCount === 0 ? '' : notifOpenCount > 0 ? '' : 'pulse'}`}>
                                {unreadCount}
                            </Badge>
                        )}
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] space-y-4 md:w-[500px] mr-5 max-h-[89vh] overflow-y-scroll">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-neutral-600 text-lg">
                        Notifikasi
                    </h1>
                    <PopoverClose>
                        <Button size={"icon"} variant={"ghost"}>
                            <X className="w-5 h-5" />
                        </Button>
                    </PopoverClose>
                </div>
                <div className="space-y-3 ">
                    {
                        localNotification.map((notification: any) => (
                            <ItemNotifikasi key={notification.id} notification={notification} />
                        ))
                    }
                </div>
            </PopoverContent>
        </Popover>
    );
}

const statusClass: any = {
    info: "bg-[#EFF8FF] text-[#175CD3] text-[12px] hover:bg-[#EFF6FF] ",
    success: "bg-success-bg text-success text-[12px] hover:bg-success-bg ",
    warning: "bg-warning-bg text-warning text-[12px] hover:bg-warning-bg",
    error: "bg-error-bg text-error text-[12px] hover:bg-error-bg",
}

function ItemNotifikasi({ notification }: { notification: any }) {
    return (
        <>
            {
                notification.data.action_url ? (
                    <Link
                        href={notification.data.action_url}
                        className={`
                            hover:shadow-md
                            transition-all
                            duration-200
                            flex flex-col gap-1 rounded-md ${!notification.read_at ? "bg-[#FFF1F0]" : "bg-white"
                            } border p-4`}>
                        <ItemNotifikasiContent notification={notification} />
                    </Link>
                ) : (
                    <div className={`flex flex-col gap-1 rounded-md ${!notification.read_at ? "bg-[#FFF1F0]" : "bg-white"
                        } border p-4`}>
                        <ItemNotifikasiContent notification={notification} />
                    </div>
                )
            }
        </>
    );
}

function ItemNotifikasiContent({ notification }: { notification: any }) {
    return (
        <>
            <div>
                <Badge className={statusClass[notification.data.severity]}>
                    {notification.data.badgeTitle}
                </Badge>
                {
                    !notification.data.action_url && (
                        <Badge className="bg-[#ffffff] hover:bg-[#ffffff] text-neutral-500 text-[12px] ml-1">
                            readonly
                        </Badge>
                    )
                }
            </div>

            <div>
                <h1 className="font-bold">
                    {notification.data.title}
                </h1>
                <p className="text-neutral-600 text-ellipsis">
                    {notification.data.body || ''}
                </p>
            </div>
        </>
    );
}
