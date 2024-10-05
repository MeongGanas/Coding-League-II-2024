export default function DetailCard({
    title,
    content,
}: {
    title: string;
    content: string;
}) {
    return (
        <div className="bg-primary-bg min-w-[350px] p-6 rounded-md border-l-[5px] border-l-primary">
            <h3>{title}</h3>
            <h1 className="text-lg font-bold">{content}</h1>
        </div>
    );
}
