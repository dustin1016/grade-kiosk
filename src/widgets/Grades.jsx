

const Grades = ({studentGrades}) => {

    return (
        <div className="p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Subject Code</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Subject Title</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Midterm Grade</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Final Grade</th>
              </tr>
            </thead>
            <tbody>
              {studentGrades.map((grade, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 text-sm text-gray-800">{grade.subjectcode}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{grade.subjecttitle}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{grade.midterm || ""}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{grade.final || ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default Grades;