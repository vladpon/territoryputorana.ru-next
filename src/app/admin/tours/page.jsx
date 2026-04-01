// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function ToursAdmin() {

//   const [tours, setTours] = useState([]);

//   useEffect(() => {

//     fetch("/api/tours")
//       .then(r => r.json())
//       .then(setTours);

//   }, []);

//   async function remove(id) {

//     await fetch("/api/tours/" + id, {
//       method: "DELETE"
//     });

//     setTours(tours.filter(t => t._id !== id));

//   }

//   return (

//     <div>

//       <h1>Tours</h1>

//       <Link href="/admin/tours/create">
//         Create tour
//       </Link>

//       {tours.map(tour => (

//         <div key={tour._id}>

//           {tour.title}

//           <Link href={"/admin/tours/edit/" + tour._id}>
//             edit
//           </Link>

//           <button
//             onClick={() => remove(tour._id)}
//           >
//             delete
//           </button>

//         </div>

//       ))}

//     </div>

//   );

// }