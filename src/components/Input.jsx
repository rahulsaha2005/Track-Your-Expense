export default function Input({
  htmlFor,
  label,
  type,
  id,
  value,
  onchange,
  className,
  errors,
}) {
  return (
    <>
      <div>
        <label htmlFor={htmlFor}>{label}</label>
        <input type={type} id={id} value={value} onChange={onchange} />
        <p className={className}>{errors}</p>
      </div>
    </>
  );
}
