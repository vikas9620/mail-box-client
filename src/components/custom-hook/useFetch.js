import { useState, useEffect } from "react";

const useFetchMails = (email) => {
  const [emails, setEmails] = useState([]);

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
        const count = updatedEmails.length;
        dispatch(authAction.setSentMailsCount({ sentMailsCount: count }));
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

  return emails;
};

export default useFetchMails;
