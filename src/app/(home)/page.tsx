import { HomeView } from '@/modules/home/ui/views/home-views';
import { HydrateClient, trpc } from '@/trpc/server';

export const dynamic = 'force-dynamic'; // 정적인 페이지 prefetch가 처리하는 부분은 무조건

interface PageProps {
  searchParams: Promise<{ categoryId?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { categoryId } = await searchParams;
  void trpc.categories.getMany.prefetch();
  return (
    <HydrateClient>
      <HomeView categoryId={categoryId} />
    </HydrateClient>
  );
}
