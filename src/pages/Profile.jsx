import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

const Profile = () => {
  const auth = getAuth();

  const [changedDetails, setChangedDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onSubmit = async() => {
    try {
      if(auth.currentUser.displayName !== name) {
        //update display name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        //update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name
        })
      }
    } catch (err) {
      toast.error('Could not update profile details')
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id] : e.target.value
    }))
  }

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changedDetails && onSubmit();
              setChangedDetails((prevState) => !prevState);
            }}
          >
            {changedDetails ? "done" : "change"}
          </p>
        </div>

        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name"
              className={!changedDetails ? "profileName" : "profileNameActive"}
              disabled={!changedDetails}
              value={name}
              onChange={onChange}
            />

            <input
              type="text"
              id="email"
              className={!changedDetails ? "profileEmail" : "profileEmailActive"}
              disabled={!changedDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;
