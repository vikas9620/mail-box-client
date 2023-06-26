import React, { useState, useEffect } from "react";
import { Accordion, Container, ListGroup } from "react-bootstrap";

import { useSelector } from "react-redux";

const DeletedMails = () => {
  const [emails, setEmails] = useState([]);
  const useremail = useSelector((state) => state.auth.userId);

  const fetchMails = async () => {
    try {
      const response = await fetch(
        `https://mail-box-client-7bbd8-default-rtdb.firebaseio.com/${useremail}/deletedmails.json`,
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
  }, []);

  const renderEmails = () => {
    return emails.map((email) => (
      <Accordion key={email.id} >
        <Accordion.Item eventKey={email.id.toString()}>
          <Accordion.Header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {email.subject}
          </Accordion.Header>
          <Accordion.Body>{email.body}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    ));
  };

  return (
    <Container style={{background: 'rgb(131,58,180)',marginTop: '1rem',
        background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)'}}>
      <ListGroup>{renderEmails()}</ListGroup>
    </Container>
  );
};

export default DeletedMails;
