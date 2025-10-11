import Service from "@/components/pages/Service";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  // Await the params promise
  const resolvedParams = await params;
  
  return <Service serviceId={resolvedParams.serviceId} />;
}


