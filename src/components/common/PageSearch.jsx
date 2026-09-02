import { BsSearch, BsTelephone } from "react-icons/bs";
import { CiExport, CiImport } from "react-icons/ci";
import { GoPlus } from "react-icons/go";

const PageSearch = ({
  className = "",

  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,

  showImport = false,
  onImportClick,

  showExport = false,
  exportButtonText = "Export",
  onExportClick,

  // New Secondary Outline Button
  showSecondaryButton = false,
  secondaryButtonText = "",
  secondaryButtonIcon,
  onSecondaryButtonClick,

  showAddButton = false,
  addButtonText = "Add New",
  onAddClick,
}) => {
  return (
    <section className={`page-search-sec mb-32 ${className}`}>
      <div className="row align-items-center">
        {/* Search */}
        <div className="col-md-6">
          <div className="banner-text">
            <div className="search-bar w-100">
             <input
                type="text"
                placeholder={searchPlaceholder}
                className="form-control"
                value={searchValue}
                onChange={(e) =>
                  onSearchChange?.(e.target.value)
                }
              />

              <span className="search-icon">
                <BsSearch />
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="col-md-6">
          <div className="banner-text text-end">

            {showImport && (
              <button
                className="btn btn-outline-primary mx-2"
                onClick={onImportClick}
              >
                <CiImport size={18} />
                <span>Import</span>
              </button>
            )}

            {showExport && (
              <button
                className="btn btn-outline-primary mx-2"
                onClick={onExportClick}
              >
                <CiExport size={18} />
                <span>{exportButtonText}</span>
              </button>
            )}

            {showSecondaryButton && (
              <button
                className="btn btn-outline-primary mx-2"
                onClick={onSecondaryButtonClick}
              >
                {secondaryButtonIcon || <BsTelephone size={16} />}
                <span>{secondaryButtonText}</span>
              </button>
            )}

            {showAddButton && (
              <button
                className="btn btn-primary ms-2"
                onClick={onAddClick}
              >
                <GoPlus />
                <span>{addButtonText}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageSearch;