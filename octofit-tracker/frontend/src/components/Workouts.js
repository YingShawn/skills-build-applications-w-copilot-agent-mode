import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    console.log('Fetching Workouts from:', apiUrl);
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      const results = data.results || data;
      setWorkouts(results);
      console.log('Fetched Workouts:', data);
    } catch (err) {
      console.error('Error fetching workouts:', err);
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
    if (!workouts || workouts.length === 0) return [];
    return Object.keys(workouts[0]).slice(0, 6);
  }, [workouts]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4">Workouts</h2>
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
                {workouts.map((item, idx) => (
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
                          console.log('View Workout:', item);
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                {workouts.length === 0 && (
                  <tr>
                    <td colSpan={columns.length + 1} className="text-center py-3">
                      {loading ? 'Loading workouts...' : 'No workouts found.'}
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
                <h5 className="modal-title">Workout Details</h5>
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

export default Workouts;
