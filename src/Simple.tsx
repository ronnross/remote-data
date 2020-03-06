import React from "react";

type Status = "OPEN" | "CLOSE";
interface MyState {
  status: Status;
}

export default class StatusSummary extends React.Component<{}, MyState> {
  state: MyState = { status: "OPEN" };

  switchStatus() {
    switch (this.state.status) {
      case "OPEN":
        this.setState({ status: "CLOSE" });
        break;
      case "CLOSE":
        this.setState({ status: "OPEN" });
        break;
    }
  }

  render() {
    const { status } = this.state;
    return (
      <div>
        <h1>{status}</h1>
        <button onClick={() => this.switchStatus()}>click me</button>
        {status === "OPEN" && <div>drawer is open</div>}
        {status === "CLOSE" && <div>drawer is closed</div>}
      </div>
    );
  }
}
