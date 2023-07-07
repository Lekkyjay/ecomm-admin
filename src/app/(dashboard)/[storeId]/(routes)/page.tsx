import prismadb from '@/lib/prismadb';

interface IProps {
  params: {
    storeId: string;
  };
};

export default async function Dashboard({ params }: IProps) {
  const store = await prismadb.store.findFirst({
    where: { id: params.storeId }
  })

  return (
    <div>
      Active store: {store?.name}
    </div>
  )
}
