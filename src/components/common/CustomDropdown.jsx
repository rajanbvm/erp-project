import Dropdown from "react-bootstrap/Dropdown";

const CustomDropdown = ({
    name,
    value,
    options,
    placeholder,
    onChange,
}) => {

    const selected =
        options.find((item) =>
            typeof item === "object"
                ? item.value === value
                : item === value
        );

    return (
        <Dropdown>
            <Dropdown.Toggle
                variant="light"
                className="form-select"
            >
                {selected
                    ? (typeof selected === "object"
                        ? selected.label
                        : selected)
                    : placeholder}
            </Dropdown.Toggle>

            <Dropdown.Menu
                className="w-100"
                style={{ maxHeight: 250, overflowY: "auto" }}
            >
                {options.map((item, index) => {
                    const label =
                        typeof item === "object" ? item.label : item;

                    const optionValue =
                        typeof item === "object" ? item.value : item;

                    return (
                        <Dropdown.Item
                            key={index}
                            onClick={() =>
                                onChange({
                                    target: {
                                        name,
                                        value: optionValue,
                                    },
                                })
                            }
                        >
                            {label}
                        </Dropdown.Item>
                    );
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default CustomDropdown;