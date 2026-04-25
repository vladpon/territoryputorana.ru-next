import { requireAdminPage } from "@/lib/require-admin-page";

export default async function AdminRootLayout({ children }) {
  await requireAdminPage();

  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}