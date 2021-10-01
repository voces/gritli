import { createElement, Component } from "react";

export class ErrorBoundary extends Component<
  { children: React.ReactNode },
  { error: string | undefined }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { error: error.message };
  }

  // componentDidCatch(error: Error, errorInfo: unknown) {
  //   // You can also log the error to an error reporting service
  //   console.log(error, errorInfo);
  // }

  render() {
    if (this.state.error) {
      return <span style={{ color: "red" }}>{this.state.error}</span>;
    }

    return this.props.children;
  }
}
