import { useEffect, useState } from "react";
import productService from "../../services/productService";

const initialForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await productService.getAll();

      setProducts(
        Array.isArray(response.data) ? response.data : []
      );
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
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

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (!form.name.trim()) {
      setError("El nombre del producto es obligatorio.");
      return;
    }

    if (!Number.isFinite(price) || price < 0) {
      setError("El precio debe ser un número válido.");
      return;
    }

    if (!Number.isInteger(stock) || stock < 0) {
      setError("Las existencias deben ser un número entero.");
      return;
    }

    const product = {
      name: form.name.trim(),
      description: form.description.trim(),
      price,
      stock,
    };

    try {
      setSaving(true);
      setError("");

      if (editingId !== null) {
        await productService.update(editingId, product);
      } else {
        await productService.create(product);
      }

      resetForm();
      await loadProducts();
    } catch (err) {
      console.error(err);
      setError("No se pudo guardar el producto.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);

    setForm({
      name: product.name || "",
      description: product.description || "",
      price: String(product.price ?? ""),
      stock: String(product.stock ?? ""),
    });

    setError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Deseas eliminar este producto?")) {
      return;
    }

    try {
      setError("");
      await productService.delete(id);

      if (editingId === id) {
        resetForm();
      }

      await loadProducts();
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar el producto.");
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1>Products</h1>
      <p>Administración de productos de ICEOPS ERP</p>

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
            ? "Editar producto"
            : "Nuevo producto"}
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
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            placeholder="Precio"
            style={{ padding: "10px" }}
          />

          <input
            name="stock"
            type="number"
            min="0"
            step="1"
            value={form.stock}
            onChange={handleChange}
            placeholder="Existencias"
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
                ? "Actualizar producto"
                : "Crear producto"}
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
          <h2>Productos registrados</h2>

          <button
            type="button"
            onClick={loadProducts}
            disabled={loading}
          >
            Actualizar
          </button>
        </div>

        {loading ? (
          <p>Cargando productos...</p>
        ) : products.length === 0 ? (
          <p>No hay productos registrados.</p>
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
                <th style={cellStyle}>Precio</th>
                <th style={cellStyle}>Existencias</th>
                <th style={cellStyle}>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td style={cellStyle}>{product.id}</td>
                  <td style={cellStyle}>{product.name}</td>
                  <td style={cellStyle}>
                    {product.description || "-"}
                  </td>
                  <td style={cellStyle}>
                    {Number(product.price ?? 0).toFixed(2)}
                  </td>
                  <td style={cellStyle}>
                    {product.stock ?? 0}
                  </td>
                  <td style={cellStyle}>
                    <button
                      type="button"
                      onClick={() => handleEdit(product)}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(product.id)
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