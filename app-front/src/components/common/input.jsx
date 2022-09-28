const Input = ({ required = false, lable, name, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {required ? <span className="text-danger me-1">*</span> : null}
        {lable}
      </label>
      <input {...rest} id={name} name={name} className="form-control" />
      {error && <span className="text-danger">{error}</span>}
    </div>
  )
}

export default Input
