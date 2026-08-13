
import { BsEye } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";

export default function DataTable({
  title,
  description,
  columns,
  data,
  showViewAll = true,
  viewAllText = "View All",
  onViewAll,
  showDropdown = false,
  dropdownTitle = "All Status",
  dropdownItems = [],
}) {
  return (
    <div className="data-table-card">
      <div className="table-header">
        <div>
          <h3>{title}</h3>
          {description && <p>{description}</p>}
        </div>

        {showViewAll && (
          <button className="view-all-btn" onClick={onViewAll}>
            <span>{viewAllText}</span>
            <IoChevronForward />
          </button>
        )}

        {showDropdown && (
          <Dropdown>
            <Dropdown.Toggle variant="success" className="table-dropdown btn-outline-primary">
              {dropdownTitle}
              <IoChevronDown />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {dropdownItems.map((item, index) => (
                <Dropdown.Item key={index} onClick={item.onClick}>
                  {item.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>

      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={
                    column.className ||
                    (column.key === "action" ? "text-center" : "")
                  }
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={
                        column.className ||
                        (column.key === "action" ? "text-center" : "")
                      }
                    >
                      {column.render
                        ? column.render(row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  No entry found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}