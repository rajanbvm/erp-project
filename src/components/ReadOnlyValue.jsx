const ReadOnlyValue = ({
    value,
    placeholder = "0",
    className = "",
}) => {
    const hasValue =
        value !== undefined &&
        value !== null &&
        value !== "";

    return (
        <div className={`input-text-box ${className}`}>
            {hasValue ? (
                value
            ) : (
                <span className="placeholder-text">
                    {placeholder}
                </span>
            )}
        </div>
    );
};

export default ReadOnlyValue;
