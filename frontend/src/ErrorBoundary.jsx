import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(err) {
        console.error("App crashed:", err);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: 20 }}>
                    ❌ Application crashed. Check console logs.
                </div>
            );
        }
        return this.props.children;
    }
}
