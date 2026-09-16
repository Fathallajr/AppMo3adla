/**
 * Google Apps Script dedicated to the Batch 2027 prize wheel only.
 * Deploy this as a separate Web App and never reuse the normal lead-form script.
 */
const SPREADSHEET_ID = '1lDtfrNTh-q4kXZfg7qt9S8CgmhMkxeLB8UBtgMifTKo';
const SHEET_NAME = 'Wheel Claims';
const HEADERS = ['وقت التسجيل', 'الاسم', 'رقم الواتساب', 'الهدية', 'Wheel Token', 'نوع المعادلة'];

function doGet() {
  return jsonResponse_({ success: true, service: 'wheel-claims' });
}

function doPost(event) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const params = event && event.parameter ? event.parameter : {};
    const name = String(params.name || '').trim();
    const whatsapp = normalizePhone_(params.whatsapp);
    const gift = String(params.gift || '').trim();
    const program = String(params.program || '').trim();
    const wheelToken = String(params.wheelToken || '').trim();
    const createdAt = String(params.createdAt || '').trim();
    const apiSecret = String(params.apiSecret || '').trim();

	if (!verifyRequest_(createdAt, wheelToken, whatsapp, gift, apiSecret)) {
	  return jsonResponse_({ success: false, message: 'Unauthorized request' });
	}

    if (name.length < 2) return jsonResponse_({ success: false, message: 'Invalid name' });
    if (!/^01\d{9}$/.test(whatsapp)) return jsonResponse_({ success: false, message: 'Invalid WhatsApp number' });
    if (!gift || !wheelToken || !['معادلة هندسة', 'معادلة حاسبات'].includes(program)) return jsonResponse_({ success: false, message: 'Missing wheel result or program' });

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getSheets()[0];
    ensureHeaders_(sheet);

    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const rows = sheet.getRange(2, 3, lastRow - 1, 4).getDisplayValues();
      const duplicate = rows.some(function(row) {
        return normalizeStoredPhone_(row[0]) === whatsapp || String(row[2]).trim() === wheelToken;
      });
      if (duplicate) return jsonResponse_({ success: false, alreadyRegistered: true });
    }

    const row = sheet.getLastRow() + 1;
    sheet.getRange(row, 1).setValue(new Date());
    sheet.getRange(row, 2).setValue(name);
    // Plain-text format is set before the value so Google Sheets keeps the leading zero.
    sheet.getRange(row, 3).setNumberFormat('@').setValue(whatsapp);
    sheet.getRange(row, 4).setValue(gift);
    sheet.getRange(row, 5).setValue(wheelToken);
    sheet.getRange(row, 6).setValue(program);
    SpreadsheetApp.flush();

    return jsonResponse_({ success: true });
  } catch (error) {
    return jsonResponse_({ success: false, message: String(error && error.message || error) });
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() !== 0) return;
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.setFrozenRows(1);
  sheet.getRange('C:C').setNumberFormat('@');
}

function normalizePhone_(value) {
  return String(value || '')
    .replace(/[٠-٩]/g, function(digit) { return String(digit.charCodeAt(0) - '٠'.charCodeAt(0)); })
    .replace(/[۰-۹]/g, function(digit) { return String(digit.charCodeAt(0) - '۰'.charCodeAt(0)); })
    .replace(/\D/g, '');
}

function normalizeStoredPhone_(value) {
  const digits = normalizePhone_(value);
  return digits.length === 10 && digits.charAt(0) === '1' ? '0' + digits : digits;
}

function verifyRequest_(createdAt, wheelToken, whatsapp, gift, apiSecret) {
  const secret = String(
    PropertiesService.getScriptProperties().getProperty('WHEEL_API_SECRET') || ''
  ).trim();
  return Boolean(
    createdAt &&
    wheelToken &&
    whatsapp &&
    gift &&
    apiSecret &&
    apiSecret === secret
  );
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
