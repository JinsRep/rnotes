import { API_BASE_URL } from "../constants/appconstants";
import axios from "axios";

const NoteService = {
  getTags: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/tags`);
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(new Error("Error fetching tags"));
        }
      } catch (e) {
        reject(e);
      }
    });
  },
  getColors: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/colors`);
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(new Error("Error fetching colors"));
        }
      } catch (e) {
        reject(e);
      }
    });
  },
  getNotes: (tag, color, searchKeyword = "") => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/notes?tag=${tag}&color=${color}&word=${searchKeyword}`
        );
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(new Error("Error fetching notes"));
        }
      } catch (e) {
        reject(e);
      }
    });
  },
  getNoteById: (noteId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/notes/${noteId.toString()}`
        );
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(new Error("Error fetching note"));
        }
      } catch (e) {
        reject(e);
      }
    });
  },
  isTagExists: (tagText) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/tags/exists?text=${tagText.trim()}`
        );
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve({ status: null });
        }
      } catch (e) {
        reject(e);
      }
    });
  },
  addtag: (tagText) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = { text: tagText };
        const response = await axios.post(`${API_BASE_URL}/tags`, data);
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(new Error("Error adding tag"));
        }
      } catch (e) {
        reject(e);
      }
    });
  },
  addNote: (note) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = { ...note };
        const response = await axios.post(`${API_BASE_URL}/notes`, data);
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve({ id: 0 });
        }
      } catch (e) {
        reject(new Error("Error adding note"));
      }
    });
  },
  updateNote: (note) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = { ...note };
        const response = await axios.put(
          `${API_BASE_URL}/notes/${note.id}`,
          data
        );
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve({ id: 0 });
        }
      } catch (e) {
        reject(new Error("Error editing note"));
      }
    });
  },
  deleteNote: (Id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.delete(`${API_BASE_URL}/notes/${Id}`);
        if (response.status === 200) {
          resolve(response.data);
        } else {
          resolve({ id: 0 });
        }
      } catch (e) {
        reject(new Error("Error deleting note"));
      }
    });
  },
  buildUrl: (tag, color, searchKeyWord = "") => {
    let url = "";

    if (tag && tag.trim().toLowerCase() !== "all") {
      url = url + "/tag/" + tag.trim();
    }

    if (color && color.trim().toLowerCase() !== "all") {
      url = url + "/color/" + color.trim();
    }

    if (searchKeyWord && searchKeyWord.trim() !== "") {
      url = url + "/word/" + encodeURI(searchKeyWord.trim());
    }

    if (url === "") {
      url = "/";
    }

    return url;
  },
};

export default NoteService;
