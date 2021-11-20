import { useState, useEffect } from "react";
import logo from "./static/download.svg";
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
          <tr
            key={index.toString()}
            className={interview.archived ? "archived" : "unarchived"}
          >
            <td className="img-box">
              <img src={interview.image} height={28} width={28} />
              <span>{interview.candidate}</span>
            </td>
            <td>{interview.role || "-"}</td>
            {LastCommunicationHandle(interview?.last_comms)}
            <td>R{interview.salary}</td>
            <td>{interview.sent_by}</td>
            <td className="archive-button">
              <a onClick={() => handleArchive(index)}>
                {interview.archived ? "Unarchive" : "Archive"}
              </a>
            </td>
          </tr>
        );
      });
    } else {
      return filteredCandidates.map((interview, index) => {
        if (interview.archived === false) {
          return (
            <tr
              key={index.toString()}
              className={interview.archived ? "archived" : "unarchived"}
            >
              <td className="img-box">
                <img src={interview.image} height={28} width={28} />
                <span>{interview.candidate}</span>
              </td>
              <td>{interview.role || "-"}</td>
              {LastCommunicationHandle(interview?.last_comms)}
              <td>R{interview.salary}</td>
              <td>{interview.sent_by}</td>
              <td className="archive-button">
                <a onClick={() => handleArchive(index)}>
                  {interview.archived ? "Unarchive" : "Archive"}
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
        {comms.unread ? <span className="Active-Marker">🟢</span> : null}{" "}
        {comms.description} {comms.date_time.toLocaleString()}
      </td>
    );
  };

  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label className="archive-checkbox">
        {label}
        <input type="checkbox" checked={value} onChange={onChange} />
      </label>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="max-width-container">
          <img className="app-logo" src={logo} />
        </div>
      </header>
      <nav>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search..."
          className="search-box"
        />
        <Checkbox
          label="Show archived"
          value={showArchived}
          onChange={handleShowArchivedChange}
        />
      </nav>
      <main>
        <aside className="aside-pull">
          {interViewData.length} interview requests
        </aside>
        <table>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Role</th>
              <th>
                Last Communication <a onClick={handleCommunicationSortAsc}>↑</a>
                <a onClick={handleCommunicationSortDesc}>↓</a>
              </th>
              <th>Salary</th>
              <th>Sent by</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{filteredTableRowRender()}</tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
