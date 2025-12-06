import CustomersTable from '@/app/ui/customers/table';
import { fetchFilteredCustomers, fetchCustomersPages } from '@/app/lib/data';
import Pagination from '@/app/ui/invoices/pagination';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchCustomersPages(query);
  const customers = await fetchFilteredCustomers(query, currentPage);

  return (
    <div className="w-full">
      <CustomersTable customers={customers} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
