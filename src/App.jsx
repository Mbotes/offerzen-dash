import { useState } from "react";
import logo from "./static/logo.svg";
import jsonData from "../interviewRequests.json";
import "./App.css";

function App() {
  const [showArchived, setShowArchived] = useState(true);
  const [interViewData, setInterviewData] = useState([...jsonData]);

  const handleCheckboxChange = () => {
    setShowArchived(!showArchived);
  };

  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };

  const handleArchive = (ind) => {
    const archivedDataset = interViewData.map((item, index) => {
      if (index == ind){
        item.archived = !item.archived;
      }
      return item;
    })

    setInterviewData([...archivedDataset])
  };

  const LastCommunicationHandle = (comms, index) => {
    return (
      <td key={index}>
        {comms.unread ? "🟢" : null} {comms.description}{" "}
        {comms.date_time.toLocaleString()}
      </td>
    );
  };
  return (
    <div className="App">
      <header className="App-header">
        <aside className="aside-pull">{interViewData.length} interview requests</aside>
        <Checkbox
          label="Show Archived"
          value={showArchived}
          onChange={handleCheckboxChange}
        />
        <table>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Role</th>
              <th>Last Communication</th>
              <th>Salary</th>
              <th>Sent by</th>
              {showArchived && <th></th>}
            </tr>
          </thead>
          <tbody>
            {interViewData.map((interview, index) => {
              return (
                <>
                  <tr key={interview.candidate + index}>
                    <td>
                      <img src={interview.image} height={28} width={28} />
                      {interview.candidate}
                    </td>
                    <td>{interview.role || "-"}</td>
                    {LastCommunicationHandle(interview?.last_comms)}
                    <td>R{interview.salary}</td>
                    <td>{interview.sent_by}</td>
                    {showArchived && (
                      <td>
                        <button onClick={() => handleArchive(index)}>
                          {interview.archived ? "Archive" : "Unarchive"}
                        </button>
                      </td>
                    )}
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
