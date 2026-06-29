import {useState} from "react";
import BirthdayCheck from "./BirthdayCheck";

const RegisterPin = ({studentno, setHasPin}) => {
    const [pin, setPin] = useState("");
    const [status, setStatus] = useState("");
    const [birthdayCheck, setBirthdayCheck] = useState(false);
    const [prq, setPrq] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic 4-digit check
    if (!/^\d{4}$/.test(pin)) {
      setStatus("PIN must be exactly 4 digits.");
      return;
    }

    try {
     
      const response = await fetch("https://psu-api.palawan.edu.ph/bgs/reg_pin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: studentno, rc: prq, pin: pin }),
      });

      const data = await response.json(); 
      if (data){
        setHasPin(true)
      } else {
        setStatus("Error submitting PIN.");
      }
    } catch (err) {
      console.log(err)
      setStatus("Error submitting PIN.");
    }
  };

  return (
      <>
      <h2 className="text-center font-semibold">Pin Registration</h2>
        {birthdayCheck ? (
              <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2 items-center max-w-sm mx-auto">
                <label className="block mb-2 font-medium">Register 4-digit PIN:</label>
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
                  Register PIN
                </button>
                <p className="mt-2 text-sm text-gray-700">{status}</p>
              </form>
        ):
        (
          <BirthdayCheck setBirthdayCheck={setBirthdayCheck} studentNo={studentno} setPrq={setPrq} />
        )}
      </>
  );

}


export default RegisterPin;