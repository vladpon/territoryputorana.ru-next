import Link from "next/link";
import AdminStatusBadge from "@/components/admin/AdminStatusBadge/AdminStatusBadge";
import styles from "./AdminToursTable.module.scss";

function yesNo(value) {
  return value ? "Да" : "Нет";
}

export default function AdminToursTable({ pages = [] }) {
  if (!pages.length) {
    return <p className={styles.empty}>Туры не найдены.</p>;
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Название</th>
            <th>tourId</th>
            <th>Path</th>
            <th>Статус</th>
            <th>Главная</th>
            <th>Меню</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {pages.map((page) => (
            <tr key={page.tourId}>
              <td>
                <div className={styles.titleCell}>
                  <span className={styles.title}>{page.title}</span>
                </div>
              </td>

              <td>{page.tourId}</td>
              <td>{page.path}</td>

              <td>
                <AdminStatusBadge status={page.status} />
              </td>

              <td>
                <div className={styles.metaCell}>
                  <span>{yesNo(page.homePage?.show)}</span>
                  <span className={styles.metaSub}>
                    order: {page.homePage?.order ?? 0}
                  </span>
                </div>
              </td>

              <td>
                <div className={styles.metaCell}>
                  <span>{yesNo(page.navigation?.showInMainMenu)}</span>
                  <span className={styles.metaSub}>
                    order: {page.navigation?.mainMenuOrder ?? 0}
                  </span>
                </div>
              </td>

              <td className={styles.actions}>
                <Link
                  className={styles.link}
                  href={`/admin/tours/edit/${page.tourId}`}
                >
                  Редактировать
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}