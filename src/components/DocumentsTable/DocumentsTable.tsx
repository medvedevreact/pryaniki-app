// TableComponent.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Document } from "../../store/documentsSlice";

interface DocumentsTable {
  documents: Document[];
  onEdit: (document: Document) => void;
  onDelete: (id: string) => void;
}

export const DocumentsTable: React.FC<DocumentsTable> = ({
  documents,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Company Signature Date</TableCell>
            <TableCell>Company Signature Name</TableCell>
            <TableCell>Document Name</TableCell>
            <TableCell>Document Status</TableCell>
            <TableCell>Document Type</TableCell>
            <TableCell>Employee Number</TableCell>
            <TableCell>Employee Signature Date</TableCell>
            <TableCell>Employee Signature Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((document) => (
            <TableRow key={document.id}>
              <TableCell>{document.id}</TableCell>
              <TableCell>
                {new Date(document.companySigDate).toLocaleString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell>{document.companySignatureName}</TableCell>
              <TableCell>{document.documentName}</TableCell>
              <TableCell>{document.documentStatus}</TableCell>
              <TableCell>{document.documentType}</TableCell>
              <TableCell>{document.employeeNumber}</TableCell>
              <TableCell>
                {new Date(document.employeeSigDate).toLocaleString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell>{document.employeeSignatureName}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="edit"
                  color="primary"
                  onClick={() => onEdit(document)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="secondary"
                  onClick={() => onDelete(document.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
