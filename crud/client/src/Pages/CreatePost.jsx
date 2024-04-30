
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../App.css";
import * as Yup from "yup";
import axios from "axios";

const CreatePost = () => {
 
  const initialValue = {
    title: "",
    username: "",
    PostText: "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a title"),
    postText: Yup.string().required("You must input post text"),
    username: Yup.string().min(3).max(15).required("You must input a username"),
  });

  const handleSubmit = (values) => {
  
     axios.post("http://localhost:5000/posts",values).then((res)=>{
      console.log("Created Post");
     })
  };

 
  return (
    <div className="mx-auto d-flex justify-center items-center flex-col form-main-div">
      <div>
        <h1 className="text-center text-red-600 text-5xl">Create Post</h1>
       
      </div>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="formContainer">
            <div>
              <label>Title</label>
              <ErrorMessage component="span" name="title" />
              <Field
                autoComplete="off"
                type="text"
                name="title"
                placeholder="...Title"
                id="inputCreatePost"
              />
            </div>
            <div>
              <label>PostText</label>
              <ErrorMessage component="span" name="postText" />
              <Field
                autoComplete="off"
                type="text"
                name="postText"
                placeholder="...Posttext"
                id="inputCreatePost"
              />
            </div>
            <div>
              <label>Username</label>
              <ErrorMessage component="span" name="username" />
              <Field
                autoComplete="off"
                type="text"
                name="username"
                placeholder="...Username"
                id="inputCreatePost"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Post..." : "Create Post"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePost;


