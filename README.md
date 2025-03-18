Sub FilterByVariableCategory()
    Dim wsImported As Worksheet
    Dim wsFiltered As Worksheet
    Dim varCat As String
    Dim varCatColumn As Range
    Dim varCatFound As Boolean
    varCatFound = False

    ' Get the selected Variable_category value
    varCat = ActiveCell.Value
    If varCat = "" Then
        MsgBox "Please select a Variable_category value before clicking the button.", vbExclamation, "No Value Selected"
        Exit Sub
    End If

    ' Reference the ImportedData sheet
    On Error Resume Next
    Set wsImported = ThisWorkbook.Sheets("ImportedData")
    On Error GoTo 0

    ' Ensure the ImportedData sheet exists
    If wsImported Is Nothing Then
        MsgBox "'ImportedData' sheet not found. Please import data first.", vbExclamation, "Error"
        Exit Sub
    End If

    ' Create or reference the FilteredData sheet
    On Error Resume Next
    Set wsFiltered = ThisWorkbook.Sheets("FilteredData")
    On Error GoTo 0

    If wsFiltered Is Nothing Then
        Set wsFiltered = ThisWorkbook.Sheets.Add
        wsFiltered.Name = "FilteredData"
    Else
        wsFiltered.Cells.Clear ' Clear old data
    End If

    ' Find the Variable_category column dynamically
    For Each cell In wsImported.Rows(1).Cells
        If cell.Value = "Variable_category" Then
            Set varCatColumn = cell
            varCatFound = True
            Exit For
        End If
    Next cell

    ' Filter the data by the selected Variable_category
    If varCatFound Then
        wsImported.Range("A1").CurrentRegion.AutoFilter Field:=varCatColumn.Column, Criteria1:=varCat
        wsImported.Range("A1").CurrentRegion.SpecialCells(xlCellTypeVisible).Copy
        wsFiltered.Range("A1").PasteSpecial Paste:=xlPasteAll
        Application.CutCopyMode = False
    Else
        MsgBox "No 'Variable_category' column found in the ImportedData sheet.", vbExclamation, "Error"
        Exit Sub
    End If

    MsgBox "Data filtered by '" & varCat & "' successfully.", vbInformation, "Success"
End Sub
