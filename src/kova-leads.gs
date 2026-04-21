// KOVA — Google Apps Script para recibir leads del sitio web
// Pegá este código en script.google.com y desplegá como Web App

function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('Leads');

    if (!sheet) {
      sheet = ss.insertSheet('Leads');
      sheet.appendRow(['Fecha', 'Nombre', 'Email', 'Área', 'Mensaje', 'Origen']);
      sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
    }

    const p = e.parameter;

    sheet.appendRow([
      new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }),
      p.nombre  || '',
      p.email   || '',
      p.area    || '',
      p.mensaje || '',
      p.origen  || 'web'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
