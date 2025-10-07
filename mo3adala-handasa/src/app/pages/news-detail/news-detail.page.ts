import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'app-news-detail',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './news-detail.page.html',
	styleUrls: ['./news-detail.page.css']
})
export class NewsDetailPageComponent implements OnInit {
	newsItem: any = null;
	newsId: string = '';

	// Mock data - في التطبيق الحقيقي ستحصل على البيانات من API
	newsData: { [key: string]: any } = {
		'App-Book-2025': {
			id: 'App-Book-2025',
			title: 'كتاب امتحانات الأبلكيشن',
			content: `
				<div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
					<h3 class="text-blue-800 font-bold mb-2">📚 كتاب امتحانات الأبلكيشن</h3>
					<p class="text-blue-700">مجموعة شاملة من الامتحانات التدريبية لمعادلة كلية الهندسة</p>
				</div>
				
				
				<h3 class="text-xl font-bold mb-4 text-gray-800">مميزات الكتاب:</h3>
				<ul class="list-disc list-inside mb-6 space-y-2">
					<li>يضم مجموعة كبيرة من الامتحانات الشاملة</li>
					<li>يساعد الطالب على التدرب على شكل الأسئلة الحقيقية</li>
					<li>يحتوي على إجابات نموذجية لزيادة الفهم والثقة</li>
					<li>مناسب لجميع المستويات الدراسية</li>
					<li>أداة فعّالة للمراجعة قبل الامتحان</li>
					<li>يساعد على إدارة الوقت أثناء الحل والتدريب</li>
					<li>يعزز قدرة الطالب على التركيز والتفكير السريع</li>
					<li>يشمل أسئلة متنوعة تغطي جميع أجزاء المنهج</li>
					<li>ينمي مهارة حل المشكلات عند الطالب</li>
					<li>وسيلة مثالية لتقييم مستوى الاستعداد النهائي</li>
				</ul>
				
				<div class="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
					<h3 class="text-xl font-bold mb-4 text-orange-800">الفئة المستهدفة:</h3>
					<ul class="list-disc list-inside text-orange-700 space-y-1">
						<li>طلاب معادلة هندسة</li>
						<li>الطلاب الراغبين في التدريب على نماذج محاكاة للامتحانات</li>
						<li>الطلاب اللي عايزين يقيسوا مستوى استعدادهم قبل الامتحان</li>
						<li>الطلاب اللي محتاجين يرفعوا مستواهم بالتمارين التطبيقية</li>
					</ul>
				</div>
				
				<div class="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
					<h4 class="text-green-800 font-bold mb-2">🚚 الكتاب لحد باب بيتك:</h4>
					<ul class="list-disc list-inside text-green-700 space-y-1">
						<li>إمكانية شراء الكتاب أونلاين بسهولة</li>
						<li>التوصيل متاح لأي مكان</li>
						<li>سرعة في الشحن والاستلام</li>
						<li>دفع آمن وسهل أونلاين</li>
					</ul>
				</div>
			`,
			date: '2025-05-20',
			author: 'فريق المعادلة',
			category: 'الكتب والمراجع',
			important: false,
			image: '/assets/news1.png',
			images: [
				'/assets/news1.png'
			]
		},
		'one-chance-only-2025': {
			id: 'one-chance-only-2025',
			title: 'فرصة واحدة فقط لاختبارات المعادلة لدفعة 2025',
			content: `
				<div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
					<h3 class="text-red-800 font-bold mb-2">⚠️ تحديث مهم في شروط المعادلة</h3>
					<p class="text-red-700">اعتباراً من دفعة عام 2025، أصبحت فرص التقدم لاختبارات المعادلة فرصة واحدة فقط</p>
				</div>
				
				<p class="mb-4 text-gray-700 leading-relaxed">
					اعتباراً من دفعة عام 2025 من الطلاب الحاصلين على الدبلومات والمعاهد الفنية والمتقدمين لامتحانات الدبلومات والمعاهد في العام الجامعي 2025/2026 أصبحت فرص التقدم لاختبارات الدبلومات والمعاهد هذا العام ٢٠٢٥ هي فرصة واحدة فقط خلال عامين متتاليين تحسب ابتداء من عام حصول الطالب على المؤهل والعام الذي يليه.
				</p>
				
				<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
					<h3 class="text-yellow-800 font-bold mb-2">📝 ملاحظات مهمة:</h3>
					<ul class="list-disc list-inside text-yellow-700 space-y-1">
						<li>ينطبق هذا الشرط على دفعة 2025 فقط</li>
						<li>الفرصة الواحدة تحسب من عام الحصول على المؤهل والعام التالي</li>
						<li>يجب على الطلاب التحضير جيداً قبل التقدم للامتحان</li>
						<li>لا توجد فرص إضافية بعد استنفاد الفرصة الواحدة</li>
					</ul>
				</div>
			`,
			date: '2025-06-22',
			author: 'فريق المعادلة',
			category: 'شروط المعادلة',
			image: '/assets/success.png',
			images: ['/assets/success.png']
		},
		'tech-schools-acceptance-2025': {
			id: 'tech-schools-acceptance-2025',
			title: 'قبول خريجي مدارس التكنولوجيا التطبيقية في المعادلة',
			content: `
				<div class="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
					<h3 class="text-green-800 font-bold mb-2">🎓 فرصة جديدة لخريجي التكنولوجيا التطبيقية</h3>
					<p class="text-green-700">السماح لخريجي مدارس التكنولوجيا التطبيقية بأداء امتحانات المعادلة</p>
				</div>
				
				<h3 class="text-xl font-bold mb-4 text-gray-800">المدارس المشمولة:</h3>
				<ul class="list-disc list-inside mb-6 space-y-2 text-gray-700">
					<li>مدرسة تكنولوجيا المعلومات بالإسماعيلية</li>
					<li>مدرسة أي تك (I-TECH)</li>
					<li>مدارس التكنولوجيا التطبيقية تخصص تكنولوجيا المعلومات</li>
					<li>مدارس التكنولوجيا التطبيقية تخصص الذكاء الاصطناعي</li>
					<li>مدارس التكنولوجيا التطبيقية تخصص برمجيات</li>
					<li>مدارس WE للتكنولوجيا التطبيقية</li>
				</ul>
				
				<div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
					<h3 class="text-blue-800 font-bold mb-2">📋 شروط القبول:</h3>
					<ul class="list-disc list-inside text-blue-700 space-y-1">
						<li>الحصول على 75% فأكثر من مجموع درجات شهادة الدبلوم</li>
						<li>أداء امتحانات في المواد التالية: رياضة - فيزياء - لغة إنجليزية</li>
						<li>الامتحانات تُعقد بكليات الهندسة المعنية</li>
						<li>الامتحانات تحت إشراف أمانة المجلس الأعلى للجامعات</li>
					</ul>
				</div>
				
				<div class="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
					<h3 class="text-orange-800 font-bold mb-2">⏰ التوقيت:</h3>
					<p class="text-orange-700">
						هذا القرار ساري اعتباراً من دفعة 2025 فقط.
					</p>
				</div>
			`,
			date: '2025-06-22',
			author: 'فريق المعادلة',
			category: 'قبول خاص',
			image: '/assets/we.jpg',
			images: ['/assets/we.jpg']
		},
		'english-words-group-2025': {
			id: 'english-words-group-2025',
			title: 'جروب كلمات اللغة الإنجليزية',
			content: `
				<div class="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
					<h3 class="text-green-800 font-bold mb-2">📚 جروب كلمات اللغة الإنجليزية</h3>
					<p class="text-green-700">مجموعة شاملة من أهم الكلمات الشائعة في امتحانات المعادلة</p>
				</div>
				
				<p class="text-lg leading-relaxed mb-6">جروب كلمات اللغة الإنجليزية يضم مجموعة كبيرة من أهم الكلمات الشائعة فى الإمتحانات ويساعد الطالب على بناء حصيلة لغوية قوية.</p>
				
				<h3 class="text-xl font-bold mb-4 text-gray-800">مميزات الجروب:</h3>
				<ul class="list-disc list-inside mb-6 space-y-2">
					<li>يضم مجموعة كبيرة من أهم الكلمات الشائعة فى الإمتحانات</li>
					<li>يساعد الطالب على بناء حصيلة لغوية قوية</li>
					<li>يحتوي على تدريبات وتطبيقات عملية للكلمات</li>
					<li>مناسب لجميع المستويات من المبتدئ للمحترف</li>
					<li>أداة فعّالة لتقوية التحدث والكتابة والترجمة</li>
					<li>يساعد على تحسين النطق والاستخدام الصحيح</li>
					<li>يعزز قدرة الطالب على الفهم السريع لإسئلة الإمتحانات</li>
					<li>وسيلة مثالية لتطوير اللغة خطوة بخطوة</li>
				</ul>
				
				<div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
					<h3 class="text-xl font-bold mb-4 text-blue-800">الفئة المستهدفة:</h3>
					<ul class="list-disc list-inside text-blue-700 space-y-1">
						<li>أي شخص عايز يقوي لغته الإنجليزية</li>
						<li>المبتدئين اللي محتاجين يبدأوا من الصفر</li>
						<li>الطلاب اللي بيستعدوا لاختبارات المعادلة</li>
					</ul>
				</div>
				
				<div class="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
					<h4 class="text-purple-800 font-bold mb-2">📖 محتوى الجروب:</h4>
					<ul class="list-disc list-inside text-purple-700 space-y-1">
						<li>كلمات يومية أساسية ومهمة</li>
						<li>تدريبات على كل كلمة</li>
						<li>اختبارات سريعة للتأكد من الحفظ</li>
						<li>مراجعات دورية للطلاب</li>
						<li>متابعة مستمرة من المشرفين</li>
					</ul>
				</div>
			`,
			date: '2025-06-22',
			author: 'فريق المعادلة',
			category: 'أخبار التطبيق',
			important: false,
			image: '/assets/news2.png',
			images: [
				'/assets/news2.png'
			]
		},
		'intensive-course-2025': {
			id: 'intensive-course-2025',
			title: 'الكورس المكثف الجديد',
			content: `
				<div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
					<h3 class="text-blue-800 font-bold mb-2">📚 الكورس المكثف الجديد</h3>
					<p class="text-blue-700">كورس شامل يغطي المنهج الدراسي بالكامل مع التركيز على النقاط المهمة</p>
				</div>
				
				<h3 class="text-xl font-bold mb-4 text-gray-800">مميزات الكورس:</h3>
				<ul class="list-disc list-inside mb-6 space-y-2">
					<li>يغطي شرحًا كاملًا للمنهج الدراسي</li>
					<li>يركز على أهم النقاط الأساسية في المادة</li>
					<li>يتضمن حل تدريبات متنوعة للتطبيق العملي للإمتحانات</li>
					<li>يوفر مراجعات شاملة قبل الامتحانات</li>
					<li>يساعد الطلاب على تثبيت المعلومات بشكل أفضل</li>
					<li>مصمم خصيصًا للطلاب المتأخرين في متابعة المنهج</li>
					<li>يرفع مستوى الاستعداد للامتحانات النهائية</li>
				</ul>
				
				<div class="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
					<h3 class="text-green-800 font-bold mb-2">🎯 الفئة المستهدفة:</h3>
					<ul class="list-disc list-inside text-green-700 space-y-1">
						<li>الطلاب المتأخرين في متابعة الدروس</li>
						<li>الطلاب اللي محتاجين مراجعة شاملة قبل الامتحان</li>
						<li>أي طالب بيدور على خطة منظمة للاستعداد</li>
					</ul>
				</div>
				
				<div class="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
					<h3 class="text-orange-800 font-bold mb-2">📋 محتوى الكورس:</h3>
					<ul class="list-disc list-inside text-orange-700 space-y-2">
						<li><strong>فيديوهات شرح تفصيلي:</strong> للمنهج كامل والتركيز على النقاط المهمة</li>
						<li><strong>مراجعات شاملة:</strong> تغطي أهم الأجزاء</li>
						<li><strong>حل نماذج امتحانات متوقعة:</strong> للتدريب على شكل الأسئلة</li>
						<li><strong>لايف يومي:</strong> لحل تدريبات مباشرة مع الطلاب</li>
						<li><strong>تدريبات تطبيقية مستمرة:</strong> للتأكد من الفهم</li>
					</ul>
				</div>
			`,
			date: '2025-06-22',
			author: 'فريق المعادلة',
			category: 'الكورسات والدورات',
			image: '/assets/news4.png',
			images: ['/assets/news4.png']
		},
		'equation-requirements-2024': {
			id: 'equation-requirements-2024',
			title: 'تحديثات جديدة في شروط المعادلة للعام 2024',
			content: `
				<p>تم الإعلان عن تحديثات مهمة في شروط المعادلة للطلاب الراغبين في الالتحاق بكليات الهندسة. هذه التحديثات تأتي في إطار تطوير النظام التعليمي وتحسين جودة التعليم الهندسي.</p>
				
				<h3>الشروط الجديدة تشمل:</h3>
				<ul>
					<li>تحديث متطلبات الدرجات المطلوبة في المواد الأساسية</li>
					<li>إضافة مواد جديدة للتقييم</li>
					<li>تطوير نظام التقييم ليكون أكثر شمولية</li>
					<li>تحسين آليات المراجعة والاعتماد</li>
				</ul>
				
				<h3>المواعيد المهمة:</h3>
				<ul>
					<li>بداية التسجيل: 1 مارس 2024</li>
					<li>آخر موعد للتسجيل: 30 أبريل 2024</li>
					<li>موعد الامتحانات: يونيو 2024</li>
					<li>إعلان النتائج: يوليو 2024</li>
				</ul>
				
				<p>ننصح جميع الطلاب الراغبين في الالتحاق بكليات الهندسة بمراجعة الشروط الجديدة والتأكد من استيفاء جميع المتطلبات قبل التقديم.</p>
			`,
			date: '2024-01-15',
			image: '/assets/logo2.png',
			category: 'أخبار المعادلة',
			author: 'فريق المعادلة'
		},
		'new-approved-schools-2024': {
			id: 'new-approved-schools-2024',
			title: 'قائمة جديدة من المدارس المعتمدة للمعادلة',
			content: `
				<p>تم إضافة 15 مدرسة جديدة إلى قائمة المدارس المعتمدة للمعادلة في مختلف المحافظات. هذه المدارس تم تقييمها بعناية للتأكد من استيفاءها للمعايير المطلوبة.</p>
				
				<h3>المدارس الجديدة تشمل:</h3>
				<ul>
					<li>مدرسة النهضة الثانوية - القاهرة</li>
					<li>مدرسة المستقبل - الإسكندرية</li>
					<li>مدرسة التميز - الجيزة</li>
					<li>مدرسة الأمل - أسيوط</li>
					<li>مدرسة النور - المنيا</li>
				</ul>
				
				<h3>معايير الاعتماد:</h3>
				<p>تم تقييم المدارس بناءً على عدة معايير منها:</p>
				<ul>
					<li>جودة المناهج التعليمية</li>
					<li>كفاءة المدرسين</li>
					<li>المرافق والتجهيزات</li>
					<li>نتائج الطلاب في الامتحانات</li>
				</ul>
				
				<p>هذا التوسع في قائمة المدارس المعتمدة سيساعد في توفير فرص أكثر للطلاب في مختلف المحافظات.</p>
			`,
			date: '2024-01-10',
			image: '/assets/logo2.png',
			category: 'أخبار المعادلة',
			author: 'فريق المعادلة'
		},
		'app-update-2-1-0': {
			id: 'app-update-2-1-0',
			title: 'تحديث جديد للتطبيق - إصدار 2.1.0',
			content: `
				<p>نحن سعداء بالإعلان عن إطلاق التحديث الجديد للتطبيق - الإصدار 2.1.0. هذا التحديث يجلب ميزات جديدة وتحسينات مهمة لتجربة المستخدم.</p>
				
				<h3>الميزات الجديدة:</h3>
				<ul>
					<li>واجهة مستخدم محسنة وسهلة الاستخدام</li>
					<li>نظام إشعارات ذكي ومتقدم</li>
					<li>تحسينات في سرعة التطبيق</li>
					<li>إضافة نظام التتبع الذكي للدرجات</li>
					<li>دردشة مباشرة مع المدرسين</li>
				</ul>
				
				<h3>التحسينات التقنية:</h3>
				<ul>
					<li>تقليل وقت التحميل بنسبة 40%</li>
					<li>تحسين استهلاك البطارية</li>
					<li>إصلاح الأخطاء المعروفة</li>
					<li>تحسين الأمان والحماية</li>
				</ul>
				
				<h3>كيفية التحديث:</h3>
				<p>يمكنك تحديث التطبيق من خلال:</p>
				<ul>
					<li>متجر Google Play (أندرويد)</li>
					<li>App Store (iOS)</li>
					<li>الموقع الرسمي للتطبيق</li>
				</ul>
				
				<p>ننصح جميع المستخدمين بتحديث التطبيق للاستفادة من الميزات الجديدة والتحسينات.</p>
			`,
			date: '2024-01-20',
			image: '/assets/logo2.png',
			category: 'أخبار التطبيق',
			author: 'فريق التطوير'
		},
		'smart-grades-tracking': {
			id: 'smart-grades-tracking',
			title: 'إضافة نظام التتبع الذكي للدرجات',
			content: `
				<p>نحن متحمسون للإعلان عن إضافة نظام التتبع الذكي للدرجات، والذي سيساعد الطلاب على متابعة تقدمهم الأكاديمي بشكل أفضل.</p>
				
				<h3>مميزات النظام الجديد:</h3>
				<ul>
					<li>تتبع الدرجات في جميع المواد</li>
					<li>رسوم بيانية لتطور الأداء</li>
					<li>تنبيهات عند انخفاض الدرجات</li>
					<li>توصيات للتحسين</li>
					<li>مقارنة الأداء مع المتوسط العام</li>
				</ul>
				
				<h3>كيفية الاستخدام:</h3>
				<ol>
					<li>ادخل إلى قسم "درجاتي" في التطبيق</li>
					<li>اختر المادة التي تريد متابعة درجاتها</li>
					<li>شاهد الرسوم البيانية والإحصائيات</li>
					<li>اتبع التوصيات المقدمة للتحسين</li>
				</ol>
				
				<h3>الفوائد للطلاب:</h3>
				<ul>
					<li>متابعة مستمرة للتقدم الأكاديمي</li>
					<li>تحديد نقاط الضعف مبكراً</li>
					<li>تحفيز للتحسين المستمر</li>
					<li>تنظيم أفضل للدراسة</li>
				</ul>
				
				<p>هذا النظام سيساعد الطلاب على تحقيق أفضل النتائج في دراستهم.</p>
			`,
			date: '2024-01-18',
			image: '/assets/logo2.png',
			category: 'أخبار التطبيق',
			author: 'فريق التطوير'
		},
		'exam-schedule-semester-2': {
			id: 'exam-schedule-semester-2',
			title: 'مواعيد امتحانات المعادلة للفصل الدراسي الثاني',
			content: `
				<p>تم الإعلان عن مواعيد امتحانات المعادلة للفصل الدراسي الثاني مع إجراءات التسجيل. هذه المواعيد تم تحديدها بعناية لتناسب جميع الطلاب في مختلف المحافظات.</p>
				
				<h3>مواعيد الامتحانات:</h3>
				<ul>
					<li>الرياضيات العامة: 15 يونيو 2024</li>
					<li>الرياضيات الخاصة: 17 يونيو 2024</li>
					<li>الفيزياء: 19 يونيو 2024</li>
					<li>الكيمياء: 21 يونيو 2024</li>
					<li>اللغة الإنجليزية: 23 يونيو 2024</li>
				</ul>
				
				<h3>إجراءات التسجيل:</h3>
				<ol>
					<li>تسجيل البيانات الشخصية</li>
					<li>رفع المستندات المطلوبة</li>
					<li>دفع الرسوم</li>
					<li>طباعة استمارة التسجيل</li>
					<li>التوجه للمركز المحدد في الموعد</li>
				</ol>
				
				<h3>المستندات المطلوبة:</h3>
				<ul>
					<li>صورة من شهادة الثانوية العامة</li>
					<li>صورة من بطاقة الرقم القومي</li>
					<li>صورة شخصية حديثة</li>
					<li>إيصال دفع الرسوم</li>
				</ul>
				
				<p>ننصح جميع الطلاب بالتسجيل مبكراً لتجنب الازدحام في الأيام الأخيرة.</p>
			`,
			date: '2024-01-05',
			image: '/assets/logo2.png',
			category: 'أخبار المعادلة',
			author: 'فريق المعادلة'
		},
		'electronic-application-update': {
			id: 'electronic-application-update',
			title: 'تحديثات في نظام التقديم الإلكتروني',
			content: `
				<p>تم تطوير نظام التقديم الإلكتروني ليكون أكثر سهولة وسرعة للطلاب. هذا التحديث يأتي في إطار تحسين تجربة المستخدم وتسهيل عملية التسجيل.</p>
				
				<h3>المميزات الجديدة:</h3>
				<ul>
					<li>واجهة مستخدم محسنة وسهلة الاستخدام</li>
					<li>حفظ البيانات تلقائياً أثناء التقديم</li>
					<li>نظام إشعارات فوري للتحديثات</li>
					<li>إمكانية تعديل البيانات قبل الإرسال النهائي</li>
					<li>دعم رفع المستندات بجودة عالية</li>
				</ul>
				
				<h3>التحسينات التقنية:</h3>
				<ul>
					<li>تقليل وقت التحميل بنسبة 60%</li>
					<li>تحسين الأمان وحماية البيانات</li>
					<li>دعم جميع أنواع الأجهزة والمتصفحات</li>
					<li>نظام نسخ احتياطي للبيانات</li>
				</ul>
				
				<h3>كيفية الاستخدام:</h3>
				<ol>
					<li>ادخل إلى الموقع الرسمي</li>
					<li>أنشئ حساب جديد أو سجل دخول</li>
					<li>املأ البيانات المطلوبة</li>
					<li>ارفع المستندات المطلوبة</li>
					<li>راجع البيانات وأرسل الطلب</li>
				</ol>
				
				<p>هذا التحديث سيساعد في تسهيل عملية التسجيل للطلاب.</p>
			`,
			date: '2024-01-01',
			image: '/assets/logo2.png',
			category: 'أخبار المعادلة',
			author: 'فريق المعادلة'
		},
		'free-workshops-students': {
			id: 'free-workshops-students',
			title: 'ورش عمل مجانية لطلاب المعادلة',
			content: `
				<p>تنظيم ورش عمل مجانية لمساعدة الطلاب في التحضير لامتحانات المعادلة. هذه الورش ستعقد في مختلف المحافظات لتسهيل الوصول للجميع.</p>
				
				<h3>مواعيد الورش:</h3>
				<ul>
					<li>القاهرة: 10-15 فبراير 2024</li>
					<li>الإسكندرية: 17-22 فبراير 2024</li>
					<li>الجيزة: 24-29 فبراير 2024</li>
					<li>أسيوط: 2-7 مارس 2024</li>
					<li>المنيا: 9-14 مارس 2024</li>
				</ul>
				
				<h3>مواضيع الورش:</h3>
				<ul>
					<li>استراتيجيات حل المسائل الرياضية</li>
					<li>تقنيات حل مسائل الفيزياء</li>
					<li>مبادئ الكيمياء العملية</li>
					<li>تحسين مهارات اللغة الإنجليزية</li>
					<li>إدارة الوقت أثناء الامتحان</li>
				</ul>
				
				<h3>المحاضرون:</h3>
				<p>سيقوم بتدريس الورش نخبة من أفضل المدرسين والمهندسين المتخصصين في كل مادة.</p>
				
				<h3>كيفية التسجيل:</h3>
				<ol>
					<li>ادخل إلى الموقع الرسمي</li>
					<li>اختر الورشة المناسبة لك</li>
					<li>املأ بيانات التسجيل</li>
					<li>احضر في الموعد المحدد</li>
				</ol>
				
				<p>هذه الورش مجانية تماماً وتهدف لمساعدة الطلاب في تحقيق أفضل النتائج.</p>
			`,
			date: '2023-12-28',
			image: '/assets/logo2.png',
			category: 'أخبار المعادلة',
			author: 'فريق المعادلة'
		},
		'exam-results-semester-1': {
			id: 'exam-results-semester-1',
			title: 'نتائج امتحانات المعادلة للفصل الأول',
			content: `
				<p>تم الإعلان عن نتائج امتحانات المعادلة للفصل الدراسي الأول مع إحصائيات النجاح. النتائج تظهر تحسناً ملحوظاً في الأداء العام للطلاب.</p>
				
				<h3>إحصائيات النجاح:</h3>
				<ul>
					<li>نسبة النجاح العامة: 78%</li>
					<li>الرياضيات العامة: 82%</li>
					<li>الرياضيات الخاصة: 75%</li>
					<li>الفيزياء: 80%</li>
					<li>الكيمياء: 85%</li>
					<li>اللغة الإنجليزية: 70%</li>
				</ul>
				
				<h3>أفضل الطلاب:</h3>
				<ul>
					<li>المركز الأول: أحمد محمد - 98%</li>
					<li>المركز الثاني: فاطمة علي - 96%</li>
					<li>المركز الثالث: محمود حسن - 94%</li>
					<li>المركز الرابع: نورا سعد - 92%</li>
					<li>المركز الخامس: يوسف أحمد - 90%</li>
				</ul>
				
				<h3>كيفية الاستعلام عن النتيجة:</h3>
				<ol>
					<li>ادخل إلى الموقع الرسمي</li>
					<li>اختر "الاستعلام عن النتائج"</li>
					<li>ادخل رقم الجلوس</li>
					<li>شاهد النتيجة التفصيلية</li>
				</ol>
				
				<h3>التقديم على الكليات:</h3>
				<p>يمكن للطلاب الناجحين التقديم على كليات الهندسة المختلفة حسب درجاتهم وتفضيلاتهم.</p>
				
				<p>نهنئ جميع الطلاب الناجحين ونتمنى لهم التوفيق في المرحلة القادمة.</p>
			`,
			date: '2023-12-20',
			image: '/assets/logo2.png',
			category: 'أخبار المعادلة',
			author: 'فريق المعادلة'
		}
	};

	constructor(
		private route: ActivatedRoute,
		private location: Location
	) { }

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.newsId = params['id'];
			// Try direct lookup by slug/key
			this.newsItem = this.newsData[this.newsId];
			// Fallback: try match by item's internal id property
			if (!this.newsItem) {
				const all = Object.values(this.newsData);
				this.newsItem = all.find((n: any) => n.id === this.newsId) as any;
			}
		});
	}

	formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('ar-EG', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	goBack(): void {
		this.location.back();
	}

	async shareNews(): Promise<void> {
		const url = window.location.href;
		
		if (navigator.share) {
			// استخدام Web Share API إذا كان متاحاً (في الهواتف المحمولة)
			try {
				await navigator.share({
					title: this.newsItem?.title || 'خبر من موقع معادلة كلية الهندسة',
					text: this.newsItem?.content?.replace(/<[^>]*>/g, '').substring(0, 100) + '...',
					url: url
				});
			} catch (err) {
				// إذا ألغى المستخدم المشاركة
				console.log('تم إلغاء المشاركة');
			}
		} else {
			// نسخ الرابط إلى الحافظة
			try {
				await navigator.clipboard.writeText(url);
				alert('تم نسخ الرابط إلى الحافظة!');
			} catch (err) {
				// طريقة بديلة للنسخ
				this.fallbackCopyTextToClipboard(url);
			}
		}
	}

	private fallbackCopyTextToClipboard(text: string): void {
		const textArea = document.createElement('textarea');
		textArea.value = text;
		textArea.style.position = 'fixed';
		textArea.style.left = '-999999px';
		textArea.style.top = '-999999px';
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		
		try {
			document.execCommand('copy');
			alert('تم نسخ الرابط إلى الحافظة!');
		} catch (err) {
			alert('حدث خطأ في نسخ الرابط. الرابط: ' + text);
		}
		
		document.body.removeChild(textArea);
	}
}
