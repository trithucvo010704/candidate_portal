import { JobDetailScreen } from "@/components/portal/JobDetailScreen";

type JobDetailPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function JobDetailPage({ searchParams }: JobDetailPageProps) {
  const params = (await searchParams) ?? {};
  return (
    <JobDetailScreen
      slug={firstParam(params.slug)}
      id={firstParam(params.id)}
      sourceCode={firstParam(params.sourceCode)}
    />
  );
}
