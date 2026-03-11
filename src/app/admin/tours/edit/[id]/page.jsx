import TourForm from "@/components/admin/TourForm";

async function getTour(id) {

  const res = await fetch(
    process.env.NEXT_PUBLIC_SITE_URL +
    "/api/tours/" +
    id,
    { cache: "no-store" }
  );

  return res.json();

}

export default async function EditTour({ params }) {

  const tour = await getTour(params.id);

  return (

    <div>

      <h1>Edit Tour</h1>

      <TourForm initialData={tour} />

    </div>

  );

}