import { useEffect, useState } from "react";
import userService from "../../services/userService";

const initialForm = {
  username: "",
  email: "",
};

function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await userService.getAll();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.username.trim() || !form.email.trim()) {
      setError("El nombre de usuario y el correo son obligatorios.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (editingId !== null) {
        await userService.update(editingId, form);
      } else {
        await userService.create(form);
      }

      resetForm();
      await loadUsers();
    } catch (err) {
      console.error(err);
      setError("No se pudo guardar el usuario.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.id);

    setForm({
      username: user.username || "",
      email: user.email || "",
    });

    setError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Deseas eliminar este usuario?")) {
      return;
    }

    try {
      setError("");
      await userService.delete(id);

      if (editingId === id) {
        resetForm();
      }

      await loadUsers();
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar el usuario.");
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1>Users</h1>
      <p>Administración de usuarios de ICEOPS ERP</p>

      {error && (
        <div
          style={{
            padding: "12px",
            marginBottom: "16px",
            background: "#fee2e2",
            color: "#991b1b",
            borderRadius: "8px",
          }}
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          padding: "20px",
          marginBottom: "24px",
          background: "#ffffff",
          borderRadius: "10px",
        }}
      >
        <h2>{editingId !== null ? "Editar usuario" : "Nuevo usuario"}</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px",
          }}
        >
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Nombre de usuario"
            style={{ padding: "10px" }}
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            style={{ padding: "10px" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "12px",
          }}
        >
          <button type="submit" disabled={saving}>
            {saving
              ? "Guardando..."
              : editingId !== null
                ? "Actualizar usuario"
                : "Crear usuario"}
          </button>

          {editingId !== null && (
            <button type="button" onClick={resetForm}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div
        style={{
          padding: "20px",
          background: "#ffffff",
          borderRadius: "10px",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Usuarios registrados</h2>

          <button
            type="button"
            onClick={loadUsers}
            disabled={loading}
          >
            Actualizar
          </button>
        </div>

        {loading ? (
          <p>Cargando usuarios...</p>
        ) : users.length === 0 ? (
          <p>No hay usuarios registrados.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={cellStyle}>ID</th>
                <th style={cellStyle}>Usuario</th>
                <th style={cellStyle}>Correo</th>
                <th style={cellStyle}>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td style={cellStyle}>{user.id}</td>
                  <td style={cellStyle}>{user.username}</td>
                  <td style={cellStyle}>{user.email}</td>
                  <td style={cellStyle}>
                    <button
                      type="button"
                      onClick={() => handleEdit(user)}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(user.id)}
                      style={{ marginLeft: "8px" }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const cellStyle = {
  padding: "10px",
  textAlign: "left",
  borderBottom: "1px solid #dddddd",
};

export default Users;