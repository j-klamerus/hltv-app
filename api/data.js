
export default async function handler(req, res) {
  const data = {
    message: "Hello from your Vercel Function!",
    timestamp: new Date().toISOString(),
  };

  return res.json(data); // Using Vercel's built-in res.json() helper
}