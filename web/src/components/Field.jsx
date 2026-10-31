export default function Field({
  id,
  label,
  error,
  as = 'input',
  className = '',
  hint,
  ...rest
}) {
  const Control = as;
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div className={`field${error ? ' field--error' : ''}${className ? ` ${className}` : ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <Control
        id={id}
        name={id}
        className="field__control"
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        {...rest}
      />
      {hint && !error && <p className="field__hint">{hint}</p>}
      {error && (
        <p className="field__error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
