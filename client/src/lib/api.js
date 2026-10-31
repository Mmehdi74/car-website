export async function submitInquiry(payload) {
  let response;

  try {
    response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw Object.assign(new Error('We could not reach the server. Please check your connection.'), {
      fieldErrors: {},
    });
  }

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw Object.assign(
      new Error(data.message || 'Your inquiry could not be sent. Please try again.'),
      { fieldErrors: data.errors || {} },
    );
  }

  return data;
}
