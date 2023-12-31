import React, { useState } from "react";
import Button from "./Button";

const FormSplitBill = ({ selectedFriend, onSplitBill }) => {
  const { name } = selectedFriend || {};

  console.log(selectedFriend);

  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const paidByFriend = bill ? bill - paidByUser : "";

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <>
      <form className="form-split-bill" onSubmit={handleSubmit}>
        <h2>Split a bill with {name}</h2>

        <label>💰 Bill value</label>
        <input
          type="number"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
          required
        />

        <label>🧑 Your expense</label>
        <input
          type="number"
          value={paidByUser}
          onChange={(e) =>
            setPaidByUser(
              Number(e.target.value) > bill
                ? paidByUser
                : Number(e.target.value)
            )
          }
          required
        />

        <label>🧑‍🤝‍🧑 {name}'s expense</label>
        <input type="number" value={paidByFriend} disabled />

        <label>🤑 Who is paying the bill</label>
        <select
          value={whoIsPaying}
          onChange={(e) => setWhoIsPaying(e.target.value)}
          required
        >
          <option value="user">You</option>
          <option value="friend">{name}</option>
        </select>

        <Button>Split Bill</Button>
      </form>
    </>
  );
};

export default FormSplitBill;
