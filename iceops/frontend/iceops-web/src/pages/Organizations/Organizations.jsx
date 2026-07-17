import { useEffect, useState } from "react";
import organizationService from "../../services/organizationService";

const initialForm = {
  name: "",
  description: "",
  address: "",
  phone: "",
  email: "",
};

function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadOrganizations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await organizationService.getAll();
      setOrganizations(
        Array.isArray(response.data) ? response.data : []
      );
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las organizaciones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrganizations();
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

    if (!form.name.trim()) {
      setError("El nombre de la organización es obligatorio.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (editingId !== null) {
        await organizationService.update(editingId, form);
      } else {
        await organizationService.create(form);
      }

      resetForm();
      await loadOrganizations();
    } catch (err) {
      console.error(err);
      setError("No se pudo guardar la organización.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (organization) => {
    setEditingId(organization.id);

    setForm({
      name: organization.name || "",
      description: organization.description || "",
      address: organization.address || "",
      phone: organization.phone || "",
      email: organization.email || "",
    });

    setError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Deseas eliminar esta organización?")) {
      return;
    }

    try {
      setError("");
      await organizationService.delete(id);

      if (editingId === id) {
        resetForm();
      }

      await loadOrganizations();
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar la organización.");
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1>Organizations</h1>
      <p>Administración de organizaciones de ICEOPS ERP</p>

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
        <h2>
          {editingId !== null
            ? "Editar organización"
            : "Nueva organización"}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px",
          }}
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nombre"
            style={{ padding: "10px" }}
          />

          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descripción"
            style={{ padding: "10px" }}
          />

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Dirección"
            style={{ padding: "10px" }}
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Teléfono"
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
                ? "Actualizar organización"
                : "Crear organización"}
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
          <h2>Organizaciones registradas</h2>

          <button
            type="button"
            onClick={loadOrganizations}
            disabled={loading}
          >
            Actualizar
          </button>
        </div>

        {loading ? (
          <p>Cargando organizaciones...</p>
        ) : organizations.length === 0 ? (
          <p>No hay organizaciones registradas.</p>
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
                <th style={cellStyle}>Nombre</th>
                <th style={cellStyle}>Descripción</th>
                <th style={cellStyle}>Dirección</th>
                <th style={cellStyle}>Teléfono</th>
                <th style={cellStyle}>Correo</th>
                <th style={cellStyle}>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {organizations.map((organization) => (
                <tr key={organization.id}>
                  <td style={cellStyle}>{organization.id}</td>
                  <td style={cellStyle}>{organization.name}</td>
                  <td style={cellStyle}>
                    {organization.description || "-"}
                  </td>
                  <td style={cellStyle}>
                    {organization.address || "-"}
                  </td>
                  <td style={cellStyle}>
                    {organization.phone || "-"}
                  </td>
                  <td style={cellStyle}>
                    {organization.email || "-"}
                  </td>
                  <td style={cellStyle}>
                    <button
                      type="button"
                      onClick={() => handleEdit(organization)}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(organization.id)
                      }
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

export default Organizations;