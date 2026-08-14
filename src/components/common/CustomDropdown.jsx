import React, { useMemo, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

const CustomDropdown = ({
    name,
    value,
    options = [],
    placeholder,
    onChange,
    searchable = false,
    className = "",
}) => {
    const [search, setSearch] = useState("");

    const selected = options.find((item) =>
        typeof item === "object"
            ? item.value === value
            : item === value
    );

    const filteredOptions = useMemo(() => {
        if (!search.trim()) {
            return options;
        }

        return options.filter((item) => {
            const label =
                typeof item === "object"
                    ? item.label
                    : item;

            return String(label)
                .toLowerCase()
                .includes(search.toLowerCase());
        });
    }, [options, search]);

    const handleSelect = (selectedValue) => {
        onChange({
            target: {
                name,
                value: selectedValue,
            },
        });

        setSearch("");
    };

    return (
        <Dropdown>
            <Dropdown.Toggle
                variant="light"
                className={`form-select ${className}`}
            >
                {selected
                    ? typeof selected === "object"
                        ? selected.label
                        : selected
                    : placeholder}
            </Dropdown.Toggle>

            <Dropdown.Menu
                className="w-100"
                style={{
                    maxHeight: "300px",
                    overflowY: "auto",
                }}
            >
                {searchable && (
                    <div
                        className="px-2 pb-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="position-relative">
                            <input
                                type="text"
                                className="form-control pe-5"
                                placeholder={`Search ${placeholder?.replace(
                                    "Select ",
                                    ""
                                )}...`}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                autoFocus
                                autoComplete="new-password"
                            />

                            {search && (
                                <button
                                    type="button"
                                    className="btn position-absolute top-50 end-0 translate-middle-y me-1 p-1 border-0"
                                    onClick={() => setSearch("")}
                                    aria-label="Clear search"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {filteredOptions.length > 0 ? (
                    filteredOptions.map((item, index) => {
                        const optionValue =
                            typeof item === "object"
                                ? item.value
                                : item;

                        const optionLabel =
                            typeof item === "object"
                                ? item.label
                                : item;

                        return (
                            <Dropdown.Item
                                key={`${optionValue}-${index}`}
                                onClick={() =>
                                    handleSelect(optionValue)
                                }
                            >
                                {optionLabel}
                            </Dropdown.Item>
                        );
                    })
                ) : (
                    <div className="px-3 py-2 text-muted small">
                        No results found
                    </div>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default CustomDropdown;