import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-screen bg-[#faf8f5] text-[#111] p-8 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-light mb-4">Rejouice — Reloading Session</h1>
          <p className="text-sm text-black/60 mb-6 font-mono">
            {this.state.error?.message || 'An unexpected state occurred.'}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-full bg-black text-white text-xs uppercase tracking-widest cursor-pointer hover:bg-black/80"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

