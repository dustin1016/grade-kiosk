import { useState } from 'react'
import CenteredInput from './widgets/CenteredInput'
import StudentDetails from './widgets/StudentDetails';

function App() {
  const [studentData, setStudentData] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null);
  const [isFetchin, setIsFetching] = useState(false)
  
 
  const fetchStudentData = async (query) => {
    if (query === ""){
      return;
    }
    setErrorMsg(null);
    setStudentData(null)
    setIsFetching(true)
    try {
      const response = await fetch("http://10.125.2.222:8080/rptapi/student.php/x", {
        method: "POST", // Use POST to send data in the body
        headers: {
          "Content-Type": "application/json", // Tell the server you're sending JSON
        },
        body: JSON.stringify({ id:query }), // Send the query in the request body
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error occurred");
      }

      const data = await response.json();
    
      setStudentData(data.studentDetails[0]);
    } catch (error) {
      setErrorMsg(error.message)
    }
    setIsFetching(false)
  };


 



  

  
  return (

    <div className="relative">
      <div className="watermark-text">Not Valid For Legal Purposes</div>
      <div className="flex flex-col items-center lg:justify-start min-h-screen bg-gray-100">
        <h1 className='text-center text-lg font-semibold'>PalSU Online Student Grades Portal</h1>
          <CenteredInput onSearch={fetchStudentData} isFetching={isFetchin} />
          {
            errorMsg && (
              <div className='mt-4 text-center text-md text-red-600'>
                {errorMsg}
              </div>
            )
          }

          {studentData && (
                
              <StudentDetails studentDetails={studentData} />       
            
          )}
      </div>

    </div>
  )
}

export default App
