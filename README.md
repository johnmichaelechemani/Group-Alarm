Public Class Form2
    Private Sub Form2_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        ' Stop music from Form1 when Form2 opens
        Dim form1 As Form1 = Application.OpenForms.OfType(Of Form1)().FirstOrDefault()
        If form1 IsNot Nothing Then
            form1.bgMusic.controls.stop()
        End If
    End Sub
End Class
Imports WMPLib

Public Class Form1
    Private bgMusic As WindowsMediaPlayer

    Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        bgMusic = New WindowsMediaPlayer()
        bgMusic.URL = "C:\path\to\your-music.mp3"
        bgMusic.settings.setMode("loop", True) ' Loop music
        bgMusic.controls.play()
    End Sub

    Private Sub Form1_FormClosing(sender As Object, e As FormClosingEventArgs) Handles MyBase.FormClosing
        bgMusic.controls.stop() ' Stop music when form closes
    End Sub
End Class
