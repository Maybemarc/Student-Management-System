import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axios";

const initialState = {
  list: [],
  total: 0,
  page: 1,
  pages: 1,
  summary: { labels: [], count: [], summary: [] },
  selectedStudent: null,
  isLoading: false,
  error: null,
};

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async ({ search = " ", page = 1, limit = 10 }, thunkAPI) => {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      params.append("page", page);
      params.append("limit", limit);

      const response = await axios.get(`/student?${params.toString()}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const fetchStudent = createAsyncThunk(
  "students/fetchStudent",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/student/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const createStudent = createAsyncThunk(
  "students/createStudent",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`/student/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.student;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await axios.put(`/student/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.student;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/student/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const fetchStudentSummary = createAsyncThunk(
  "students/fetchStudentSummary",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/student/summary`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetchStudents
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload.students;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //Fetch a Student

      .addCase(fetchStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedStudent = action.payload.student;
      })
      .addCase(fetchStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //Create student
      .addCase(createStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list.push(action.payload);
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //Update a student

      .addCase(updateStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.list.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
        state.selectedStudent = action.payload
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong in update" ;
      })

      //Delete a student

      .addCase(deleteStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = state.list.filter((s) => s._id !== action.payload);
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //Summary

      .addCase(fetchStudentSummary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudentSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.summary = action.payload;
      })
      .addCase(fetchStudentSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;

// export const fetchStudents = createAsyncThunk(
//   "students/fetchStudents",
//   async (query = "", thunkAPI) => {
//     try {
//       const params = new URLSearchParams();

//       if (query) {

//           params.append("name", query);
//         params.append("rollNumber", query);
//         params.append("studentClass", query);
//       }

//       const response = await axios.get(`/student?${params.toString()}`);
//       return response.data.students;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data);
//     }
//   }
// );
