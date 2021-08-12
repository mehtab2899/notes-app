import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Main from "../components/Main";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { updateProfile } from "../actions/userActions";

const Profile = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState();
  const [uploading, setUploading] = useState();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [history, userInfo]);

  const uploadPicHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setPic(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email, password, pic }));
  };

  return (
    <Main title="EDIT PROFILE">
      <div>
        <Row className="profile-container">
          <Col md={8}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {error && <Message variant="danger">{error}</Message>}
              {success && <Message variant="success">Profile Updated</Message>}

              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email" className="my-2">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="pic" className="my-2">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.Control
                  type="text"
                  value={pic}
                  onChange={(e) => setPic(e.target.value)}
                ></Form.Control>
                <Form.File
                  className="mt-1"
                  id="image-file"
                  custom
                  label="Choose Profile Picture"
                  onChange={uploadPicHandler}
                ></Form.File>
                {uploading && <Loading />}
              </Form.Group>

              <Button type="submit" varient="primary">
                Update
              </Button>
            </Form>
          </Col>

          <Col>
            <img
              src={pic}
              alt="profile-pic"
              className="img-fluid profile-img"
            />
          </Col>
        </Row>
      </div>
    </Main>
  );
};

export default Profile;
