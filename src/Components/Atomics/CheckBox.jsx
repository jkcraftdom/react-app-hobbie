function CheckBox({label, children, chkId}) {
    return (
        <div className="form-check mt-1">
            {children}
            <label className="form-check-label" htmlFor={chkId}>
                {label}
            </label>
        </div>
      );
}

export default CheckBox;