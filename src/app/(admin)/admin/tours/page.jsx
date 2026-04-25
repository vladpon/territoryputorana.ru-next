import AdminShell from "@/components/admin/AdminShell/AdminShell";
import AdminPageHeader from "@/components/admin/AdminPageHeader/AdminPageHeader";
import AdminToursTable from "@/components/admin/AdminToursTable/AdminToursTable";
import { getTourPages } from "@/lib/mongo/tourPages";

export default async function AdminToursPage() {
  const pages = await getTourPages();

  return (
    <AdminShell>
      <AdminPageHeader
        title="Туры"
        subtitle="Управление страницами туров"
      />
      <AdminToursTable pages={pages} />
    </AdminShell>
  );
}