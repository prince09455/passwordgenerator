"use client";
import { useEffect, useState, useRef } from "react";
import "./PassGen.css";
export default function PassGen() {
  const [length, setLength] = useState("10");
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState(""); // Initialize with an empty string
  const inputVal = useRef(null);

  function genPass() {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyz";
    let num = "0123456789";
    let schar = "!@#$%^&*()_+";

    if (numAllow) {
      str += num;
    }
    if (charAllow) {
      str += schar;
    }

    for (let i = 1; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }

    setPassword(pass);
  }

  useEffect(() => {
    genPass();
  }, [length, numAllow, charAllow]);

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(inputVal.current.value);
    if (inputVal.current) {
      inputVal.current.select();
    }
  };

  return (
    <>
      <div className="p-10 rounded border-solid border-2 border-white-600 shadow-lg main_bg">
        <h1 className="text-center my-10 text-white text-4xl font-bold">
          Password Generator
        </h1>

        <div className="flex justify-center gap-x-3 my-10">
          <input
            type="text"
            placeholder="Generate Password"
            className="p-1 rounded Default border-none outline-none"
            value={password}
            ref={inputVal}
            readOnly
          />
          <button
            onClick={copyToClipboard}
            className="rounded bg-emerald-300 px-3 hover:bg-green-700 hover:text-white transition-all duration-300"
          >
            Copy
          </button>
        </div>
        <div className="rageContainer flex flex-col md:flex-row gap-10 justify-center">
          <div className="rangePicker flex flex-col gap-y-3 my-3 md:my-0">
            <input
              type="range"
              min="8"
              max="50"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="text-white text-center">Length : {length}</label>
          </div>
          <div className="optional flex flex-col md:flex-row   gap-10">
            <div className="includeNumber flex flex-col gap-y-3">
              <input
                type="checkbox"
                onChange={() => {
                  setNumAllow((prev) => !prev);
                }}
              />
              {numAllow ? (
                <label className="text-white text-center">Disable number</label>
              ) : (
                <label className="text-white text-center">Enable Number</label>
              )}
            </div>
            <div className="includeChar flex flex-col gap-y-3">
              <input
                type="checkbox"
                onChange={() => {
                  setCharAllow((prev) => !prev);
                }}
              />
              {charAllow ? (
                <label className="text-white text-center">
                  Disable Spacial Character
                </label>
              ) : (
                <label className="text-white text-center">
                  Enabled Spacial Character
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
