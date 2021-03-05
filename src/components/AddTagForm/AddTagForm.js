import React, { Component } from "react";
import styled from "styled-components";
import { MdAddCircleOutline } from "react-icons/md";
import { Formik } from "formik";
import * as Yup from "yup";
import NoteService from "../../services/NoteService";
import { withNoteContext } from "../../contexts/NoteContext";

const FormValidationSchema = Yup.object().shape({
  tagText: Yup.string()
    .required("Please enter a tag")
    .test("checkDuplicateTag", "Tag already exists", function (value) {
      return new Promise(async (resolve, reject) => {
        try {
          const tagStatus = await NoteService.isTagExists(value);
          resolve(!tagStatus.status);
        } catch (e) {
          resolve(this.createError({ message: "Error checking duplicates" }));
        }
      });
    }),
});

const AddTagFormRoot = styled.section`
  box-sizing: border-box;
  margin-top: 10px;
  padding-left: 15px;
  padding-right: 15px;

  .feedback {
    color: red;
    font-size: 12px;
  }

  .input-group {
    display: flex;
    align-items: center;

    input {
      padding: 5px;
      border-radius: 3px;
      outline: none;
      border: 1px solid purple;
      width: 100%;
    }

    svg {
      display: block;
    }
  }
`;

class AddTagForm extends Component {
  render() {
    return (
      <Formik
        initialValues={{
          tagText: "",
        }}
        onSubmit={async (values, actions) => {
          try {
            actions.setSubmitting(true);
            const result = await NoteService.addtag(values.tagText);
            if (result && result.id > 0) {
              this.props.appContext.addTagSuccess(result);
              actions.setSubmitting(false);
              actions.resetForm();
            }
          } catch (e) {}
        }}
        validationSchema={FormValidationSchema}
      >
        {(formikProps) => (
          <AddTagFormRoot>
            <div className="input-group">
              <input
                type="text"
                name="tagText"
                value={formikProps.values.tagText}
                onChange={formikProps.handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    formikProps.submitForm();
                  }
                }}
              />
              <MdAddCircleOutline size="24px" />
            </div>
            <div>
              {formikProps.errors.tagText && (
                <span className="feedback">{formikProps.errors.tagText}</span>
              )}
            </div>
          </AddTagFormRoot>
        )}
      </Formik>
    );
  }
}

export default withNoteContext(AddTagForm);
