import { useState } from "react";
import Grades from "./Grades";
import BirthdayCheck from "./BirthdayCheck";
const StudentDetails = ({studentDetails}) =>{
    const [selectedTerm, setSelectedTerm] = useState("");
    const [errMsg, setErrMsg] = useState(null);
    const [grades, setGrades] = useState(null);
    const [fetching, setIsFetching] = useState(false)
    const [birthdayCheck, setBirthdayCheck] = useState(false)
    const handleGoClick = () => {
        if (!selectedTerm) {
          alert("Please select a Semester.");
          return;
        }
    
        // Fetch or perform action based on selectedTerm here
        fetchStudentGrades();
      };


      const fetchStudentGrades = async () => {

        setErrMsg(null);
       
        setIsFetching(true)
        try {
          const response = await fetch("http://10.125.2.222:8080/rptapi/student.php/grades", {
            method: "POST", // Use POST to send data in the body
            headers: {
              "Content-Type": "application/json", // Tell the server you're sending JSON
            },
            body: JSON.stringify({ 
                id:studentDetails.studentno,
                termid: selectedTerm
             }), // Send the query in the request body
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Unknown error occurred");
          }
    
          const data = await response.json();
          console.log(data)
          setGrades(data.grades);
        } catch (error) {
          setErrMsg(error.message)
        }
        setIsFetching(false)
      };





      const checkBdate = async (birthday) => {
        if (birthday === ""){
          return;
        }
        setErrorMsg(null);
        setStudentData(null)
        setIsFetching(true)
        try {
          const response = await fetch("http://10.125.2.222:8080/rptapi/student.php/bdayCheck", {
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

    const TermDropDownSelect = () => {
        return (
            <div className="p-4">
              <div className="flex items-center justify-center space-x-4">
                <select
                  value={selectedTerm}
                  onChange={(e) => setSelectedTerm(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Semester</option>
                  {studentDetails.registrations.map((registration) => (
                    <option key={registration.termid} value={registration.termid}>
                      {registration.schoolterm} ({registration.academicyear})
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleGoClick}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  disabled={fetching}
                >
                  Go
                </button>
              </div>
            </div>
          );
    }
    return (
        <>
             {studentDetails && (
        <div className="mt-8 flex justify-center">
          <div className="bg-white shadow-md rounded-lg p-3 lg:p-6 w-full lg:max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">
              Student Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="font-semibold text-gray-700">Student No:</div>
              <div>{studentDetails.studentno}</div>

              <div className="font-semibold text-gray-700">First Name:</div>
              <div>{studentDetails.firstname}</div>

              <div className="font-semibold text-gray-700">Middle Initial:</div>
              <div>{studentDetails.middleInitial}</div>

              <div className="font-semibold text-gray-700">Last Name:</div>
              <div>{studentDetails.lastname}</div>

              <div className="font-semibold text-gray-700">Program:</div>
              <div>{studentDetails.progshortname}</div>

              <div className="font-semibold text-gray-700">Major:</div>
              <div>{studentDetails.majordiscdesc}</div>
            </div>
          </div>
          
        </div>
      )}

      {birthdayCheck ? (
        <>
          <h2 className="text-center font-semibold text-lg mt-4">View Grades</h2>
          <TermDropDownSelect />
        </>
      ):
      (
      
          <BirthdayCheck setBirthdayCheck={setBirthdayCheck} studentNo={studentDetails.studentno} />
        
      )
      }
        


        {grades && (
            <Grades studentGrades={grades} />
        )}
        </>

  
    );
}

export default StudentDetails;