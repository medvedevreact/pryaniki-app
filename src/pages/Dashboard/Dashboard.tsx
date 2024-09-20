import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  createDocument,
  deleteDocument,
  Document,
  fetchDocuments,
  updateDocument,
} from "../../store/documentsSlice";
import { CircularProgress, Typography, Button } from "@mui/material";

import { DocumentsTable } from "../../components/DocumentsTable/DocumentsTable";
import { DocumentsModal } from "../../components/DocumentsModal/DocumentsModal";

export const Dashboard: React.FC = () => {
  const token = useAppSelector((state) => state.user.token);
  const { data, loading, error } = useAppSelector((state) => state.documents);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [newDocumentData, setNewDocumentData] = useState({
    companySigDate: "",
    companySignatureName: "",
    documentName: "",
    documentStatus: "",
    documentType: "",
    employeeNumber: "",
    employeeSigDate: "",
    employeeSignatureName: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editDocumentData, setEditDocumentData] = useState<Document | null>(
    null
  );

  useEffect(() => {
    if (token) {
      dispatch(fetchDocuments(token as string));
    }
  }, [dispatch, token]);

  const handleDelete = (id: string) => {
    dispatch(deleteDocument({ id: id, token: token as string }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setEditDocumentData(null);
    setNewDocumentData({
      companySigDate: "",
      companySignatureName: "",
      documentName: "",
      documentStatus: "",
      documentType: "",
      employeeNumber: "",
      employeeSigDate: "",
      employeeSignatureName: "",
    });
  };

  const isValidISODate = (date: string) => {
    const isoDateRegex =
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})?$/;
    return isoDateRegex.test(date);
  };

  const handleSave = () => {
    const trimmedData = {
      companySigDate: newDocumentData.companySigDate.trim(),
      companySignatureName: newDocumentData.companySignatureName.trim(),
      documentName: newDocumentData.documentName.trim(),
      documentStatus: newDocumentData.documentStatus.trim(),
      documentType: newDocumentData.documentType.trim(),
      employeeNumber: newDocumentData.employeeNumber.trim(),
      employeeSigDate: newDocumentData.employeeSigDate.trim(),
      employeeSignatureName: newDocumentData.employeeSignatureName.trim(),
    };

    if (
      !trimmedData.companySigDate ||
      !trimmedData.companySignatureName ||
      !trimmedData.documentName ||
      !trimmedData.documentStatus ||
      !trimmedData.documentType ||
      !trimmedData.employeeNumber ||
      !trimmedData.employeeSigDate ||
      !trimmedData.employeeSignatureName
    ) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    if (
      !isValidISODate(trimmedData.companySigDate) ||
      !isValidISODate(trimmedData.employeeSigDate)
    ) {
      alert("Дата должна быть в формате ISO.");
      return;
    }

    if (editMode && editDocumentData) {
      dispatch(
        updateDocument({
          id: editDocumentData.id,
          token: token as string,
          document: {
            ...editDocumentData,
            ...trimmedData,
          },
        })
      );
    } else {
      dispatch(
        createDocument({
          token: token as string,
          document: trimmedData,
        })
      );
    }

    setOpen(false);
    setNewDocumentData({
      companySigDate: "",
      companySignatureName: "",
      documentName: "",
      documentStatus: "",
      documentType: "",
      employeeNumber: "",
      employeeSigDate: "",
      employeeSignatureName: "",
    });
    setEditMode(false);
    setEditDocumentData(null);
  };

  const handleEdit = (document: Document) => {
    setEditMode(true);
    setEditDocumentData(document);
    setNewDocumentData({
      companySigDate: document.companySigDate
        ? document.companySigDate.trim()
        : "",
      companySignatureName: document.companySignatureName
        ? document.companySignatureName.trim()
        : "",
      documentName: document.documentName ? document.documentName.trim() : "",
      documentStatus: document.documentStatus
        ? document.documentStatus.trim()
        : "",
      documentType: document.documentType ? document.documentType.trim() : "",
      employeeNumber: document.employeeNumber
        ? document.employeeNumber.trim()
        : "",
      employeeSigDate: document.employeeSigDate
        ? document.employeeSigDate.trim()
        : "",
      employeeSignatureName: document.employeeSignatureName
        ? document.employeeSignatureName.trim()
        : "",
    });
    setOpen(true);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && data && data.length > 0 && (
        <DocumentsTable
          documents={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {!loading && !error && (!data || data.length === 0) && (
        <Typography>No documents found</Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        style={{ marginTop: "10px" }}
      >
        Добавить новую запись
      </Button>

      <DocumentsModal
        open={open}
        onClose={handleClose}
        onSave={handleSave}
        documentData={newDocumentData}
        setDocumentData={setNewDocumentData}
        editMode={editMode}
      />
    </div>
  );
};
