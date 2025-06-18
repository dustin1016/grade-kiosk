import { useState } from 'react';

const BirthdayCheck = ({setBirthdayCheck, studentNo, setPrq}) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [bdayError, setBdayError] = useState(false)
   
    const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    };

    const handleGoClick = () => {
        bdayCheck()
    };

    const bdayCheck = async () => {
        if (!selectedDate){
          return;
        }


        setBdayError(null);
        setIsValidating(true)
        try {
          const response = await fetch("https://psu-api.palawan.edu.ph/bgs/bdayCheck", {
          // const response = await fetch("http://localhost/bgs/bdayCheck", {
       
            method: "POST", // Use POST to send data in the body
            headers: {
              "Content-Type": "application/json", // Tell the server you're sending JSON
            },
            body: JSON.stringify({ id:studentNo, bdate:selectedDate }), // Send the query in the request body
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Unknown error occurred");
          }
    
          const data = await response.json();
          if (data.res){

              setBirthdayCheck(data.res)
              setPrq(data.rc)
          } else {
            setBdayError(true)
          }
        } catch (error) {
            console.log(error)
          setBdayError(true)
        }
        setIsValidating(false)
      };
    

  return (
    <>
    <h3 className='text-center text-sm my-2'>For Data Privacy Purposes, Please indicate your Date of Birth to verify your identity</h3>
        <div className="flex items-center space-x-4">
            <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
                onClick={handleGoClick}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                disabled={isValidating}
            >
                Go
            </button>
        </div>
    {bdayError && (
        <p className='text-center text-red-500'>Incorrect Birthday</p>
    )}
    </>
  );
};

export default BirthdayCheck;