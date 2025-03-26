
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#061428] text-white p-4">
          <div className="max-w-md p-6 bg-[#0F2643] rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-red-400 mb-4">Something went wrong</h1>
            <p className="mb-4 text-blue-100">The application encountered an unexpected error.</p>
            {this.state.error && (
              <div className="p-3 bg-[#081526] rounded mb-4 overflow-auto max-h-32">
                <code className="text-sm text-red-300">{this.state.error.message}</code>
              </div>
            )}
            <Button 
              className="bg-gradient-to-r from-blue-400 to-cyan-300 text-blue-900 w-full"
              onClick={() => window.location.reload()}
            >
              Reload Application
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
