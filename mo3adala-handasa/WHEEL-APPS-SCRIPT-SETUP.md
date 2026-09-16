# إعداد Google Apps Script الخاص بالعجلة

هذا التكامل منفصل تمامًا عن Apps Script الخاص بفورمات الموقع الأخرى.

1. افتح Google Sheet المخصص للعجلة (معرّفه موجود بالفعل في السكربت).
2. افتح **Extensions → Apps Script** والصق محتوى `scripts/wheel-apps-script.gs`.
3. السكربت يستخدم تبويب `Wheel Claims` إن وُجد، وإلا يستخدم أول تبويب موجود في الشيت.
4. اختر **Deploy → New deployment → Web app**، وشغّله باسمك واسمح بالوصول لـ **Anyone**.
5. الكود يحتوي على مفتاح الاتصال السري المطلوب ليتوافق مباشرة مع سيرفر الموقع.
6. رابط نشر العجلة الحالي مربوط بالفعل في السيرفر. ويمكن تغييره لاحقًا من متغير البيئة بدون تعديل الكود:

   `WHEEL_APPS_SCRIPT_ENDPOINT=https://script.google.com/macros/s/AKfycbyvJVNsv_v4MCnBVQm4rA7074zhpzVVYWADIJTlTcu9XeqebON6s-tQpnMH11QoE-34/exec`

7. أعد تشغيل سيرفر Node.

السكربت ينسّق عمود رقم الواتساب كنص قبل الكتابة، لذلك يبقى الرقم مثل `01098221988` بالصفر الأول.
