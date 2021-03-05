import React, { Component, Fragment } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import RSelect from "react-select";
import { Formik } from "formik";
import { withNoteContext } from "../../contexts/NoteContext";
import ColorEditor from "../ColorEditor/ColorEditor";
import * as Yup from "yup";
import NoteService from "../../services/NoteService";

const NoteAddEditFormValidationSchema = Yup.object().shape({
  title: Yup.string().required("Please enter note title"),
});

const AddEditNoteFormRoot = styled.div`
  h1 {
    margin: 0 0 10px 0;
  }

  .form-group {
    margin-bottom: 10px;

    label {
      display: block;
      margin-bottom: 5px;
    }

    input.textbox {
      width: 100%;
      padding: 6px;
      border: 1px solid #ddd;
      outline: none;
      border-radius: 4px;
      font-size: 20px;
      font-weight: bold;
    }

    span.feedback {
      font-size: 14px;
      color: red;
    }
  }
`;

const editorModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};

class AddEditNoteForm extends Component {
  render() {
    return (
      <Formik
        initialValues={{
          id: (this.props.note && this.props.note.id) || 0,
          title: (this.props.note && this.props.note.title) || "",
          text: (this.props.note && this.props.note.text) || "",
          tags: (this.props.note && this.props.note.tags) || [],
          color: (this.props.note && this.props.note.color) || {},
        }}
        onSubmit={async (values, action) => {
          switch (this.props.mode.toLowerCase()) {
            case "create":
              action.setSubmitting(true);
              const noteToCreate = {
                id: values.id,
                title: values.title,
                text: values.text,
                color: { ...values.color },
                tags: [...values.tags],
              };
              const noteCreateResult = await NoteService.addNote(noteToCreate);
              if (noteCreateResult && noteCreateResult.id > 0) {
                this.props.appContext.addNoteSuccess(noteCreateResult);
                action.setSubmitting(false);
                this.props.closeModal();
              }
              break;
            case "edit":
              action.setSubmitting(true);
              const noteToUpdate = {
                id: values.id,
                title: values.title,
                text: values.text,
                color: { ...values.color },
                tags: [...values.tags],
              };
              const noteUpdateResult = await NoteService.updateNote(
                noteToUpdate
              );
              if (noteUpdateResult && noteUpdateResult.id > 0) {
                this.props.appContext.updateNoteSucess(noteUpdateResult);
                action.setSubmitting(false);
                this.props.closeModal();
              }
              break;
          }
        }}
        validationSchema={NoteAddEditFormValidationSchema}
      >
        {(formikProps) => (
          <Fragment>
            <div className="content">
              <AddEditNoteFormRoot>
                <h1>{this.props.mode === "create" ? "Create" : "Edit"} Note</h1>
                <div className="form-group">
                  <label htmlFor="title">
                    <input
                      type="text"
                      className="textbox"
                      name="title"
                      value={formikProps.values.title}
                      onChange={formikProps.handleChange}
                    />
                  </label>
                  {formikProps.touched.title && formikProps.errors.title && (
                    <span className="feedback">{formikProps.errors.title}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="text">
                    <ReactQuill
                      theme="snow"
                      value={formikProps.values.text}
                      modules={editorModules}
                      onChange={(value) => {
                        formikProps.setFieldValue("text", value);
                      }}
                      name="text"
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="tags">Choose tags</label>
                  <RSelect
                    value={formikProps.values.tags}
                    onChange={(value) => {
                      formikProps.setFieldValue("tags", [...value]);
                    }}
                    options={this.props.appContext.tags}
                    getOptionLabel={(option) => option.text}
                    getOptionValue={(option) => option.id}
                    isMulti
                    name="tags"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="color">Choose Color</label>
                  <ColorEditor
                    colors={this.props.appContext.colors}
                    selectedColor={formikProps.values.color.code}
                    onColorClick={(color) => {
                      formikProps.setFieldValue("color", color);
                    }}
                  />
                </div>
              </AddEditNoteFormRoot>
            </div>
            <div className="footer">
              <button
                className="primary"
                type="submit"
                onClick={formikProps.handleSubmit}
              >
                Save
              </button>
              <button
                className="secondary"
                onClick={() => {
                  this.props.closeModal();
                }}
              >
                Close
              </button>
            </div>
          </Fragment>
        )}
      </Formik>
    );
  }
}

export default withNoteContext(AddEditNoteForm);
