# إعداد Google Apps Script الخاص بالعجلة

هذا التكامل منفصل تمامًا عن Apps Script الخاص بفورمات الموقع الأخرى.

1. افتح Google Sheet المخصص للعجلة (معرّفه موجود بالفعل في السكربت).
2. افتح **Extensions → Apps Script** والصق محتوى `scripts/wheel-apps-script.gs`.
3. السكربت يستخدم تبويب `Wheel Claims` إن وُجد، وإلا يستخدم أول تبويب موجود في الشيت.
4. اختر **Deploy → New deployment → Web app**، وشغّله باسمك واسمح بالوصول لـ **Anyone**.
5. الكود يدعم التشغيل من سيرفر Node ومن استضافة Angular static مثل Hostinger. في الوضع static تُرسل العجلة طلب `spin` ثم `claim` مباشرة إلى هذا الـ Web App.
6. رابط نشر العجلة الحالي مربوط بالفعل في السيرفر. ويمكن تغييره لاحقًا من متغير البيئة بدون تعديل الكود:

   `WHEEL_APPS_SCRIPT_ENDPOINT=https://script.google.com/macros/s/AKfycbyvJVNsv_v4MCnBVQm4rA7074zhpzVVYWADIJTlTcu9XeqebON6s-tQpnMH11QoE-34/exec`

7. بعد لصق النسخة الجديدة اضغط **Deploy → Manage deployments → Edit → New version → Deploy**، ثم أعد نشر نسخة الموقع من Hostinger.

السكربت ينسّق عمود رقم الواتساب كنص قبل الكتابة، لذلك يبقى الرقم مثل `01098221988` بالصفر الأول.
