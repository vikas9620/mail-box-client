import React, { useState, useEffect } from "react";
import { Accordion, Button, Container, ListGroup } from "react-bootstrap";
import "./Inboxpage.css";
import { useSelector } from "react-redux";

const InboxMails = () => {
  const [emails, setEmails] = useState([]);
  const email = useSelector((state) => state.auth.userId);

  const fetchMails = async () => {
    try {
      const response = await fetch(
        `https://mail-box-client-7bbd8-default-rtdb.firebaseio.com/${email}/inbox.json`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();

        const updatedEmails = Object.keys(data).map((emailId) => {
          const email = data[emailId];
          return { id: emailId, ...email };
        });
        setEmails(updatedEmails);
      } else {
        throw new Error("Error fetching emails");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMails();
    
  },[]);

  const markAsRead = (emailId) => {
    setEmails((prevEmails) => {
      return prevEmails.map((email) => {
        if (email.id === emailId) {
          return { ...email, read: true };
        }
        return email;
      });
    });
  };
  const deleteEmail = (emailId) => {
    setEmails((prevEmails) =>
      prevEmails.filter((email) => email.id !== emailId)
    );
  };
  const renderEmails = () => {
    return emails.map((email) => (
      <Accordion key={email.id} className={`email${email.read ? "" : " read"}`}>
        <Accordion.Item
          eventKey={email.id.toString()}
          onClick={() => markAsRead(email.id)}
        >
          <Accordion.Header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{email.subject}</span>
            <div>
            <Button variant='outline-danger' size="sm" onClick={() => deleteEmail(email.id)}>Delete</Button>
          </div>
          </Accordion.Header>
          <Accordion.Body>{email.body}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    ));
  };

  return (
    <Container>
      <ListGroup>{renderEmails()}</ListGroup>
    </Container>
  );
};

export default InboxMails;
