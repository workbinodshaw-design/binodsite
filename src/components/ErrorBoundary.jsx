import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, _errorInfo) {
    // If it's a chunk load error (Vite dynamic import failure due to new deployment), force reload the page
    if (error.name === 'ChunkLoadError' || error.message.includes('Failed to fetch dynamically imported module')) {
      window.location.reload(true);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.state.error && (this.state.error.name === 'ChunkLoadError' || this.state.error.message.includes('Failed to fetch dynamically imported module'))) {
        return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Updating app version...</div>;
      }
      return (
        <div style={{ padding: "4rem 2rem", textAlign: "center", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <h2>Oops, something went wrong.</h2>
          <p style={{ color: "#666", marginBottom: "2rem" }}>We encountered an unexpected error. Please refresh the page.</p>
          <button onClick={() => window.location.reload()} style={{ padding: "10px 20px", background: "#1A73E8", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
