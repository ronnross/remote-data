import React from "react";

type RemoteData =
  | { kind: "Ready" }
  | { kind: "Fetching" }
  | { kind: "Success"; payload: [] }
  | { kind: "Fail"; message: string };

interface MyState {
  status: RemoteData;
}

class FetcherOne extends React.Component<{}, MyState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      status: { kind: "Ready" }
    };
  }
  componentDidMount() {
    const { status } = this.state;
    if (status.kind === "Ready") {
      this.setState({ status: { kind: "Fetching" } });
      fetch("https://swapi.co/api/people/")
        .then(response => {
          return response.json();
        })
        .then(result => {
          this.setState({
            status: { kind: "Success", payload: result.results }
          });
        })
        .catch(error => {
          this.setState({
            status: {
              kind: "Fail",
              message: `there has been an error ${error} `
            }
          });
        });
    }
  }
  renderStuff(status: RemoteData): JSX.Element {
    switch (status.kind) {
      case "Ready":
        return <div>getting ready to fetch</div>;
      case "Fetching":
        return <div>fetching...</div>;
      case "Success":
        return <ShowData data={status.payload} />;
      case "Fail":
        return <ShowError data={status.message} />;
    }
  }

  render() {
    return (
      <div>
        <hr />
        {this.renderStuff(this.state.status)}
      </div>
    );
  }
}

interface ShowDataProps {
  data: [];
}
const ShowData: React.FC<ShowDataProps> = ({ data }) => (
  <ul>
    {data.map(item => (
      <li key={item["name"]}>{item["name"]}</li>
    ))}
  </ul>
);

interface ShowErrorProps {
  data: string;
}
const ShowError: React.FC<ShowErrorProps> = ({ data }) => (
  <div>Some error: {data}</div>
);

export default FetcherOne;
