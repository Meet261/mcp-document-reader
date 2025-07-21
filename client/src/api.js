
export async function readPage(url, page) {
  await fetch("http://localhost:8000/read", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, page: page - 1 }),
  });
}
