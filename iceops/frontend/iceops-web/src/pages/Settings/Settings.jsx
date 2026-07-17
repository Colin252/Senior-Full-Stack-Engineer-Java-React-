import { useEffect, useState } from "react";

const defaultSettings = {
  companyName: "ICEOPS ERP",
  currency: "USD",
  language: "English",
  theme: "Light"
};

export default function Settings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem("iceops-settings");

      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setSettings((currentSettings) => ({
      ...currentSettings,
      [name]: value
    }));

    setMessage("");
  }

  function saveSettings(e) {
    e.preventDefault();

    try {
      localStorage.setItem(
        "iceops-settings",
        JSON.stringify(settings)
      );

      setMessage("Settings saved successfully.");
    } catch (error) {
      console.error("Error saving settings:", error);
      setMessage("Unable to save settings.");
    }
  }

  function resetSettings() {
    setSettings(defaultSettings);
    localStorage.removeItem("iceops-settings");
    setMessage("Settings restored to defaults.");
  }

  return (
    <div>
      <h1>Settings</h1>
      <p>Configure local preferences for ICEOPS ERP.</p>

      <form
        onSubmit={saveSettings}
        style={{
          display: "grid",
          gap: 16,
          maxWidth: 450
        }}
      >
        <label>
          Company Name
          <input
            type="text"
            name="companyName"
            value={settings.companyName}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        <label>
          Currency
          <select
            name="currency"
            value={settings.currency}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="USD">USD</option>
            <option value="CRC">CRC</option>
            <option value="EUR">EUR</option>
          </select>
        </label>

        <label>
          Language
          <select
            name="language"
            value={settings.language}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
          </select>
        </label>

        <label>
          Theme
          <select
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
          </select>
        </label>

        <div>
          <button type="submit">Save Settings</button>

          <button
            type="button"
            onClick={resetSettings}
            style={{ marginLeft: 10 }}
          >
            Reset
          </button>
        </div>
      </form>

      {message && (
        <p style={{ marginTop: 16 }}>
          {message}
        </p>
      )}

      <h2>Current Configuration</h2>

      <table border="1" cellPadding="8">
        <tbody>
          <tr>
            <th>Company</th>
            <td>{settings.companyName}</td>
          </tr>
          <tr>
            <th>Currency</th>
            <td>{settings.currency}</td>
          </tr>
          <tr>
            <th>Language</th>
            <td>{settings.language}</td>
          </tr>
          <tr>
            <th>Theme</th>
            <td>{settings.theme}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  marginTop: 6,
  padding: 8,
  boxSizing: "border-box"
};