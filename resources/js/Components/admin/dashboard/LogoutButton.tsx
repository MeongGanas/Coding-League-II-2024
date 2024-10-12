import { DropdownMenuItem } from "@/Components/ui/dropdown-menu";
import axios from "axios";
import toast from "react-hot-toast";

export default function LogoutButton() {
    const logout = () => {
        const promise = axios.post('/logout')

        toast.promise(promise, {
            loading: "Loading...",
            success: () => {
                window.location.replace('/login')
                return "Logout Success"
            },
            error: (err) => {
                return err?.response.data.message || "Something went wrong"
            }
        })
    }
    return (
        <DropdownMenuItem
            className="cursor-pointer"
            onClick={logout}
        >
            Logout
        </DropdownMenuItem>
    )
}