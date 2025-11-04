import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    console.log('Fetching Leaderboard from:', apiUrl);
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      const results = data.results || data;
      setLeaderboard(results);
      console.log('Fetched Leaderboard:', data);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);

  const columns = React.useMemo(() => {
    if (!leaderboard || leaderboard.length === 0) return [];
    return Object.keys(leaderboard[0]).slice(0, 6);
  }, [leaderboard]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4">Leaderboard</h2>
        <div>
          <button className="btn btn-secondary me-2" onClick={fetchData} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger">Error: {error}</div>}

      <div className="card">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  {columns.map(col => (
                    <th key={col}>{col}</th>
                  ))}
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((item, idx) => (
                  <tr key={idx}>
                    {columns.map(col => (
                      <td key={col}>
                        {typeof item[col] === 'object' ? JSON.stringify(item[col]) : String(item[col])}
                      </td>
                    ))}
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          setSelected(item);
                          setShowModal(true);
                          console.log('View Leaderboard entry:', item);
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                {leaderboard.length === 0 && (
                  <tr>
                    <td colSpan={columns.length + 1} className="text-center py-3">
                      {loading ? 'Loading leaderboard...' : 'No leaderboard entries found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Leaderboard Entry</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(selected, null, 2)}</pre>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
