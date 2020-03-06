import React, { useState, useEffect, ReactElement } from "react";

type RemoteData =
  | { kind: "Ready" }
  | { kind: "Fetching" }
  | { kind: "Success"; payload: [] }
  | { kind: "Fail"; message: string };

const useFetch = (url: string, options: object) => {
  const [response, setResponse] = React.useState(null);
  useEffect(async (): Promise<object> => {
    const res = await fetch(url, options);
    const json = await res.json();
    setResponse(json);
    return json;
  });
  return response;
};

const FetcherThree: React.FC = (): ReactElement => {
  const [status, setStatus] = useState<RemoteData>({ kind: "Ready" });

  useEffect(() => {
    if (status.kind === "Ready") {
      setStatus({ kind: "Fetching" });
      fetch("https://swapi.co/api/people/")
        .then(response => {
          return response.json();
        })

        .then(result => {
          setStatus({ kind: "Success", payload: result.results });
        })
        .catch(error => {
          setStatus({
            kind: "Fail",
            message: `there has been an error ${error} `
          });
        });
    }
  });
  const renderStuff = (status: RemoteData): JSX.Element => {
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
  };

  return (
    <div>
      <hr />
      {renderStuff(status)}
    </div>
  );
};

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

export default FetcherThree;
