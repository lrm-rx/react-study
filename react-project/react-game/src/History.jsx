function History({ history, onChange }) {
  return (
    <>
      <h2 className="history-title">History</h2>
      <ul className="history-list">
        {history.map((step, index) => (
          <li className="history-item" onClick={() => onChange(index)} key={index}>this is Step {index + 1}</li>
        ))}
      </ul>
    </>
  )
}

export default History;
