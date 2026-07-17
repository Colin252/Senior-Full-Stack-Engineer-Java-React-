export default function Navbar() {
  return (
    <header
      style={{
        height: "65px",
        background: "#ffffff",
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 25px",
        boxSizing: "border-box"
      }}
    >
      <div>
        <h3 style={{ margin: 0 }}>
          ICEOPS ERP
        </h3>
      </div>

      <div>
        ERP Hub
      </div>
    </header>
  );
}