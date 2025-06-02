let users = [
  { id: 1, name: "John ", email: "john@email.com", age: 28 },
  { id: 2, name: "Maria ", email: "maria@email.com", age: 35 }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(users);
  } else if (req.method === 'POST') {
    const { name, email, age } = req.body;
    if (!name || !email || !age) return res.status(400).json({ error: "Missing fields" });
    const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = { id, name, email, age };
    users.push(newUser);
    res.status(201).json(newUser);
  } else if (req.method === 'PUT') {
    const { id, name, email, age } = req.body;
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ error: "User not found" });
    users[index] = { id, name, email, age };
    res.status(200).json(users[index]);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    users = users.filter(u => u.id !== id);
    res.status(200).json({ message: "User deleted" });
  } else {
    res.status(405).end();
  }
}