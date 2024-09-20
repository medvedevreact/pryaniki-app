import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

interface DocumentsModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  documentData: {
    companySigDate: string;
    companySignatureName: string;
    documentName: string;
    documentStatus: string;
    documentType: string;
    employeeNumber: string;
    employeeSigDate: string;
    employeeSignatureName: string;
  };
  setDocumentData: React.Dispatch<
    React.SetStateAction<{
      companySigDate: string;
      companySignatureName: string;
      documentName: string;
      documentStatus: string;
      documentType: string;
      employeeNumber: string;
      employeeSigDate: string;
      employeeSignatureName: string;
    }>
  >;
  editMode: boolean;
}

export const DocumentsModal: React.FC<DocumentsModalProps> = ({
  open,
  onClose,
  onSave,
  documentData,
  setDocumentData,
  editMode,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {editMode ? "Редактировать запись" : "Добавить новую запись"}
      </DialogTitle>
      <DialogContent>
        {Object.keys(documentData).map((key) => (
          <TextField
            key={key}
            margin="dense"
            label={key}
            fullWidth
            variant="outlined"
            value={documentData[key as keyof typeof documentData]}
            onChange={(e) =>
              setDocumentData({
                ...documentData,
                [key]: e.target.value,
              })
            }
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button onClick={onSave} color="primary">
          {editMode ? "Сохранить изменения" : "Сохранить"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
