import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Typography,
  Card,
  CardContent,
  Box
} from "@mui/material";

function App() {
  const [leads, setLeads] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    status: "NEW"
  });

  // ---------------- FETCH ----------------
  const fetchLeads = async () => {
    const res = await fetch("http://localhost:8081/api/leads");
    const data = await res.json();
    setLeads(data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // ---------------- CREATE / UPDATE ----------------
  const saveLead = async () => {
    if (!form.name || !form.email) {
      alert("Name and Email are required");
      return;
    }

    const url = editingId
      ? `http://localhost:8081/api/leads/${editingId}`
      : "http://localhost:8081/api/leads";

    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    resetForm();
    fetchLeads();
  };

  // ---------------- EDIT ----------------
  const editLead = (lead) => {
    setEditingId(lead.id);
    setForm({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      interest: lead.interest,
      status: lead.status
    });
  };

  // ---------------- DELETE ----------------
  const deleteLead = async (id) => {
    await fetch(`http://localhost:8081/api/leads/${id}`, {
      method: "DELETE"
    });
    fetchLeads();
  };

  // ---------------- RESET ----------------
  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      interest: "",
      status: "NEW"
    });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Iron Lady Lead Management System
      </Typography>

      {/* FORM */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              label="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <TextField
              label="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <TextField
              label="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <TextField
              label="Interest"
              value={form.interest}
              onChange={(e) => setForm({ ...form, interest: e.target.value })}
            />

            {editingId && (
              <Select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
              >
                <MenuItem value="NEW">NEW</MenuItem>
                <MenuItem value="CONTACTED">CONTACTED</MenuItem>
                <MenuItem value="COUNSELLING_DONE">COUNSELLING_DONE</MenuItem>
                <MenuItem value="ENROLLED">ENROLLED</MenuItem>
                <MenuItem value="DROPPED">DROPPED</MenuItem>
              </Select>
            )}

            <Button variant="contained" onClick={saveLead}>
              {editingId ? "Update Lead" : "Add Lead"}
            </Button>

            {editingId && (
              <Button color="secondary" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* TABLE */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Interest</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>{lead.name}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.interest}</TableCell>
              <TableCell>{lead.status}</TableCell>
              <TableCell>
                <Button onClick={() => editLead(lead)}>Edit</Button>
                <Button
                  color="error"
                  onClick={() => deleteLead(lead.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default App;
