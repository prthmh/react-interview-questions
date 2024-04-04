import React, { useState } from "react";
import InputComp from "./InputComp";
import { allTenures } from "../utils/constants";
import { numberWithCommas } from "../utils/numberWithCommas";

const EMIComp = () => {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(0);
  const [fee, setFee] = useState(0);
  const [downpayment, setDownpayment] = useState(0);
  const [emi, setEmi] = useState(0);
  const [tenure, setTenure] = useState(0);

  const calculateEMI = (downpayment) => {
    if (!cost) return;

    const loanAmt = cost - downpayment;
    const interestRate = interest / 100;
    const numOfYers = tenure / 12;
    // EMI amount = [P x R x (1+R)^N]/[(1+R)^N-1]
    const EMI =
      (loanAmt * interestRate * (1 + Math.pow(1 + interestRate, numOfYers))) /
      Math.pow(1 + interestRate, numOfYers - 1);

    return Number(EMI / 12).toFixed(0);
  };

  const calculateDP = (emi) => {
    if (!cost) return;

    const downPaymentPercent = 100 - (emi / calculateEMI(0)) * 100;
    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  };

  const updateEMI = (e) => {
    if (!cost) return;

    const usersDP = Number(e.target.value);
    setDownpayment(usersDP.toFixed(0));

    const newEMI = calculateEMI(usersDP);
    setEmi(newEMI);
  };
  const updateDownpayment = (e) => {
    if (!cost) return;

    const usersEmi = Number(e.target.value);
    setEmi(usersEmi.toFixed(0));

    const newDP = calculateDP(usersEmi);
    setDownpayment(newDP);
  };

  const totDownPayment = () => {
    return numberWithCommas(
      (Number(downpayment) + (cost - downpayment) * (fee / 100)).toFixed(0)
    );
  };

  const totEMI = () => {
    return numberWithCommas((emi * tenure).toFixed(0));
  };

  return (
    <div className=" p-8 flex flex-col gap-4 rounded-3xl w-96 bg-blue-400">
      <h2 className=" text-3xl font-bold">EMI Calculator</h2>

      <h4 className=" text-xl font-semibold">Total Cost of Asset</h4>
      <InputComp
        type="text"
        placeholder="Enter total cost"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
      />

      <h4 className=" text-xl font-semibold">Interest Rate (In %)</h4>
      <InputComp
        type="text"
        placeholder="Enter interest rate"
        value={interest}
        onChange={(e) => {
          const int = e.target.value;
          if (int > 100) {
            alert("Can't have interest more than 100%");
            setInterest(0);
            return;
          }
          setInterest(int);
        }}
      />

      <h4 className=" text-xl font-semibold">Processing Fee (In %)</h4>
      <InputComp
        type="text"
        placeholder="Enter processing rate"
        value={fee}
        onChange={(e) => {
          const int = e.target.value;
          if (int > 100) {
            alert("Can't have processing rate more than 100%");
            setFee(0);
            return;
          }
          setFee(int);
        }}
      />

      <h4 className=" text-xl font-semibold">Down payment</h4>
      <h3 className=" text-xl font-bold underline">
        Total Down Payment - {totDownPayment}
      </h3>
      <InputComp
        type="range"
        value={downpayment}
        min={0}
        max={cost}
        onChange={updateEMI}
        maxLabel={"100%"}
        minLabel={"0%"}
      />

      <h4 className=" text-xl font-semibold">Loan per month(EMI)</h4>
      <h3 className=" text-xl font-bold underline">
        Total Loan Amount - {totEMI}
      </h3>
      <InputComp
        type="range"
        value={emi}
        min={calculateEMI(cost)}
        max={calculateEMI(0)}
        onChange={updateDownpayment}
      />

      {/* tenure */}
      <h4 className=" text-xl font-semibold">Tenure</h4>
      <div className=" flex justify-between">
        {allTenures?.map((ele, i) => (
          <button
            key={i}
            className={` text-blue-300 font-semibold px-4 py-1 rounded-3xl ${
              ele === tenure ? "bg-blue-950" : "bg-neutral-900"
            } `}
            onClick={() => setTenure(ele)}
          >
            {ele}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EMIComp;
