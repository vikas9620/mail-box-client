import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import InboxMails from "./InboxPage";

describe("InboxMails component", () => {
  const mockStore = configureStore([]);
  const initialState = {
    auth: { userId: "user@example.com" },
  };
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  const sampleEmails = [
    { id: 1, subject: "Email 1", body: "Body 1", read: false },
    { id: 2, subject: "Email 2", body: "Body 2", read: true },
  ];

  test("Rendering Emails", () => {
    const { getByText } = render(
      <Provider store={store}>
        <InboxMails emails={sampleEmails} />
      </Provider>
    );

    const email1Subject = getByText("Email 1");
    const email2Subject = getByText("Email 2");

    expect(email1Subject).toBeInTheDocument();
    expect(email2Subject).toBeInTheDocument();
  });

  test("Marking Email as Read", () => {
    const { container } = render(
      <Provider store={store}>
        <InboxMails emails={sampleEmails} />
      </Provider>
    );

    const unreadEmail = container.querySelector(".email:not(.read)");

    fireEvent.click(unreadEmail);

    expect(unreadEmail).toHaveClass("read");
  });

  test("Deleting Email", async () => {
    const { container, getByText } = render(
      <Provider store={store}>
        <InboxMails emails={sampleEmails} />
      </Provider>
    );

    const deleteButton = getByText("Delete");

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(container.querySelector(".email")).toBeNull();
    });
  });
});
