import React, { useState } from "react";
import {
  Badge,
  Row,
  Col,
  InputGroup,
  FormControl,
  Card,
  Button,
} from "react-bootstrap";
import EmailForm from "../MailComponent/MailForm";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/Auth";
import InboxMails from "../MailComponent/InboxPage";
import SentEmailsPage from "../MailComponent/EmailSentPage";
import DeletedMails from "../MailComponent/DeletedPage";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState("");
  const user = useSelector((state) => state.auth.userId);
  const unreadmails = useSelector((state) => state.auth.unreadCount)
  const sentEmails = useSelector((state) => state.auth.sentMailsCount)
  let inboxCount = 1;
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(authAction.logout());
    navigate("/login");
  };
  let renderPage;
  if (page === "inbox") {
    renderPage = <InboxMails />;
  } else if (page === "sentmails") {
    renderPage = <SentEmailsPage />;
  } else if (page === "deletedEmails") {
    renderPage = <DeletedMails />;
  } else if (page === "emailform") {
    renderPage = <EmailForm />;
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <Row className="justify-content-between align-items-center mb-4">
        <Col xs="auto">
          <img
            style={{ marginLeft: "5rem" }}
            width="64"
            height="64"
            src="https://img.icons8.com/fluency/48/circled-envelope.png"
            alt="circled-envelope"
          />
          <h2>Mail Box Client</h2>
        </Col>
        <Col xs="auto">
          <InputGroup style={{ width: "800px" }}>
            <FormControl placeholder="Search" />
          </InputGroup>
        </Col>
        <Col xs="auto">
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/fluency/48/gender-neutral-user.png"
            alt="gender-neutral-user"
          />
          {user}
        </Col>
      </Row>

      <Row
        style={{
          backgroundColor: "black",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <Col sm={2} style={{ display: "flex", flexDirection: "column" }}>
          <Button
            variant="primary"
            className="mb-3"
            onClick={() => {
              setPage("inbox");
            }}
          >
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/3d-fluency/94/mail.png"
              alt="mail"
            />
            Inbox{" "}
            {inboxCount > 0 && (
              <Badge pill bg="danger" className="count">
                {unreadmails}
              </Badge>
            )}
          </Button>
          <Button
            variant="secondary"
            className="mb-3"
            size="large"
            onClick={() => {
              setPage("sentmails");
            }}
          >
            <img
              width="32"
              height="32"
              src="https://img.icons8.com/arcade/64/sent.png"
              alt="sent"
            />
            Email Sent
            {inboxCount > 0 && (
              <Badge pill bg="danger" className="count">
                {sentEmails}
              </Badge>
            )}
          </Button>
          <Button
            variant="success"
            className="mb-3"
            onClick={() => {
              setPage("emailform");
            }}
          >
            <img
              width="32"
              height="32"
              src="https://img.icons8.com/fluency/48/composing-mail.png"
              alt="composing-mail"
            />
            Compose Mail
          </Button>
          <Button
            variant="warning"
            className="mb-5"
            onClick={() => {
              setPage("deletedEmails");
            }}
          >
            <img
              width="32"
              height="32"
              src="https://img.icons8.com/fluency/48/deleted-message.png"
              alt="deleted-message"
            />
            Deleted Mails
          </Button>
          <div className="mt-auto" style={{ margin: "0 auto" }}>
            <Button variant="danger" onClick={logoutHandler}>
              Logout
            </Button>
          </div>
        </Col>
        <Col>
          <Card style={{ paddingBottom: "2rem" }}>{renderPage}</Card>
        </Col>
      </Row>
    </div>
  );
};

export default MainPage;
