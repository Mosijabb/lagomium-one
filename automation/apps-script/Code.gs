/**
 * Lagomium — lead-to-Sheets + owner email.
 * Install only inside the customer's own Google Sheet / Apps Script project.
 * Deployment must run with explicit approval by the sheet owner.
 * Backend-to-backend webhook only; never put WEBHOOK_SECRET in public HTML.
 *
 * Script Properties:
 * SHEET_ID, ALERT_EMAIL, WEBHOOK_SECRET, optional SHEET_NAME ("Leads").
 * Deployment: Web app -> Execute as me (sheet owner). Access: anyone only if
 * incoming request is from a trusted server-side workflow using the secret.
 * Use additional abuse protection and privacy controls before production.
 */

function doPost(e) {
  try {
    const props = PropertiesService.getScriptProperties();
    const expected = props.getProperty('WEBHOOK_SECRET');
    if (!expected || expected.length < 20) return json_({ok:false, error:'configuration required'});
    const raw = e && e.postData && e.postData.contents;
    if (!raw || raw.length > 8192) return json_({ok:false,error:'invalid payload'});
    const body = JSON.parse(raw);
    if (!body || body.secret !== expected) return json_({ok:false,error:'unauthorized'});
    const name = clean_(body.name,100);
    const email = clean_(body.email,180).toLowerCase();
    const message = clean_(body.message,1000);
    const source = clean_(body.source || 'website',100);
    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return json_({ok:false,error:'invalid input'});
    const sheetId = props.getProperty('SHEET_ID');
    const alertTo = props.getProperty('ALERT_EMAIL');
    if (!sheetId || !alertTo) return json_({ok:false,error:'missing destination'});
    const lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) return json_({ok:false,error:'busy; retry'});
    let created = false;
    try {
      const book = SpreadsheetApp.openById(sheetId);
      const nameOfSheet = props.getProperty('SHEET_NAME') || 'Leads';
      const sheet = book.getSheetByName(nameOfSheet) || book.insertSheet(nameOfSheet);
      if (sheet.getLastRow() === 0) sheet.appendRow(['Timestamp UTC','Name','Email','Message','Source','Alert Status']);
      const lastRow = sheet.getLastRow();
      if (lastRow >= 2) {
        const existing = sheet.getRange(2,3,lastRow-1,1).getDisplayValues();
        if (existing.some(row => String(row[0]).trim().toLowerCase() === email))
          return json_({ok:true,status:'duplicate',email_alert_sent:false});
      }
      sheet.appendRow([new Date(),safeCell_(name),safeCell_(email),safeCell_(message),safeCell_(source),'pending']);
      created = true;
    } finally {
      lock.releaseLock();
    }
    let sent = false;
    try {
      MailApp.sendEmail({
        to: alertTo,
        subject: 'New website inquiry received',
        body: 'Name: '+name+'\nEmail: '+email+'\nMessage: '+message+'\nSource: '+source
      });
      sent = true;
    } catch (err) {
      console.error('Notification failed (lead saved): '+String(err));
    }
    return json_({ok:true,status:created?'created':'not_created',email_alert_sent:sent});
  } catch (err) {
    console.error('Webhook processing error: '+String(err));
    return json_({ok:false,error:'processing failed'});
  }
}
function clean_(value,max) {
  return typeof value === 'string' ? value.trim().slice(0,max) : '';
}
function safeCell_(value) {
  // Prevent Google Sheets from interpreting user text as formulas.
  return /^[=+@-]/.test(value) ? "'" + value : value;
}
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}