import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell/AdminShell";
import AdminPageHeader from "@/components/admin/AdminPageHeader/AdminPageHeader";
import AdminTourPageForm from "@/components/admin/AdminTourPageForm/AdminTourPageForm";
import { getTourPage } from "@/lib/mongo/tourPages";
import { createTourPageInitialValues } from "@/lib/admin/tourPageInitialValues";

export default async function AdminEditTourPage({ params }) {
  const { tourId } = await params;
  const page = await getTourPage(tourId);

  if (!page) notFound();

  return (
    <AdminShell>
      <AdminPageHeader
        title={page.title || "Редактирование тура"}
        subtitle={page.tourId}
      />
      <AdminTourPageForm
        tourId={page.tourId}
        initialData={createTourPageInitialValues(page)}
      />
    </AdminShell>
  );
}