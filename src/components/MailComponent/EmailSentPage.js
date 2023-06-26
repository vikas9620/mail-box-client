import React, { useState, useEffect } from "react";
import { Accordion, Container, ListGroup } from "react-bootstrap";

import { useSelector } from "react-redux";

const SentEmailsPage = () => {
  const [emails, setEmails] = useState([]);
  const email = useSelector((state) => state.auth.userId);

  const fetchMails = async () => {
    try {
      const response = await fetch(
        `https://mail-box-client-7bbd8-default-rtdb.firebaseio.com/${email}/sentmails.json`,
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

 
 
  const renderEmails = () => {
    return emails.map((email) => (
      <Accordion key={email.id}>
        <Accordion.Item
          eventKey={email.id.toString()}
         
        >
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
    <Container>
      <ListGroup>{renderEmails()}</ListGroup>
    </Container>
  );
};

export default SentEmailsPage;
