import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto my-24 max-w-3xl rounded-3xl border border-red-500/20 bg-slate-900/90 p-12 text-center">
          <h1 className="text-3xl font-semibold text-white">Something went wrong.</h1>
          <p className="mt-4 text-slate-300">{this.state.message || 'An unexpected error occurred.'}</p>
          <button onClick={() => window.location.reload()} className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
