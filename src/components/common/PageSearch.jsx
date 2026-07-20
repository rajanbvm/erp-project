import { BsSearch } from "react-icons/bs";
import { CiExport, CiImport } from "react-icons/ci";
import { GoPlus } from "react-icons/go";

const PageSearch = ({
  className = "",

  searchPlaceholder = "Search...",
  onSearchChange,

  showImport = false,
  onImportClick,

  showExport = false,
  onExportClick,

  showAddButton = false,
  addButtonText = "Add New",
  onAddClick,

}) => {
  return (
    <section className={`page-search-sec mb-32 ${className}`}>
      <div className="row align-items-center">

        {/* Always Search */}
        <div className="col-md-4">
          <div className="banner-text">
            <div className="search-bar">

              <input
                type="text"
                placeholder={searchPlaceholder}
                className="form-control"
                onChange={onSearchChange}
              />

              <span className="search-icon">
                <BsSearch />
              </span>

            </div>
          </div>
        </div>


        {/* Dynamic Buttons */}
        <div className="col-md-8">
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
                <span>Export</span>
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