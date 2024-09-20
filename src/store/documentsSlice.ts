import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const HOST = "https://test.v5.pryaniky.com";

export interface Document {
  id: string;
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
}

export interface DocumentsState {
  data: Document[];
  loading: boolean;
  error: string | null;
}

export const fetchDocuments = createAsyncThunk<
  Document[],
  string,
  { rejectValue: string }
>("documents/fetchDocuments", async (token: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${HOST}/ru/data/v3/testmethods/docs/userdocs/get`,
      {
        headers: {
          "x-auth": token,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.data) {
      const errorResponse = axiosError.response.data as {
        error_code?: number;
        error_text?: string;
      };

      const errorMessage = errorResponse.error_text || axiosError.message;

      return rejectWithValue(errorMessage);
    }

    return rejectWithValue(axiosError.message);
  }
});

export const createDocument = createAsyncThunk<
  Document,
  { token: string; document: Omit<Document, "id"> },
  { rejectValue: string }
>(
  "documents/createDocument",
  async ({ token, document }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${HOST}/ru/data/v3/testmethods/docs/userdocs/create`,
        document,
        {
          headers: {
            "x-auth": token,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.data) {
        const errorResponse = axiosError.response.data as {
          error_code?: number;
          error_text?: string;
        };
        const errorMessage = errorResponse.error_text || axiosError.message;
        return rejectWithValue(errorMessage);
      }
      return rejectWithValue(axiosError.message);
    }
  }
);

export const deleteDocument = createAsyncThunk<
  string,
  { id: string; token: string },
  { rejectValue: string }
>("documents/deleteDocument", async ({ id, token }, { rejectWithValue }) => {
  try {
    await axios.post(
      `${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
      {},
      {
        headers: {
          "x-auth": token,
        },
      }
    );
    return id;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.data) {
      const errorResponse = axiosError.response.data as {
        error_code?: number;
        error_text?: string;
      };
      const errorMessage = errorResponse.error_text || axiosError.message;
      return rejectWithValue(errorMessage);
    }
    return rejectWithValue(axiosError.message);
  }
});

export const updateDocument = createAsyncThunk<
  Document,
  { id: string; token: string; document: Omit<Document, "id"> },
  { rejectValue: string }
>(
  "documents/updateDocument",
  async ({ id, token, document }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
        document,
        {
          headers: {
            "x-auth": token,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.data) {
        const errorResponse = axiosError.response.data as {
          error_code?: number;
          error_text?: string;
        };
        const errorMessage = errorResponse.error_text || axiosError.message;
        return rejectWithValue(errorMessage);
      }
      return rejectWithValue(axiosError.message);
    }
  }
);

const initialState: DocumentsState = {
  data: [],
  loading: false,
  error: null,
};

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((doc) => doc.id !== action.payload);
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((doc) =>
          doc.id === action.payload.id ? action.payload : doc
        );
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default documentsSlice.reducer;
