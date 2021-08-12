import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Accordion, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Main from "../components/Main";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { listNotes, deleteNote } from "../actions/noteActions";

const Notes = ({ history, search }) => {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { error, loading, notes } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch(listNotes());
    window.scrollTo(0, 0);
  }, [
    userInfo,
    history,
    successCreate,
    dispatch,
    successUpdate,
    successDelete,
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNote(id));
    }
  };

  return (
    <Main title={`Welcome ${userInfo && userInfo.name}`.toUpperCase()}>
      <Link to="/createnote">
        <Button>Create New Note</Button>
      </Link>
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingDelete && <Loading />}
      {loading && <Loading />}
      {error && <Message variant="danger">{error}</Message>}
      {notes
        ?.reverse()
        .filter((filteredNote) =>
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((note) => (
          <Accordion className="mt-2" key={note._id}>
            <Card>
              <Card.Header className="card-header">
                <span>
                  <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                    {note.title}
                  </Accordion.Toggle>
                </span>
                <div>
                  <Button href={`/note/${note._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => handleDelete(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body className="card-body">
                  <h4>
                    <Badge variant="success">Category - {note.category}</Badge>
                  </h4>
                  <blockquote className="blockquote mt-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer mt-2">
                      Created On
                      <cite title="Source Title">
                        {note.createdAt.substring(0, 10)}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
    </Main>
  );
};

export default Notes;
