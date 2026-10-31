/**
 * Submits a customer inquiry to the API.
 * Returns { ok, errors } — `errors` is a field->message map for validation.
 */
export async function submitInquiry(payload) {
  let response;
  try {
    response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    return {
      ok: false,
      formError: 'We could not reach our booking desk. Please try again in a moment.',
    };
  }

  if (response.status === 400) {
    const data = await response.json().catch(() => ({}));
    return { ok: false, errors: data.errors || {} };
  }
  if (!response.ok) {
    return { ok: false, formError: 'Something went wrong. Please try again in a moment.' };
  }
  return { ok: true };
}
