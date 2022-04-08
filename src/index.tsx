import * as esbuild from "esbuild-wasm";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [text, setText] = useState("");
  const [code, setCode] = useState("");

  const submitText = () => {
    console.log(text);
  };

  const startService = async () => {
    const service = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });

    console.log(service);
  };

  useEffect(() => {
    startService();
  }, []);

  return (
    <div>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
      ></textarea>
      <div>
        <button onClick={submitText}>Submit</button>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
