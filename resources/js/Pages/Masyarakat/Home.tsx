import LayoutMasyarakat from "@/Layouts/LayoutMasyarakat";
import { PageProps } from "@/types";

export default function Home({ auth: { user } }: PageProps) {
    return (
        <LayoutMasyarakat user={user}>
            <h1>Home</h1>
        </LayoutMasyarakat>
    )
}