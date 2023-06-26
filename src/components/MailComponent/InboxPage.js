import React, { useState, useEffect } from "react";
import { Accordion, Button, Container, ListGroup } from "react-bootstrap";
import "./Inboxpage.css";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/Auth";

const InboxMails = () => {
  const [emails, setEmails] = useState([]);
  const useremail = useSelector((state) => state.auth.userId);
  
const dispatch = useDispatch()
  const fetchMails = async () => {
    try {
      const response = await fetch(
        `https://mail-box-client-7bbd8-default-rtdb.firebaseio.com/${useremail}/inbox.json`,
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
        const count = updatedEmails.filter((email) => !email.read).length;
       dispatch(authAction.setUnreadCount({unreadCount: count}));
      } else {
        throw new Error("Error fetching emails");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchEmailsInterval = setInterval(fetchMails, 2000);
  
    return () => {
      clearInterval(fetchEmailsInterval);
    };
  }, []);

  const markAsRead = (emailId) => {
    setEmails((prevEmails) => {
      return prevEmails.map((email) => {
        if (email.id === emailId && !email.read) {
          // Send PATCH request to update read status in the backend
          fetch(
            `https://mail-box-client-7bbd8-default-rtdb.firebaseio.com/${useremail}/inbox/${emailId}.json`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ read: true }),
            }
          ).catch((error) => {
            console.log("Error updating read status:", error);
          });

          return { ...email, read: true };
        }
        return email;
      });
    });
  };

  const deleteEmail = async (emailId) => {
    const deletedEmail = emails.find((email) => email.id === emailId);

    try {
      // Send POST request to new API before deleting the email
      await fetch(`https://mail-box-client-7bbd8-default-rtdb.firebaseio.com/${useremail}/deletedmails.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deletedEmail),
      });
    } catch (error) {
      console.log("Error posting deleted email:", error);
    }

    try {
      // Delete the email from the inbox in the backend
      await fetch(
        `https://mail-box-client-7bbd8-default-rtdb.firebaseio.com/${useremail}/inbox/${emailId}.json`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.log("Error deleting email from backend:", error);
    }

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
            
          >
            <span>{email.subject}</span>
            <div>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => deleteEmail(email.id)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >Delete</Button>
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
