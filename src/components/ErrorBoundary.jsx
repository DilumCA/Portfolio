import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[40vh] flex items-center justify-center text-center px-4">
          <div>
            <p className="text-4xl mb-4">⚠️</p>
            <h2 className="heading-md mb-2">Something went wrong</h2>
            <p className="text-body mb-6">This section failed to load.</p>
            <button
              className="btn-outline"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
