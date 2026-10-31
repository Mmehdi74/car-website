export function Field({ id, label, error, hint, as = 'input', children, ...inputProps }) {
  const Tag = as;
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      {as === 'input' ? (
        <input
          id={id}
          className="field__control"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          {...inputProps}
        />
      ) : (
        <Tag
          id={id}
          className="field__control"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          {...inputProps}
        >
          {children}
        </Tag>
      )}
      {error ? (
        <p className="field__error" id={`${id}-error`}>
          {error}
        </p>
      ) : hint ? (
        <p className="field__hint">{hint}</p>
      ) : null}
    </div>
  );
}
