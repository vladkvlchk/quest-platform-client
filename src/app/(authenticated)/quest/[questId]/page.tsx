export default async function Page({
  params,
}: {
  params: Promise<{ questId: string }>;
}) {
  const { questId } = await params;
  return <div>quest: {questId}</div>;
}
