import {useState} from "react";


const RegisterPin = () => {
    const [pin, setPin] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic 4-digit check
    if (!/^\d{4}$/.test(pin)) {
      setStatus("PIN must be exactly 4 digits.");
      return;
    }

    try {
      const response = await fetch("https://your-backend.com/pin-handler.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pin }),
      });

      const data = await response.text(); // or response.json() if you send JSON
      setStatus(`Server says: ${data}`);
    } catch (err) {
      setStatus("Error submitting PIN.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto">
      <label className="block mb-2 font-medium">Enter 4-digit PIN:</label>
      <input
        type="password"
        value={pin}
        maxLength="4"
        pattern="\d{4}"
        onChange={(e) => setPin(e.target.value)}
        className="border border-gray-400 p-2 w-full mb-2 rounded"
        placeholder="••••"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit PIN
      </button>
      <p className="mt-2 text-sm text-gray-700">{status}</p>
    </form>
  );

}


export default RegisterPin;