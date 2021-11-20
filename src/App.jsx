import { useState, useEffect } from "react";
import logo from "./static/logo.svg";
import jsonData from "../interviewRequests.json";
import "./App.css";

function App() {
  const [showArchived, setShowArchived] = useState(false);
  const [interViewData, setInterviewData] = useState([...jsonData]);
  const [searchText, setSearchText] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState([...jsonData]);

  const handleShowArchivedChange = () => {
    setShowArchived((archived) => !archived);
  };

  const handleCommunicationSortAsc = () => {
    const sortedAscInterviews = filteredCandidates.sort(
      (a, b) =>
        parseFloat(a.last_comms?.date_time) -
        parseFloat(b.last_comms?.date_time)
    );
    setFilteredCandidates([...sortedAscInterviews]);
  };

  const handleCommunicationSortDesc = () => {
    const sortedDescInterviews = filteredCandidates.sort(
      (a, b) =>
        parseFloat(b.last_comms?.date_time) -
        parseFloat(a.last_comms?.date_time)
    );
    setFilteredCandidates([...sortedDescInterviews]);
  };

  const handleArchive = (ind) => {
    const archivedDataset = interViewData.map((item, index) => {
      if (index == ind) {
        item.archived = !item.archived;
      }
      return item;
    });

    setInterviewData([...archivedDataset]);
    setFilteredCandidates([...archivedDataset]);
  };

  useEffect(() => {
    if (searchText && searchText === "") {
      setFilteredCandidates([...jsonData]);
    } else {
      const temp = searchText.toString().toLowerCase();
      const searchData = interViewData.filter((interview) => {
        if (interview.candidate.toLowerCase().includes(temp)) {
          return interview;
        }
      });

      setFilteredCandidates([...searchData]);
    }
  }, [searchText]);

  const filteredTableRowRender = () => {
    if (showArchived) {
      return filteredCandidates.map((interview, index) => {
        return (
          <tr key={index.toString()}>
            <td>
              <img src={interview.image} height={28} width={28} />
              {interview.candidate}
            </td>
            <td>{interview.role || "-"}</td>
            {LastCommunicationHandle(interview?.last_comms)}
            <td>R{interview.salary}</td>
            <td>{interview.sent_by}</td>
            <td>
              <a onClick={() => handleArchive(index)}>
                {interview.archived ? "Archive" : "Unarchive"}
              </a>
            </td>
          </tr>
        );
      });
    } else {
      return filteredCandidates.map((interview, index) => {
        if(interview.archived === true){
          return (
            <tr key={index.toString()}>
              <td>
                <img src={interview.image} height={28} width={28} />
                {interview.candidate}
              </td>
              <td>{interview.role || "-"}</td>
              {LastCommunicationHandle(interview?.last_comms)}
              <td>R{interview.salary}</td>
              <td>{interview.sent_by}</td>
              <td>
                <a onClick={() => handleArchive(index)}>
                  {interview.archived ? "Archive" : "Unarchive"}
                </a>
              </td>
            </tr>
          );
        }
      });
    }
  };

  const LastCommunicationHandle = (comms, index) => {
    return (
      <td key={index}>
        {comms.unread ? "🟢" : null} {comms.description}{" "}
        {comms.date_time.toLocaleString()}
      </td>
    );
  };

  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search..."
        />
        <aside className="aside-pull">
          {interViewData.length} interview requests
        </aside>
        <Checkbox
          label="Show Archived"
          value={showArchived}
          onChange={handleShowArchivedChange}
        />
        <table>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Role</th>
              <th>
                Last Communication{" "}
                <a onClick={handleCommunicationSortAsc}>↑</a>
                <a onClick={handleCommunicationSortDesc}>↓</a>
              </th>
              <th>Salary</th>
              <th>Sent by</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{filteredTableRowRender()}</tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
