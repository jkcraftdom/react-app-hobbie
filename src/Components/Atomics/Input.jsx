function Input({label, children, margin, small}) {
    
    let formClass = margin? 'form-group row mt-2': 'form-group row'   
    let smallClass = 'col-xl-2 col-form-label'
    smallClass = small? smallClass + " txt-small": smallClass
    return (  
        <div className={formClass}>
            <label className={smallClass}>{label}</label>
            <div className="col-xl-10">
                {children}
            </div>
        </div>
    );
}

export default Input;