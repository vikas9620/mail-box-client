import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { useSelector } from "react-redux";
const EmailForm = () => {
  const [toEmail, setToEmail] = useState("");
const emailId = useSelector(state=> state.auth.userId)
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    setBody(draftToHtml(convertToRaw(newEditorState.getCurrentContent())));
  };

  const handleTextAreaChange = (event) => {
    const htmlValue = event.target.value;
    const contentBlock = htmlToDraft(htmlValue);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
      console.log(editorState);
    }
  };
  const handleToEmailChange = (event) => {
    setToEmail(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleSendEmail = () => {
    if (!validateEmail(toEmail)) {
      alert("Invalid email");
      return;
    }
  
    if (subject.trim() === "") {
      alert("Subject is required");
      return;
    }
    const emailAddress = toEmail.replace(/[@.]/g, "")

    const emailData = {
      subject: subject,
      body: body.replace(/<p>/g, '').replace(/<\/p>/g, ''),
      email: emailId
    };
  

    fetch(`https://mail-box-client-7bbd8-default-rtdb.firebaseio.com/${emailAddress}/inbox.json`,{
      method: "POST",
      body: JSON.stringify(emailData),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
      if (response.ok) {
        console.log("Email sent successfully");
        setToEmail("");
        setSubject("");
        setBody("");
      } else {
        console.log("Failed to send email");
      }
    })
    .catch(error => {
      console.log("Error sending email:", error);
    });

    fetch(`https://mail-box-client-7bbd8-default-rtdb.firebaseio.com/${emailId}/sentmails.json`,{
      method: "POST",
      body: JSON.stringify(emailData),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
    })
    .catch(error => {
      console.log("Error sending email:", error);
    });



    console.log("Sending email...");
    console.log("To: ", toEmail);

    console.log("Subject: ", subject);
    console.log("Body: ", body);

    setToEmail("");

    setSubject("");
    setBody("");
  
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">Compose Email</div>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="toEmail">To:</label>
            <input
              type="email"
              className="form-control"
              id="toEmail"
              value={toEmail}
              onChange={handleToEmailChange}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: "1rem" }}>
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              className="form-control"
              id="subject"
              value={subject}
              onChange={handleSubjectChange}
              required
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
              wrapperStyle={{
                border: "1px solid #ccc",
                padding: "5px",
                margin: "1px",
              }}
            />
            <textarea hidden
              value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
              onChange={handleTextAreaChange}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSendEmail}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
