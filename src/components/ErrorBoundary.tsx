import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error);
    console.error('Component stack:', errorInfo.componentStack);
    this.setState({ errorInfo });
    this.props.onError?.(error, errorInfo);
    if (typeof window !== 'undefined' && window.performance) {
      if ((window.performance as any).memory) {
        console.info('Memory at crash:', (window.performance as any).memory);
      }
      if (window.performance.getEntriesByType) {
        const navEntry = window.performance.getEntriesByType('navigation')[0];
        console.info('Navigation timing:', navEntry);
      }
    }
  }

  private handleReload = () => {
    window.location.reload();
  }

  private handleResetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  }

  public render() {
    if (this.state.hasError && this.props.fallback) {
      return this.props.fallback;
    }

    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#061428] text-white p-4">
          <div className="max-w-md p-6 bg-[#0F2643] rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-red-400 mb-4">Something went wrong</h1>
            <p className="mb-4 text-blue-100">The application encountered an unexpected error.</p>
            {this.state.error && (
              <div className="p-3 bg-[#081526] rounded mb-4 overflow-auto max-h-32">
                <code className="text-sm text-red-300">{this.state.error.toString()}</code>
              </div>
            )}
            {this.state.errorInfo && (
              <div className="p-3 bg-[#081526] rounded mb-4 overflow-auto max-h-32">
                <code className="text-sm text-gray-300">{this.state.errorInfo.componentStack}</code>
              </div>
            )}
            <div className="flex gap-2 mt-4">
              <Button 
                className="bg-gradient-to-r from-blue-400 to-cyan-300 text-blue-900 flex-grow"
                onClick={this.handleReload}
              >
                Reload Application
              </Button>
              <Button 
                variant="outline" 
                className="border-blue-500 text-blue-300 flex-grow"
                onClick={this.handleResetError}
              >
                Try to Continue
              </Button>
            </div>
            <p className="text-xs text-blue-300/60 mt-4 text-center">
              If the problem persists, please contact support.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export const DefaultErrorBoundary: React.FC<{children: ReactNode}> = ({ children }) => (
  <ErrorBoundary>{children}</ErrorBoundary>
);

export const ComponentErrorBoundary: React.FC<{
  children: ReactNode;
  component: string;
}> = ({ children, component }) => (
  <ErrorBoundary
    fallback={
      <div className="p-4 bg-red-900/20 border border-red-900/30 rounded-md text-red-200">
        <h3 className="font-medium">Component Error</h3>
        <p>Failed to load {component}. Please try again later.</p>
      </div>
    }
  >
    {children}
  </ErrorBoundary>
);
