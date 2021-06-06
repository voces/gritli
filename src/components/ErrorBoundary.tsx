import { React } from "../deps.ts";

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: string | undefined }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { error: error.message };
  }

  // componentDidCatch(error: Error, errorInfo: unknown) {
  //   // You can also log the error to an error reporting service
  //   console.log(error, errorInfo);
  // }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return <span style={{ color: "red" }}>{this.state.error}</span>;
    }

    return this.props.children;
  }
}
