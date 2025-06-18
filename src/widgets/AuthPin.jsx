import {useState} from "react";


const AuthPin = ({studentno, setIsAuth}) => {
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
    //   const response = await fetch("http://localhost/bgs/pin_auth", {
      const response = await fetch("https://psu-api.palawan.edu.ph/bgs/pin_auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: studentno, pin: pin }),
      });

      const data = await response.json(); // or response.json() if you send JSON
      if (data.error){
        setStatus(data.error)
      } else {
        setIsAuth(true)
      }
    } catch (err) {
      console.log(err)
      setStatus("Error submitting PIN.");
    }
  };

  return (
      <>
      
              <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2 items-center mt-2 max-w-sm mx-auto">
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
                <p className="mb-2 text-sm text-red-700">{status}</p>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Submit
                </button>
                
              </form>
      </>
  );

}


export default AuthPin;